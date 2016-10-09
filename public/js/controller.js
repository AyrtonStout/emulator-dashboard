const xinput = require('xinputjs');
const gameLauncher = require('./gameLauncher.js');
var killCombination = ["thumb.right", "thumb.left", "shoulder.left", "shoulder.right"];
var killButtonsPressed = [];

controllers = [0, 1, 2, 3]
    .filter(n => xinput.IsConnected(n))
    .map(n => xinput.WrapController(n, {
        interval: 20,
        deadzone: {
            x: 0.20,
            y: 0.15
        },
        holdtime: 1500
    }));


this.attachListener = function(thingie)    {

    controllers.forEach(gamepad => {
        var n = gamepad.deviceNumber;

        gamepad.addListener("button-long", (button, elapsed) => {
            //thingie.send('button-long', button);
            if (killCombination.indexOf(button) >= 0)   {
                console.log("Button found");
                addKillPress(button);
            } else {
                console.log("Button not found");
            }
            console.log("[%d] Hold button %s for %dms", n, button, elapsed);
        });

        gamepad.addListener("button-short", (button, elapsed) => {
            if (gameLauncher.emulatorStatus < 0) { //A game is not running
                thingie.send('button-short', button);
            }
        });

        /*
        gamepad.addListener("button-changed", (button, state) => {
            thingie.send('button-changed', button + " " + state);
        });

        gamepad.addListener("analog-input", (input, data) => {
        });
        */

        //This doesn't seem to work
        gamepad.addListener("connection-changed", (isConnected) => {
            thingie.send('analog-input', isConnected);
            var message = "[%d] Connection state changed: %s" + n + isConnected ? "Connected!" : "Disconnected!";
            document.getElementById("youBitch").innerHTML(message);
            //console.log(, n, isConnected ? "Connected!" : "Disconnected!");
            /* Pulling out the batteries + plugging them back in ->
             [1] Connection state changed: Disconnected!
             [1] Connection state changed: Connected!
             */
        });
    });
};

function addKillPress(button)   {
    let length = killButtonsPressed.push(button);
    if (length == 1)    {
        //If this is the first kill button detected, add a timer to reset
        //progress if the other buttons aren't pushed fast enough
        setTimeout(() => { killButtonsPressed = []; }, 1000);
    }
    if (length >= 4)    {
        gameLauncher.closeEmulator();
        killButtonsPressed = [];
    }
}

