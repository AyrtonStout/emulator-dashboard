const fs = require('fs');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var childProcess;
var self = this;

this.emulatorStatus = -1;

this.launchEmulator = function(emulatorIndex, gameName)   {
    if (emulatorIndex == 18)   {
        let path = "C:/Program Files (x86)/Emulation Station/Nestopia/";
        let exePath = path + "nestopia.exe";
        let romPath = path + "ROMs/";
        gameName = gameFullGameNameFromName(romPath, gameName);
        let game = `${romPath}${gameName}`;
        let args = `-video fullscreen bbp : 16 -video fullscreen width : 1024 -video fullscreen height : 768 -preferences fullscreen on start : yes -view size fullscreen : stretched`;
        let final = `"${exePath}" "${game}" ${args}`;
        childProcess = exec(final);
    } else if (emulatorIndex == 19)  {
        let path = "C:/Program Files (x86)/Emulation Station/Snes9x/";
        let exePath = path + "snes9x.exe";
        let romPath = path + "ROMs/";
        gameName = gameFullGameNameFromName(romPath, gameName);
        let game = `${romPath}${gameName}`;
        let args = "-fullscreen";
        let final = `"${exePath}" ${args} "${game}"`;
        console.log(final);
        childProcess = exec(final);
    }
    this.emulatorStatus = emulatorIndex;
};

this.closeEmulator = function() {
    if (childProcess)   {
        spawn("taskkill", ["/pid", childProcess.pid, '/f', '/t']);
    }
    self.emulatorStatus = -1;
};

/*
 * Basically includes the game's extension as well
 */
function gameFullGameNameFromName(path, gameName)   {
    let ROMs = fs.readdirSync(path);

    for (let i = 0; i < ROMs.length; i++)   {
        let fileName = ROMs[i];
        let regex = `${gameName}[.].*`;
        console.log(regex);
        var patt = new RegExp(regex, "i");
        if (patt.test(fileName))  {
            return fileName;
        }
    }
    console.log("ERROR: No suitable game file found to launch");
    return null;
}
