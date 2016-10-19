
const {ipcRenderer} = require('electron');
let numSystems = null;
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

function getSelectedConsoleId() {
    return document.getElementsByClassName("selected")[0].getAttribute('console-id');
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
}

function selectConsole()   {
    ipcRenderer.send('select-console', getSelectedConsoleId(), getSelectedElementNum());
}

function getConsoleAppendPoint()    {
    let grids = document.getElementsByClassName("grid");
    if (grids.length == 0 || grids.length % 3 == 0)  {
        let divNode = document.createElement('div');
        let ulNode = document.createElement('ul');

        ulNode.classList.add("grid");
        divNode.appendChild(ulNode);
        document.getElementById("gameGrids").appendChild(divNode);
        return ulNode;
    } else {
        return grids[grids.length - 1];
    }
}

ipcRenderer.on('populate-console-list', function(e, consoles)  {
    numSystems = consoles.length;
    for (let i = 0; i < consoles.length; i++)   {
        let system = consoles[i];

        let img = document.createElement('img');
        img.setAttribute('src', `../imgs/${system.abbreviation}.png`);

        let node = document.createElement("li");
        node.setAttribute('console-id', system.id);
        node.setAttribute('id', "game" + i);
        if (i == 0) {
            node.classList.add("selected");
        }
        node.classList.add("animated");
        node.classList.add("game");
        node.appendChild(img);

        getConsoleAppendPoint().appendChild(node);
    }
    ipcRenderer.send('request-last-selected-console-index');
});

ipcRenderer.on('populate-last-selected-console-index', function(e, index)  {
    selectSystem(0, index);
});

ipcRenderer.send('request-console-list', "");

//Load Minecraft splash text
var request = new XMLHttpRequest();
request.onload = function() {
    var fileContent = this.responseText;
    var fileContentLines = fileContent.split( '\n' );
    var randomLineIndex = Math.floor( Math.random() * fileContentLines.length );
    var randomLine = fileContentLines[ randomLineIndex ];

    document.getElementById('splashText').innerHTML = randomLine;
    document.getElementById('splashText').classList.add('pulse');
};
request.open('GET', '../splashes.txt', true);
request.send();