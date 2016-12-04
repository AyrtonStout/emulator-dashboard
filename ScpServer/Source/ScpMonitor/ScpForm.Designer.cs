namespace ScpMonitor
{
    partial class ScpForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.lblHost = new System.Windows.Forms.Label();
            this.lblPad_1 = new System.Windows.Forms.Label();
            this.lblPad_2 = new System.Windows.Forms.Label();
            this.lblPad_3 = new System.Windows.Forms.Label();
            this.lblPad_4 = new System.Windows.Forms.Label();
            this.tmrUpdate = new System.Windows.Forms.Timer(this.components);
            this.niTray = new System.Windows.Forms.NotifyIcon(this.components);
            this.cmTray = new System.Windows.Forms.ContextMenuStrip(this.components);
            this.tmIdle = new System.Windows.Forms.ToolStripMenuItem();
            this.tmExit = new System.Windows.Forms.ToolStripMenuItem();
            this.cmTray.SuspendLayout();
            this.SuspendLayout();
            // 
            // lblHost
            // 
            this.lblHost.AutoSize = true;
            this.lblHost.Font = new System.Drawing.Font("Lucida Console", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblHost.Location = new System.Drawing.Point(10, 10);
            this.lblHost.Name = "lblHost";
            this.lblHost.Size = new System.Drawing.Size(223, 13);
            this.lblHost.TabIndex = 1;
            this.lblHost.Text = "Host Address : Disconnected";
            // 
            // lblPad_1
            // 
            this.lblPad_1.AutoSize = true;
            this.lblPad_1.Font = new System.Drawing.Font("Lucida Console", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblPad_1.Location = new System.Drawing.Point(320, 10);
            this.lblPad_1.Name = "lblPad_1";
            this.lblPad_1.Size = new System.Drawing.Size(167, 13);
            this.lblPad_1.TabIndex = 2;
            this.lblPad_1.Text = "Pad 1 : Disconnected";
            // 
            // lblPad_2
            // 
            this.lblPad_2.AutoSize = true;
            this.lblPad_2.Font = new System.Drawing.Font("Lucida Console", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblPad_2.Location = new System.Drawing.Point(320, 35);
            this.lblPad_2.Name = "lblPad_2";
            this.lblPad_2.Size = new System.Drawing.Size(167, 13);
            this.lblPad_2.TabIndex = 3;
            this.lblPad_2.Text = "Pad 2 : Disconnected";
            // 
            // lblPad_3
            // 
            this.lblPad_3.AutoSize = true;
            this.lblPad_3.Font = new System.Drawing.Font("Lucida Console", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblPad_3.Location = new System.Drawing.Point(320, 60);
            this.lblPad_3.Name = "lblPad_3";
            this.lblPad_3.Size = new System.Drawing.Size(167, 13);
            this.lblPad_3.TabIndex = 4;
            this.lblPad_3.Text = "Pad 3 : Disconnected";
            // 
            // lblPad_4
            // 
            this.lblPad_4.AutoSize = true;
            this.lblPad_4.Font = new System.Drawing.Font("Lucida Console", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblPad_4.Location = new System.Drawing.Point(320, 85);
            this.lblPad_4.Name = "lblPad_4";
            this.lblPad_4.Size = new System.Drawing.Size(167, 13);
            this.lblPad_4.TabIndex = 5;
            this.lblPad_4.Text = "Pad 4 : Disconnected";
            // 
            // tmrUpdate
            // 
            this.tmrUpdate.Tick += new System.EventHandler(this.tmrUpdate_Tick);
            // 
            // niTray
            // 
            this.niTray.BalloonTipIcon = System.Windows.Forms.ToolTipIcon.Info;
            this.niTray.BalloonTipTitle = "SCP DS3 Monitor";
            this.niTray.ContextMenuStrip = this.cmTray;
            this.niTray.Text = "SCP DS3 Monitor";
            this.niTray.Visible = true;
            this.niTray.MouseClick += new System.Windows.Forms.MouseEventHandler(this.niTray_Click);
            // 
            // cmTray
            // 
            this.cmTray.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.tmIdle,
            this.tmExit});
            this.cmTray.Name = "cmTray";
            this.cmTray.Size = new System.Drawing.Size(149, 48);
            // 
            // tmIdle
            // 
            this.tmIdle.Enabled = false;
            this.tmIdle.Name = "tmIdle";
            this.tmIdle.Size = new System.Drawing.Size(148, 22);
            this.tmIdle.Text = "&Configuration";
            this.tmIdle.Click += new System.EventHandler(this.tmIdle_Click);
            // 
            // tmExit
            // 
            this.tmExit.Name = "tmExit";
            this.tmExit.Size = new System.Drawing.Size(148, 22);
            this.tmExit.Text = "E&xit";
            this.tmExit.Click += new System.EventHandler(this.tmExit_Click);
            // 
            // ScpForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(734, 112);
            this.Controls.Add(this.lblPad_4);
            this.Controls.Add(this.lblPad_3);
            this.Controls.Add(this.lblPad_2);
            this.Controls.Add(this.lblPad_1);
            this.Controls.Add(this.lblHost);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "ScpForm";
            this.ShowInTaskbar = false;
            this.SizeGripStyle = System.Windows.Forms.SizeGripStyle.Hide;
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "SCP DS3 Monitor";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.Form_Closing);
            this.Load += new System.EventHandler(this.Form_Load);
            this.cmTray.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label lblHost;
        private System.Windows.Forms.Label lblPad_1;
        private System.Windows.Forms.Label lblPad_2;
        private System.Windows.Forms.Label lblPad_3;
        private System.Windows.Forms.Label lblPad_4;
        private System.Windows.Forms.Timer tmrUpdate;
        private System.Windows.Forms.NotifyIcon niTray;
        private System.Windows.Forms.ContextMenuStrip cmTray;
        private System.Windows.Forms.ToolStripMenuItem tmExit;
        private System.Windows.Forms.ToolStripMenuItem tmIdle;

    }
}

