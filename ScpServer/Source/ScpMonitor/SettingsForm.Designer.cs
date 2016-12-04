namespace ScpMonitor
{
    partial class SettingsForm
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
            this.gbFlip = new System.Windows.Forms.GroupBox();
            this.cbRY = new System.Windows.Forms.CheckBox();
            this.cbRX = new System.Windows.Forms.CheckBox();
            this.cbLY = new System.Windows.Forms.CheckBox();
            this.cbLX = new System.Windows.Forms.CheckBox();
            this.tbIdle = new System.Windows.Forms.TrackBar();
            this.btnOK = new System.Windows.Forms.Button();
            this.btnCancel = new System.Windows.Forms.Button();
            this.lblIdle = new System.Windows.Forms.Label();
            this.lblDebug = new System.Windows.Forms.Label();
            this.cbLED = new System.Windows.Forms.CheckBox();
            this.gbFlip.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.tbIdle)).BeginInit();
            this.SuspendLayout();
            // 
            // gbFlip
            // 
            this.gbFlip.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.gbFlip.Controls.Add(this.cbRY);
            this.gbFlip.Controls.Add(this.cbRX);
            this.gbFlip.Controls.Add(this.cbLY);
            this.gbFlip.Controls.Add(this.cbLX);
            this.gbFlip.Location = new System.Drawing.Point(12, 12);
            this.gbFlip.Name = "gbFlip";
            this.gbFlip.Size = new System.Drawing.Size(270, 44);
            this.gbFlip.TabIndex = 0;
            this.gbFlip.TabStop = false;
            this.gbFlip.Text = " Flip Axis ";
            // 
            // cbRY
            // 
            this.cbRY.AutoSize = true;
            this.cbRY.Location = new System.Drawing.Point(201, 20);
            this.cbRY.Name = "cbRY";
            this.cbRY.Size = new System.Drawing.Size(41, 17);
            this.cbRY.TabIndex = 3;
            this.cbRY.Text = "RY";
            this.cbRY.UseVisualStyleBackColor = true;
            // 
            // cbRX
            // 
            this.cbRX.AutoSize = true;
            this.cbRX.Location = new System.Drawing.Point(141, 20);
            this.cbRX.Name = "cbRX";
            this.cbRX.Size = new System.Drawing.Size(41, 17);
            this.cbRX.TabIndex = 2;
            this.cbRX.Text = "RX";
            this.cbRX.UseVisualStyleBackColor = true;
            // 
            // cbLY
            // 
            this.cbLY.AutoSize = true;
            this.cbLY.Location = new System.Drawing.Point(81, 20);
            this.cbLY.Name = "cbLY";
            this.cbLY.Size = new System.Drawing.Size(39, 17);
            this.cbLY.TabIndex = 1;
            this.cbLY.Text = "LY";
            this.cbLY.UseVisualStyleBackColor = true;
            // 
            // cbLX
            // 
            this.cbLX.AutoSize = true;
            this.cbLX.Location = new System.Drawing.Point(21, 20);
            this.cbLX.Name = "cbLX";
            this.cbLX.Size = new System.Drawing.Size(39, 17);
            this.cbLX.TabIndex = 0;
            this.cbLX.Text = "LX";
            this.cbLX.UseVisualStyleBackColor = true;
            // 
            // tbIdle
            // 
            this.tbIdle.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.tbIdle.AutoSize = false;
            this.tbIdle.Location = new System.Drawing.Point(12, 73);
            this.tbIdle.Maximum = 30;
            this.tbIdle.Name = "tbIdle";
            this.tbIdle.Size = new System.Drawing.Size(270, 34);
            this.tbIdle.TabIndex = 1;
            this.tbIdle.Value = 10;
            this.tbIdle.ValueChanged += new System.EventHandler(this.tbIdle_ValueChanged);
            // 
            // btnOK
            // 
            this.btnOK.Location = new System.Drawing.Point(126, 147);
            this.btnOK.Name = "btnOK";
            this.btnOK.Size = new System.Drawing.Size(75, 23);
            this.btnOK.TabIndex = 2;
            this.btnOK.Text = "OK";
            this.btnOK.UseVisualStyleBackColor = true;
            this.btnOK.Click += new System.EventHandler(this.btnOK_Click);
            // 
            // btnCancel
            // 
            this.btnCancel.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.btnCancel.Location = new System.Drawing.Point(207, 147);
            this.btnCancel.Name = "btnCancel";
            this.btnCancel.Size = new System.Drawing.Size(75, 23);
            this.btnCancel.TabIndex = 3;
            this.btnCancel.Text = "Cancel";
            this.btnCancel.UseVisualStyleBackColor = true;
            this.btnCancel.Click += new System.EventHandler(this.btnCancel_Click);
            // 
            // lblIdle
            // 
            this.lblIdle.AutoSize = true;
            this.lblIdle.Location = new System.Drawing.Point(9, 120);
            this.lblIdle.Name = "lblIdle";
            this.lblIdle.Size = new System.Drawing.Size(125, 13);
            this.lblIdle.TabIndex = 4;
            this.lblIdle.Text = "Idle Timeout : 10 minutes";
            // 
            // lblDebug
            // 
            this.lblDebug.AutoSize = true;
            this.lblDebug.Location = new System.Drawing.Point(9, 147);
            this.lblDebug.Name = "lblDebug";
            this.lblDebug.Size = new System.Drawing.Size(0, 13);
            this.lblDebug.TabIndex = 5;
            // 
            // cbLED
            // 
            this.cbLED.AutoSize = true;
            this.cbLED.Location = new System.Drawing.Point(153, 119);
            this.cbLED.Name = "cbLED";
            this.cbLED.Size = new System.Drawing.Size(85, 17);
            this.cbLED.TabIndex = 6;
            this.cbLED.Text = "Disable LED";
            this.cbLED.UseVisualStyleBackColor = true;
            // 
            // SettingsForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(294, 182);
            this.Controls.Add(this.cbLED);
            this.Controls.Add(this.lblDebug);
            this.Controls.Add(this.lblIdle);
            this.Controls.Add(this.btnCancel);
            this.Controls.Add(this.btnOK);
            this.Controls.Add(this.tbIdle);
            this.Controls.Add(this.gbFlip);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "SettingsForm";
            this.ShowInTaskbar = false;
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Service Configuration";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.Form_Closing);
            this.Load += new System.EventHandler(this.Form_Load);
            this.gbFlip.ResumeLayout(false);
            this.gbFlip.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.tbIdle)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.GroupBox gbFlip;
        private System.Windows.Forms.CheckBox cbRY;
        private System.Windows.Forms.CheckBox cbRX;
        private System.Windows.Forms.CheckBox cbLY;
        private System.Windows.Forms.CheckBox cbLX;
        private System.Windows.Forms.TrackBar tbIdle;
        private System.Windows.Forms.Button btnOK;
        private System.Windows.Forms.Button btnCancel;
        private System.Windows.Forms.Label lblIdle;
        private System.Windows.Forms.Label lblDebug;
        private System.Windows.Forms.CheckBox cbLED;
    }
}