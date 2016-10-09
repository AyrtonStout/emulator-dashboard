const fs = require('fs');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var childProcess;
var self = this;

this.emulatorStatus = -1;

this.launchEmulator = function(emulatorIndex, gameIndex)   {
    if (emulatorIndex == 0)   {
        let path = "C:/Program Files (x86)/Emulation Station/Nestopia/";
        let exePath = path + "nestopia.exe";
        let romPath = path + "ROMs/";
        let gameName = gameNameFromIndex(romPath, gameIndex);
        let game = `${romPath}${gameName}`;
        let args = `-video fullscreen bbp : 16 -video fullscreen width : 1024 -video fullscreen height : 768 -preferences fullscreen on start : yes -view size fullscreen : stretched`;
        let final = `"${exePath}" "${game}" ${args}`;
        childProcess = exec(final);
    } else if (emulatorIndex == 1)  {
        let path = "C:/Program Files (x86)/Emulation Station/Snes9x/";
        let exePath = path + "snes9x.exe";
        let romPath = path + "ROMs/";
        let gameName = gameNameFromIndex(romPath, gameIndex);
        let game = `${romPath}${gameName}`;
        let args = "-fullscreen";
        let final = `"${exePath}" ${args} "${game}"`;
        console.log(final);
        childProcess = exec(final);
    }
    this.emulatorStatus = emulatorIndex;
};

this.closeEmulator = function() {
    console.log("Attempting to close emulator");
    if (childProcess)   {
        console.log("Emulator closing");
        spawn("taskkill", ["/pid", childProcess.pid, '/f', '/t']);
    }
    self.emulatorStatus = -1;
};

function gameNameFromIndex(path, index)   {
    let ROMs = fs.readdirSync(path);
    return ROMs[index];
}
