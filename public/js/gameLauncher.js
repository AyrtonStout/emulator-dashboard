var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var childProcess;
var self = this;

this.emulatorStatus = -1;

this.launchEmulator = function(emulatorNumber)   {
    if (emulatorNumber == 0)   {
        let path = "C:/Program Files (x86)/Emulation Station/Nestopia/";
        let exePath = path + "nestopia.exe";
        let romPath = path + "ROMs/";
        let game = `${romPath}Super Mario Bros. 3.nes`;
        let args = `-video fullscreen bbp : 16 -video fullscreen width : 1024 -video fullscreen height : 768 -preferences fullscreen on start : yes -view size fullscreen : stretched`;
        let final = `"${exePath}" "${game}" ${args}`;
        console.log("Final");
        console.log(final);
        childProcess = exec(final);
    }
    this.emulatorStatus = emulatorNumber;
};

this.closeEmulator = function() {
    console.log("Attempting to close emulator");
    if (childProcess)   {
        console.log("Emulator closing");
        spawn("taskkill", ["/pid", childProcess.pid, '/f', '/t']);
    }
    self.emulatorStatus = -1;
};

