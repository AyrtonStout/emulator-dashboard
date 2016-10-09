const {ipcMain} = require('electron');
const gameLauncher = require('./gameLauncher.js');
const gameApi = require('./gameApi.js');
const fs = require('fs');

const consoleSelectView = 0;
const gameSelectView = 1;

let mainWindow = null;

let activeView = consoleSelectView;
let selectedConsole = -1; //The index of the console that is active when in the gameSelectView

this.init = function(window)    {
    mainWindow = window;
};

ipcMain.on('launch-game', function(e, gameIndex)  {
    console.log("Game index" + gameIndex);
    gameLauncher.launchEmulator(selectedConsole, gameIndex);
});

ipcMain.on('select-console', function(e, consoleIndex)   {
    activeView = gameSelectView;
    selectedConsole = consoleIndex;
    mainWindow.loadURL(`file://${__dirname}/../html/gameview.html`);
});

ipcMain.on('enter-console-select', function(e, arg) {
    activeView = consoleSelectView;
    mainWindow.loadURL(`file://${__dirname}/../html/index.html`);
});

ipcMain.on('request-game-list', function(e, arg)    {
    mainWindow.webContents.send('populate-game-list', getGameList(selectedConsole));
});

ipcMain.on('request-console-list', function(e, arg) {
    mainWindow.webContents.send('populate-console-list', "Balls");
});

ipcMain.on('request-game-details', function(e, gameName)    {
    console.log("Game details for " + gameName + " requested");
    //mainWindow.webContents.send('populate-game-details', gameApi.queryGameData(gameName));
});

function getGameList(console) {
    let system = "";
    if (console === 0)  {
        system = "Nestopia";
    } else if (console === 1)   {
        system = "Snes9x";
    }
    let path = `C:/Program Files (x86)/Emulation Station/${system}/ROMs`;
    let ROMs = fs.readdirSync(path);
    ROMs = ROMs.map(function(ROM) {
        //return ROM.replace(/\.[^/.]+$/, "");
        return ROM.substr(0, ROM.lastIndexOf('.'));
        //return ROM;
        });
    return ROMs;
}

