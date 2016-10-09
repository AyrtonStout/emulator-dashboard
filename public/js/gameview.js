const {ipcRenderer} = require('electron');
var selectedGame = 0;
var numGames = 3;

ipcRenderer.on('button-long', function(e, arg)    {
    //document.getElementById("buttonLong").innerHTML = "Button Long: " + arg;
});

ipcRenderer.on('button-short', function(e, button)    {
    if (button === "dpad.down") {
        moveSelection(1);
    } else if (button === "dpad.up")    {
        moveSelection(-1);
    } else if (button === "buttons.a") {
        ipcRenderer.send('launch-game', selectedGame);
    } else if (button === "buttons.b")   {
        ipcRenderer.send('enter-console-select', "");
    }
});

function moveSelection(direction)   {
    if (selectedGame + direction === numGames) return false;
    if (selectedGame + direction < 0) return false;
    selectGame(selectedGame, selectedGame + direction);
    selectedGame += direction;
}

function selectGame(oldGame, newGame)    {
    document.getElementById("game" + oldGame).classList.remove("selected");
    document.getElementById("game" + oldGame).classList.remove("pulse");
    document.getElementById("game" + newGame).classList.add("selected");
    document.getElementById("game" + newGame).classList.add("pulse");
    let gameName = document.getElementById("game" + newGame).innerHTML;
    ipcRenderer.send('request-game-details', gameName);
}

ipcRenderer.on('populate-game-list', function(e, gameNames)  {
    numGames = gameNames.length;
    for (let i = 0; i < gameNames.length; i++)    {
        let node = document.createElement("div");
        node.setAttribute('id', 'game' + i);
        node.classList.add("animated");
        node.innerHTML = gameNames[i];
        console.log(node);
        document.getElementById("gameList").appendChild(node);
    }
    document.getElementById("game0").classList.add("selected");
});

ipcRenderer.on('populate-game-details', function(e, gameData)   {
    console.log("Received game details");
    console.log(gameData);
});

ipcRenderer.send('request-game-list', "");
