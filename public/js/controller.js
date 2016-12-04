const xinput = require('xinputjs');
const gameLauncher = require('./gameLauncher.js');

var self = this;
var killCombination = ["thumb.right", "thumb.left", "shoulder.left", "shoulder.right"];
var killButtonsPressed = [
    [], [], [], []
];
var mainWindow = null;
var connectedControllers = new Set(); //Indexes of controllers that are connected
var disconnectedControllers = new Set();
const numControllers = 4;
const numExpectedControllers = 2;
[...new Array(numControllers).keys()].forEach(num => disconnectedControllers.add(num)); //Add all disconnected controllers that are expected to become connected later

var activeControllerObjects = []; //Objects of controllers that are connected

const controllerOptions = {
        interval: 20,
        deadzone: {
            x: 0.20,
            y: 0.15
        },
        holdtime: 1500
    };

function wrapController(controllerNum)  {
    return xinput.WrapController(controllerNum, controllerOptions);
}

this.attachListeners = function()    {
    disconnectedControllers.forEach(gamepadNum => {
        addListener(gamepadNum);
    });
};

this.setMainWindow = function(window)  {
    mainWindow = window;
};

function addListener(gamepadNum)   {
    //This controller is already connected. Do not add more listeners to it
    if (connectedControllers.has(gamepadNum))   {
        return;
    }

    //This controller is not connected and listeners cannot be applied to it
    if (!xinput.IsConnected(gamepadNum)) {
        return;
    }

    let gamepad = wrapController(gamepadNum);

    gamepad.addListener("button-long", (button, elapsed) => {
        //thingie.send('button-long', button);
        if (killCombination.indexOf(button) >= 0)   {
            addKillPress(button, gamepad.deviceNumber);
        }
    });

    gamepad.addListener("button-short", (button, elapsed) => {
        if (gameLauncher.emulatorStatus < 0) { //A game is not running
            mainWindow.send('button-short', button);
        }
    });

    //This doesn't seem to work
    gamepad.addListener("connection-changed", (isConnected) => {
        var message = "[%d] Connection state changed: %s" + n + isConnected ? "Connected!" : "Disconnected!";
        /* Pulling out the batteries + plugging them back in ->
         [1] Connection state changed: Disconnected!
         [1] Connection state changed: Connected!
         */
    });

    activeControllerObjects.push(gamepad);
    disconnectedControllers.delete(gamepadNum);
    connectedControllers.add(gamepadNum);
}

function addKillPress(button, gamepadNum)   {
    let length = killButtonsPressed[gamepadNum].push(button);
    if (length == 1)    {
        //If this is the first kill button detected, add a timer to reset
        //progress if the other buttons aren't pushed fast enough
        setTimeout(() => { killButtonsPressed[gamepadNum] = []; }, 1000);
    }
    if (length >= 4)    {
        gameLauncher.closeEmulator();
        killButtonsPressed[gamepadNum] = [];
    }
}

function monitorForNewControllers()    {
    self.attachListeners();

    let numDisconnectedControllers = disconnectedControllers.size;
    if (numDisconnectedControllers == numControllers)    { //No controllers are connected
        setTimeout(monitorForNewControllers, 500);
    } else if (numDisconnectedControllers > (numControllers - numExpectedControllers))    {
        setTimeout(monitorForNewControllers, 1000);
    } else if (numDisconnectedControllers) {
        setTimeout(monitorForNewControllers, 30000);
    }
}

monitorForNewControllers();
