
const {ipcRenderer} = require('electron');
const numSystems = document.getElementsByClassName("game").length;
const rowSize = 3;

ipcRenderer.on('button-long', function(e, arg)    {
    document.getElementById("buttonLong").innerHTML = "Button Long: " + arg;
});

ipcRenderer.on('button-short', function(e, button)    {
    console.log(button);
    if (button === "buttons.a")    {
        selectConsole();
    } else if (isDPadButton(button))    {
        moveCursor(button);
    }

    document.getElementById("buttonShort").innerHTML = "Button Short: " + button;
});

ipcRenderer.on('button-changed', function(e, arg)    {
    document.getElementById("buttonChanged").innerHTML = "Button Changed: " + arg;
});

ipcRenderer.on('connection-changed', function(e, arg)    {
    document.getElementById("connectionChanged").innerHTML = "Connection: " + arg;
});

function isDPadButton(button)   {
    return (button === "dpad.left" || button === 'dpad.up' || button === 'dpad.right' || button === 'dpad.down')
}

function getSelectedElementNum()    {
    let id = document.getElementsByClassName("selected")[0].id;
    return parseInt(id.substr(4));
}

function selectSystem(oldSystem, newSystem)    {
    document.getElementById("game" + oldSystem).classList.remove("selected");
    document.getElementById("game" + oldSystem).classList.remove("pulse");
    document.getElementById("game" + newSystem).classList.add("selected");
    document.getElementById("game" + newSystem).classList.add("pulse");
}

function moveCursor(button) {
    let gameNum = getSelectedElementNum();
    if (button === "dpad.right")    {
        if (gameNum + 1 === numSystems) return false;
        if ((gameNum + 1) % rowSize === 0) return false;
        selectSystem(gameNum, gameNum + 1);
    } else if (button === "dpad.left")  {
        if (gameNum % rowSize === 0) return false;
        selectSystem(gameNum, gameNum - 1);
    } else if (button === "dpad.down")  {
        if (gameNum + rowSize >= numSystems ) return false;
        selectSystem(gameNum, gameNum + rowSize);
    } else if (button === "dpad.up")    {
        if (gameNum - rowSize < 0)  return false;
        selectSystem(gameNum, gameNum - rowSize);
    }
    console.log("Moving cursor");
}

function selectConsole()   {
    ipcRenderer.send('select-console', getSelectedElementNum());
}

ipcRenderer.on('populate-console-list', function(e, consoles)  {
    console.log("What up");
    console.log(consoles);
});

ipcRenderer.send('request-console-list', "");
