const fs = require('fs');
const emulatorPath = "C:/Program Files (x86)/Emulation Station/";
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var childProcess;
var self = this;

this.emulatorStatus = -1;

this.launchEmulator = function(consoleId, gameName)   {
    let shellDirectory;
    let execString = "";
    if (consoleId == 18)   {
        let path = emulatorPath + "Nestopia/";
        let exePath = path + "nestopia.exe";
        let romPath = path + "ROMs/";
        let game = `${romPath}${gameName}`;
        let args = `-video fullscreen bbp : 16 -video fullscreen width : 1024 -video fullscreen height : 768 -preferences fullscreen on start : yes -view size fullscreen : stretched`;
        execString = `"${exePath}" "${game}" ${args}`;
    } else if (consoleId == 19)  {
        let path = emulatorPath + "Snes9x/";
        let exePath = path + "snes9x.exe";
        let romPath = path + "ROMs/";
        let game = `${romPath}${gameName}`;
        let args = "-fullscreen";
        execString = `"${exePath}" ${args} "${game}"`;
    } else if (consoleId == 4)  {
        //This emulator doesn't seem to want to worth without executing it from the root directory of the emulator
        shellDirectory = emulatorPath + "Mupen64/";
        let exePath = "mupen64plus-ui-console.exe";
        let romPath = "ROMs/";
        let game = `${romPath}${gameName}`;
        let args = "--configdir . --resolution 1280x960";

        execString = `${exePath} ${args} "${game}"`;
    }
    console.log("DEBUG: Exec-ing game with command:");
    console.log(execString);
    if (shellDirectory) {
        childProcess = exec(execString, {cwd: shellDirectory}, function(error, stdout, stderr)  {
            console.log("Error");
            console.log(error);
            console.log("Stdout");
            console.log(stdout);
            console.log("Stderr");
            console.log(stderr);
        });
    } else {
        childProcess = exec(execString);
    }
    this.emulatorStatus = consoleId;
};

this.closeEmulator = function() {
    if (childProcess)   {
        spawn("taskkill", ["/pid", childProcess.pid, '/f', '/t']);
    }
    self.emulatorStatus = -1;
};
