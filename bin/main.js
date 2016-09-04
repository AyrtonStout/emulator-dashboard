const {app, BrowserWindow, ipcMain} = require('electron');
const xinput = require('../public/js/controller.js');
const gameLauncher = require('../public/js/gameLauncher.js');
//const robot = require('robotjs'); //Hopefully will be used to move the mouse cursor around / offscreen

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
    // Create the browser window.
    //mainWindow = new BrowserWindow({width: 800, height: 600, kiosk: true, frame: false});
    mainWindow = new BrowserWindow(
        {
            width: 1200,
            height: 800,
            //webPreferences: {
                //webSecurity: false
            //}
        });

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
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    app.quit();
});

app.on('activate', function () {
    createWindow();
});

ipcMain.on('launch-game', function(e, arg)  {
    console.log("Launching game");
    console.log(arg);
    gameLauncher.launchEmulator(arg);
});
