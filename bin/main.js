const {app, BrowserWindow, ipcMain} = require('electron');
const xinput = require('../public/js/controller.js');
const mysql = require('../public/js/mysql');
const endpoints = require('../public/js/endpoints');
const gameApi = require('../public/js/gameApi');
const fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let fullScreen = true;

function createWindow () {
    // Create the browser window.
    if (fullScreen) {
        mainWindow = new BrowserWindow({width: 1920, height: 1080, kiosk: true, frame: false});
    } else {
        mainWindow = new BrowserWindow({width: 1600, height: 900});
    }

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/../public/html/index.html`);

    xinput.setMainWindow(mainWindow.webContents);
    xinput.attachListeners();

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

        //Separate all ROMs into their file name and their extensions
        ROMs = ROMs.map(function(ROM) {
            let extensionIndex = ROM.lastIndexOf('.');
            return [ROM.substring(0, extensionIndex), ROM.substring(extensionIndex)];
            //return ROM.substr(0, ROM.lastIndexOf('.'));
        });

        //And query the igdb API
        ROMs.forEach((ROM) => { gameApi.queryGameData(ROM[0], ROM[1], system.id); });
    });
}

mysql.getActiveGameSystems(updateGameMySQLData);

