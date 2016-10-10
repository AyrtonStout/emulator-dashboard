const {ipcMain} = require('electron');
const gameLauncher = require('./gameLauncher.js');
const gameApi = require('./gameApi.js');
const mysql = require('./mysql');
const fs = require('fs');

const consoleSelectView = 0;
const gameSelectView = 1;

let mainWindow = null;

let activeView = consoleSelectView;
let selectedConsole = -1; //The MySQL ID of the selected console
let selectedConsoleIndex = 0; //The index of the last selected console on the console select view

this.init = function(window)    {
    mainWindow = window;
};

ipcMain.on('launch-game', function(e, gameName)  {
    gameLauncher.launchEmulator(selectedConsole, gameName);
});

ipcMain.on('select-console', function(e, consoleId, consoleIndex)   {
    activeView = gameSelectView;
    selectedConsole = consoleId;
    selectedConsoleIndex = consoleIndex;
    mainWindow.loadURL(`file://${__dirname}/../html/gameview.html`);
});

ipcMain.on('enter-console-select', function(e, arg) {
    activeView = consoleSelectView;
    mainWindow.loadURL(`file://${__dirname}/../html/index.html`);
});

ipcMain.on('request-game-list', function(e, arg)    {
    mysql.getGames(selectedConsole, function (gameData)  {
        mainWindow.webContents.send('populate-game-list', gameData);
    });
});

ipcMain.on('request-console-list', function(e, arg) {
    mysql.getActiveGameSystems(function (consoles) {
        mainWindow.webContents.send('populate-console-list', consoles);
    });
});

ipcMain.on('request-game-details', function(e, gameId)    {
    mysql.getGameData(gameId, function (gameData)   {
        mainWindow.webContents.send('populate-game-details', gameData);
    });
});

ipcMain.on('request-console-info', function(e, arg) {
    mysql.getConsoleData(selectedConsole, function(consoleData) {
        console.log(consoleData);
        mainWindow.webContents.send('populate-console-info', consoleData[0]);
    });
});

ipcMain.on('request-last-selected-console-index', function(e, arg)  {
    mainWindow.webContents.send('populate-last-selected-console-index', selectedConsoleIndex);
});