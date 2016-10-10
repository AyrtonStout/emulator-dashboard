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
        ipcRenderer.send('launch-game', document.getElementById("game" + selectedGame).innerHTML);
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
    ipcRenderer.send('request-game-details', getSelectedGameId());
    setGameInfo(newGame);
}

function setGameInfo(rowId) {
    let picture = document.getElementById("gameCoverArt");
    let gameDiv = document.getElementById("game" + rowId);
    let picturePath = `../imgs/covers/${gameDiv.getAttribute('gameId')}.jpg`;

    picture.setAttribute("src", picturePath);
}

function getSelectedGameId()    {
    return document.getElementsByClassName("selected")[0].getAttribute('gameId');
}

ipcRenderer.on('populate-game-list', function(e, gameData)  {
    numGames = gameData.length;
    for (let i = 0; i < gameData.length; i++)    {
        let game = gameData[i];
        let node = document.createElement("div");

        node.setAttribute('id', 'game' + i);
        node.setAttribute('gameId', game.id);
        node.classList.add("animated");
        node.innerHTML = game.name;
        document.getElementById("gameList").appendChild(node);
    }
    document.getElementById("game0").classList.add("selected");
    ipcRenderer.send('request-game-details', getSelectedGameId());
    setGameInfo(0);
});

//Probably shouldn't actually use this. Sending a request every time you go up and down through the game list seems dumb
ipcRenderer.on('populate-game-details', function(e, gameData)   {
    console.log("Received game details");
    console.log(gameData);
});

ipcRenderer.on('populate-console-info', function(e, consoleInfo)    {
    console.log(consoleInfo);
    document.getElementById("consoleName").innerHTML = consoleInfo.abbreviation;
    document.getElementById("consoleImage").setAttribute("src", `../imgs/${consoleInfo.abbreviation}.png`);
});

ipcRenderer.send('request-game-list', "");
ipcRenderer.send('request-console-info', "");