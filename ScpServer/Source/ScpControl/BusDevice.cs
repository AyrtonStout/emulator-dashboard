﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Windows.Forms;

using System.Runtime.InteropServices;
using Microsoft.Win32.SafeHandles;

namespace ScpControl 
{
    public partial class BusDevice : ScpDevice 
    {
        public const String DS3_BUS_CLASS_GUID = "{F679F562-3164-42CE-A4DB-E7DDBE723909}";

        protected DeviceState m_State = DeviceState.Disconnected;
        public DeviceState State 
        {
            get { return m_State; }
        }

        protected virtual Int32 Scale(Int32 Value, Boolean Flip) 
        {
            Value -= 0x80;

            if (Value == -128) Value = -127;
            if (Flip) Value *= -1;

            return (Int32)((float) Value * 258.00787401574803149606299212599f);
        }


        public BusDevice() : base(DS3_BUS_CLASS_GUID) 
        {
            InitializeComponent();
        }

        public BusDevice(IContainer container) : base(DS3_BUS_CLASS_GUID) 
        {
            container.Add(this);

            InitializeComponent();
        }


        public override Boolean Open(int Instance = 0) 
        {
            if (base.Open(Instance))
            {
                m_State = DeviceState.Reserved;
            }

            return State == DeviceState.Reserved;
        }

        public override Boolean Open(String DevicePath) 
        {
            m_Path = DevicePath;
            m_WinUsbHandle = (IntPtr) INVALID_HANDLE_VALUE;

            if (GetDeviceHandle(m_Path))
            {
                m_IsActive = true;
                m_State = DeviceState.Reserved;
            }

            return State == DeviceState.Reserved;
        }

        public override Boolean Start() 
        {
            if (IsActive)
            {
                m_State = DeviceState.Connected;
            }

            return State == DeviceState.Connected;
        }

        public override Boolean Stop()  
        {
            if (IsActive)
            {
                Unplug(0);
                m_State = DeviceState.Reserved;
            }

            return base.Stop();
        }

        public override Boolean Close() 
        {
            if (IsActive)
            {
                Unplug(0);
                m_State = DeviceState.Disconnected;
            }

            return base.Close();
        }


        public virtual Int32 Parse(Byte[] Input, Byte[] Output) 
        {
            Byte Serial = (Byte)(Input[0] + 1);

            for (Int32 Index = 0; Index < 28; Index++) Output[Index] = 0x00;

            Output[0] = 0x1C;
            Output[4] = (Byte)(Input[0] + 1);
            Output[9] = 0x14;

            if (Input[1] == 0x02) // Pad is active
            {
                UInt32 Buttons = (UInt32)((Input[10] << 0) | (Input[11] << 8) | (Input[12] << 16) | (Input[13] << 24));

                if ((Buttons & (0x1 <<  0)) > 0) Output[10] |= (Byte)(1 << 5); // Back
                if ((Buttons & (0x1 <<  1)) > 0) Output[10] |= (Byte)(1 << 6); // Left  Thumb
                if ((Buttons & (0x1 <<  2)) > 0) Output[10] |= (Byte)(1 << 7); // Right Thumb
                if ((Buttons & (0x1 <<  3)) > 0) Output[10] |= (Byte)(1 << 4); // Start

                if ((Buttons & (0x1 <<  4)) > 0) Output[10] |= (Byte)(1 << 0); // Up
                if ((Buttons & (0x1 <<  5)) > 0) Output[10] |= (Byte)(1 << 3); // Down
                if ((Buttons & (0x1 <<  6)) > 0) Output[10] |= (Byte)(1 << 1); // Right
                if ((Buttons & (0x1 <<  7)) > 0) Output[10] |= (Byte)(1 << 2); // Left

                if ((Buttons & (0x1 << 10)) > 0) Output[11] |= (Byte)(1 << 0); // Left  Shoulder
                if ((Buttons & (0x1 << 11)) > 0) Output[11] |= (Byte)(1 << 1); // Right Shoulder

                if ((Buttons & (0x1 << 12)) > 0) Output[11] |= (Byte)(1 << 7); // Y
                if ((Buttons & (0x1 << 13)) > 0) Output[11] |= (Byte)(1 << 5); // B
                if ((Buttons & (0x1 << 14)) > 0) Output[11] |= (Byte)(1 << 4); // A
                if ((Buttons & (0x1 << 15)) > 0) Output[11] |= (Byte)(1 << 6); // X

                if ((Buttons & (0x1 << 16)) > 0) Output[11] |= (Byte)(1 << 2); // Guide

                Output[12] = Input[26]; // Left Trigger
                Output[13] = Input[27]; // Right Trigger

                Int32 ThumbLX =  Scale(Input[14], Global.FlipLX);
                Int32 ThumbLY = -Scale(Input[15], Global.FlipLY);
                Int32 ThumbRX =  Scale(Input[16], Global.FlipRX);
                Int32 ThumbRY = -Scale(Input[17], Global.FlipRY);

                Output[14] = (Byte)((ThumbLX >> 0) & 0xFF); // LX
                Output[15] = (Byte)((ThumbLX >> 8) & 0xFF);

                Output[16] = (Byte)((ThumbLY >> 0) & 0xFF); // LY
                Output[17] = (Byte)((ThumbLY >> 8) & 0xFF);

                Output[18] = (Byte)((ThumbRX >> 0) & 0xFF); // RX
                Output[19] = (Byte)((ThumbRX >> 8) & 0xFF);

                Output[20] = (Byte)((ThumbRY >> 0) & 0xFF); // RY
                Output[21] = (Byte)((ThumbRY >> 8) & 0xFF);
            }

            return Input[0];
        }


        public virtual Boolean Plugin(Int32 Serial) 
        {
            if (IsActive)
            {
                Int32 Transfered = 0;
                Byte[] Buffer = new Byte[16];

                Buffer[0] = 0x10;
                Buffer[1] = 0x00;
                Buffer[2] = 0x00;
                Buffer[3] = 0x00;

                Buffer[4] = (Byte)((Serial >>  0) & 0xFF);
                Buffer[5] = (Byte)((Serial >>  8) & 0xFF);
                Buffer[6] = (Byte)((Serial >> 16) & 0xFF);
                Buffer[7] = (Byte)((Serial >> 24) & 0xFF);

                return DeviceIoControl(m_FileHandle, 0x2A4000, Buffer, Buffer.Length, null, 0, ref Transfered, IntPtr.Zero);
            }

            return false;
        }

        public virtual Boolean Unplug(Int32 Serial) 
        {
            if (IsActive)
            {
                Int32 Transfered = 0;
                Byte[] Buffer = new Byte[16];

                Buffer[0] = 0x10;
                Buffer[1] = 0x00;
                Buffer[2] = 0x00;
                Buffer[3] = 0x00;

                Buffer[4] = (Byte)((Serial >>  0) & 0xFF);
                Buffer[5] = (Byte)((Serial >>  8) & 0xFF);
                Buffer[6] = (Byte)((Serial >> 16) & 0xFF);
                Buffer[7] = (Byte)((Serial >> 24) & 0xFF);

                return DeviceIoControl(m_FileHandle, 0x2A4004, Buffer, Buffer.Length, null, 0, ref Transfered, IntPtr.Zero);
            }

            return false;
        }


        public virtual Boolean Report(Byte[] Input, Byte[] Output) 
        {
            if (IsActive)
            {
                Int32 Transfered = 0;

                return DeviceIoControl(m_FileHandle, 0x2A400C, Input, Input.Length, Output, Output.Length, ref Transfered, IntPtr.Zero) && Transfered > 0;
            }

            return false;
        }
    }
}
