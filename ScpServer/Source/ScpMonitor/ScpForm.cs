using System;
using System.Windows.Forms;
using System.Text;
using System.Drawing;

using System.Net;
using System.Net.Sockets;

using System.Configuration;
using Microsoft.Win32;
using System.Collections;
using System.Collections.Specialized;

namespace ScpMonitor 
{
    public partial class ScpForm : Form 
    {
        protected RegistrySettings m_Config = new RegistrySettings();

        protected Boolean FormSaved, ConfSaved, FormVisible;
        protected Int32 FormX, FormY, ConfX, ConfY;

        protected Boolean m_Connected = false;

        protected IPEndPoint m_ServerEp = new IPEndPoint(IPAddress.Loopback, 26760);
        protected UdpClient  m_Server   = new UdpClient();

        protected Byte[] m_Buffer = new Byte[64];
        protected Char[] m_Delim  = new Char[] { '^' };

        protected SettingsForm Settings = new SettingsForm();

        public ScpForm() 
        {
            InitializeComponent();

            m_Server.Client.ReceiveTimeout = 250;
            m_Buffer[1] = 0x02;

            FormVisible = m_Config.Visible;

            FormSaved = m_Config.FormSaved;
            FormX = m_Config.FormX;
            FormY = m_Config.FormY;

            ConfSaved = m_Config.ConfSaved;
            ConfX = m_Config.ConfX;
            ConfY = m_Config.ConfY;

            if (FormSaved)
            {
                StartPosition = FormStartPosition.Manual;
                Location = new System.Drawing.Point(FormX, FormY);
            }

            if (!FormVisible)
            {
                WindowState = FormWindowState.Minimized;
                Visible = false;
            }

            if (ConfSaved)
            {
                Settings.StartPosition = FormStartPosition.Manual;
                Settings.Location = new System.Drawing.Point(ConfX, ConfY);
            }

            lblHost.Text  = "Host Address : 00:00:00:00:00:00\r\n\r\n0\r\n\r\n0\r\n\r\n0";
            lblPad_1.Text = "Pad 1 : 00:00:00:00:00:00 - USB FFFFFFFF Charging";

            Int32 SizeX = 50 + lblHost.Width + lblPad_1.Width;
            Int32 SizeY = 20 + lblHost.Height;

            lblPad_1.Location = new Point(new Size(40 + lblHost.Width, 10 + lblHost.Height / 7 * 0));
            lblPad_2.Location = new Point(new Size(40 + lblHost.Width, 10 + lblHost.Height / 7 * 2));
            lblPad_3.Location = new Point(new Size(40 + lblHost.Width, 10 + lblHost.Height / 7 * 4));
            lblPad_4.Location = new Point(new Size(40 + lblHost.Width, 10 + lblHost.Height / 7 * 6));

            ClientSize = new Size(SizeX, SizeY);
        }

        protected void Parse(Byte[] Buffer) 
        {
            if (!m_Connected)
            {
                m_Connected = true;
                tmIdle.Enabled = true;

                niTray.BalloonTipText = "Server Connected";
                niTray.ShowBalloonTip(3000);
            }

            String   Data  = Encoding.Unicode.GetString(Buffer);
            String[] Split = Data.Split(m_Delim, StringSplitOptions.RemoveEmptyEntries);

            lblHost.Text  = Split[0];

            lblPad_1.Text = Split[1];
            lblPad_2.Text = Split[2];
            lblPad_3.Text = Split[3];
            lblPad_4.Text = Split[4];
        }

        protected void Clear() 
        {
            if (m_Connected)
            {
                m_Connected    = false;
                tmIdle.Enabled = false;

                niTray.BalloonTipText = "Server Disconnected";
                niTray.ShowBalloonTip(3000);
            }

            lblHost.Text = "Host Address : Disconnected";

            lblPad_1.Text = "Pad 1 : Disconnected";
            lblPad_2.Text = "Pad 2 : Disconnected";
            lblPad_3.Text = "Pad 3 : Disconnected";
            lblPad_4.Text = "Pad 4 : Disconnected";
        }

        protected void tmrUpdate_Tick(object sender, EventArgs e) 
        {
            tmrUpdate.Enabled = false;

            try
            {
                if (Visible && Location.X != -32000 && Location.Y != -32000)
                {
                    FormVisible = true;

                    FormX = Location.X;
                    FormY = Location.Y;
                    FormSaved = true;
                }
                else
                {
                    FormVisible = false;
                }

                if (Settings.Visible && Settings.Location.X != -32000 && Settings.Location.Y != -32000)
                {
                    ConfX = Settings.Location.X;
                    ConfY = Settings.Location.Y;
                    ConfSaved = true;
                }

                if (m_Server.Send(m_Buffer, m_Buffer.Length, m_ServerEp) == m_Buffer.Length)
                {
                    IPEndPoint ReferenceEp = new IPEndPoint(IPAddress.Loopback, 0);

                    Byte[] Buffer = m_Server.Receive(ref ReferenceEp);

                    if (Buffer.Length > 0) Parse(Buffer);
                }
            }
            catch
            {
                Clear();
            }

            tmrUpdate.Enabled = true;
        }

        private void Form_Load(object sender, EventArgs e) 
        {
            Icon = niTray.Icon = Properties.Resources.Scp_All;

            tmrUpdate.Enabled = true;
        }

        private void Form_Closing(object sender, FormClosingEventArgs e) 
        {
            if (e.CloseReason == CloseReason.UserClosing && niTray.Visible)
            {
                e.Cancel = true;

                if (Settings.Visible) Settings.Hide();

                Visible = false;
                WindowState = FormWindowState.Minimized;
            }
            else
            {
                tmrUpdate.Enabled = false;

                m_Config.Visible = FormVisible;

                m_Config.FormSaved = FormSaved;
                m_Config.FormX = FormX;
                m_Config.FormY = FormY;

                m_Config.ConfSaved = ConfSaved;
                m_Config.ConfX = ConfX;
                m_Config.ConfY = ConfY;

                m_Config.Save();
            }
        }

        private void niTray_Click(object sender, MouseEventArgs e) 
        {
            if (e.Button == MouseButtons.Left)
            {
                if (WindowState == FormWindowState.Minimized)
                {
                    WindowState = FormWindowState.Normal;
                    Visible = true;

                    Activate();
                }
                else
                {
                    if (Settings.Visible) Settings.Hide();

                    Visible = false;
                    WindowState = FormWindowState.Minimized;
                }
            }
        }

        private void tmExit_Click(object sender, EventArgs e) 
        {
            niTray.Visible = false;
            Close();
        }

        private void tmIdle_Click(object sender, EventArgs e) 
        {
            if (!Settings.Visible)
            {
                Settings.Request();
                Settings.Show(this);
            }

            Settings.Activate();
        }
    }

    public class RegistryProvider : SettingsProvider 
    {
        public RegistryProvider() { }

        public override string ApplicationName 
        {
            get { return Application.ProductName; }
            set { }
        }

        public override void Initialize(String name, NameValueCollection Collection) 
        {
            base.Initialize(ApplicationName, Collection);
        }

        public override void SetPropertyValues(SettingsContext Context, SettingsPropertyValueCollection PropertyValues) 
        {
            foreach (SettingsPropertyValue PropertyValue in PropertyValues)
            {
                GetRegKey(PropertyValue.Property).SetValue(PropertyValue.Name, PropertyValue.SerializedValue);
            }
        }

        public override SettingsPropertyValueCollection GetPropertyValues(SettingsContext Context, SettingsPropertyCollection Properties) 
        {
            SettingsPropertyValueCollection values = new SettingsPropertyValueCollection();

            foreach (SettingsProperty Setting in Properties)
            {
                SettingsPropertyValue Value = new SettingsPropertyValue(Setting);

                Value.IsDirty = false;
                Value.SerializedValue = GetRegKey(Setting).GetValue(Setting.Name);
                values.Add(Value);
            }

            return values;
        }

        private RegistryKey GetRegKey(SettingsProperty Property) 
        {
            RegistryKey RegistryKey;

            if (IsUserScoped(Property))
            {
                RegistryKey = Registry.CurrentUser;
            }
            else
            {
                RegistryKey = Registry.LocalMachine;
            }

            RegistryKey = RegistryKey.CreateSubKey(GetSubKeyPath());

            return RegistryKey;
        }

        private bool IsUserScoped(SettingsProperty Property) 
        {
            foreach (DictionaryEntry Entry in Property.Attributes)
            {
                Attribute Attribute = (Attribute) Entry.Value;

                if (Attribute.GetType() == typeof(UserScopedSettingAttribute))
                {
                    return true;
                }
            }

            return false;
        }

        private string GetSubKeyPath() 
        {
            return "Software\\" + Application.CompanyName + "\\" + Application.ProductName;
        }
    }

    [SettingsProvider(typeof(ScpMonitor.RegistryProvider))]
    public class RegistrySettings : ApplicationSettingsBase 
    {
        [UserScopedSetting, DefaultSettingValue("true")]
        public Boolean Visible 
        {
            get { return (Boolean) this["Visible"]; }
            set { this["Visible"] = value; }
        }

        [UserScopedSetting, DefaultSettingValue("false")]
        public Boolean FormSaved 
        {
            get { return (Boolean) this["FormSaved"]; }
            set { this["FormSaved"] = value; }
        }

        [UserScopedSetting, DefaultSettingValue("false")]
        public Boolean ConfSaved 
        {
            get { return (Boolean) this["ConfSaved"]; }
            set { this["ConfSaved"] = value; }
        }

        [UserScopedSetting, DefaultSettingValue("-32000")]
        public Int32 FormX 
        {
            get { return (Int32) this["FormX"]; }
            set { this["FormX"] = value; }
        }

        [UserScopedSetting, DefaultSettingValue("-32000")]
        public Int32 FormY 
        {
            get { return (Int32)this["FormY"]; }
            set { this["FormY"] = value; }
        }

        [UserScopedSetting, DefaultSettingValue("-32000")]
        public Int32 ConfX 
        {
            get { return (Int32)this["ConfX"]; }
            set { this["ConfX"] = value; }
        }

        [UserScopedSetting, DefaultSettingValue("-32000")]
        public Int32 ConfY 
        {
            get { return (Int32)this["ConfY"]; }
            set { this["ConfY"] = value; }
        }
    }
}
