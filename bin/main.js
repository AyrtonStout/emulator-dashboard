const {app, BrowserWindow, ipcMain} = require('electron');
const xinput = require('../public/js/controller.js');
const mysql = require('../public/js/mysql');
const endpoints = require('../public/js/endpoints');
const gameApi = require('../public/js/gameApi');
const fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
    // Create the browser window.
    //mainWindow = new BrowserWindow({width: 1200, height: 800, kiosk: true, frame: false});
    mainWindow = new BrowserWindow({width: 1200, height: 800});

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/../public/html/index.html`);

    xinput.attachListener(mainWindow.webContents);

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    //endpoints.init(mainWindow);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
    createWindow();
    endpoints.init(mainWindow);
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    app.quit();
});

function updateGameMySQLData(systemData)  {

    //For each game system
    systemData.forEach(function (system)    {
        let systemFolder = system.emulator_folder;
        let path = `C:/Program Files (x86)/Emulation Station/${systemFolder}/ROMs`;
        let ROMs = fs.readdirSync(path);

        //Get all of the game names
        ROMs = ROMs.map(function(ROM) {
            return ROM.substr(0, ROM.lastIndexOf('.'));
        });

        //And query the igdb API
        ROMs.forEach((name) => { gameApi.queryGameData(name, system.id); });
    });
}

mysql.getActiveGameSystems(updateGameMySQLData);
