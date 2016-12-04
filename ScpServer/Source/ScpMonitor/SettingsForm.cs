using System;
using System.Windows.Forms;
using System.Text;

using System.Net;
using System.Net.Sockets;

namespace ScpMonitor 
{
    public partial class SettingsForm : Form 
    {
        protected IPEndPoint m_ServerEp = new IPEndPoint(IPAddress.Loopback, 26760);
        protected UdpClient  m_Server   = new UdpClient();

        protected Byte[] m_Buffer = new Byte[8];

        public SettingsForm() 
        {
            InitializeComponent();

            m_Server.Client.ReceiveTimeout = 250;
        }

        public void Request() 
        {
            try
            {
                m_Buffer[1] = 0x03;

                if (m_Server.Send(m_Buffer, m_Buffer.Length, m_ServerEp) == m_Buffer.Length)
                {
                    IPEndPoint ReferenceEp = new IPEndPoint(IPAddress.Loopback, 0);

                    Byte[] Buffer = m_Server.Receive(ref ReferenceEp);

                    tbIdle.Value  = Buffer[2];
                    cbLX.Checked  = Buffer[3] == 1;
                    cbLY.Checked  = Buffer[4] == 1;
                    cbRX.Checked  = Buffer[5] == 1;
                    cbRY.Checked  = Buffer[6] == 1;
                    cbLED.Checked = Buffer[7] == 1;
                }
            }
            catch { }
        }

        private void Form_Load(object sender, EventArgs e) 
        {
            Icon = Properties.Resources.Scp_All;
        }

        private void Form_Closing(object sender, FormClosingEventArgs e) 
        {
            if (e.CloseReason == CloseReason.UserClosing)
            {
                e.Cancel = true; Hide();
            }
        }

        private void btnOK_Click(object sender, EventArgs e) 
        {
            m_Buffer[1] = 0x04;
            m_Buffer[2] = (Byte) tbIdle.Value;
            m_Buffer[3] = (Byte)(cbLX.Checked  ? 0x01 : 0x00);
            m_Buffer[4] = (Byte)(cbLY.Checked  ? 0x01 : 0x00);
            m_Buffer[5] = (Byte)(cbRX.Checked  ? 0x01 : 0x00);
            m_Buffer[6] = (Byte)(cbRY.Checked  ? 0x01 : 0x00);
            m_Buffer[7] = (Byte)(cbLED.Checked ? 0x01 : 0x00);

            m_Server.Send(m_Buffer, m_Buffer.Length, m_ServerEp);
            Hide();
        }

        private void btnCancel_Click(object sender, EventArgs e) 
        {
            Hide();
        }

        private void tbIdle_ValueChanged(object sender, EventArgs e) 
        {
            Int32 Value = tbIdle.Value;

            if (Value == 0)
            {
                lblIdle.Text = "Idle Timeout : Disabled";
            }
            else if (Value == 1)
            {
                lblIdle.Text = "Idle Timeout : 1 minute";
            }
            else
            {
                lblIdle.Text = String.Format("Idle Timeout : {0} minutes", Value);
            }
        }
    }
}
