const {ipcRenderer} = require('electron');

let maxGamesInView = 3;
var selectedGame = 0;
var firstGameId = 0; //The list of games can be scrolled through. This is the ID of the first game in the list
var numGames = 3;
var gameData = null;

ipcRenderer.on('button-long', function(e, arg)    {
    //document.getElementById("buttonLong").innerHTML = "Button Long: " + arg;
});

ipcRenderer.on('button-short', function(e, button)    {
    if (button === "dpad.down") {
        moveSelection(1);
    } else if (button === "dpad.up")    {
        moveSelection(-1);
    } else if (button === "buttons.a") {
        ipcRenderer.send('launch-game', document.getElementById("game" + selectedGame).getAttribute("fileName"));
    } else if (button === "buttons.b")   {
        ipcRenderer.send('enter-console-select', "");
    }
});

function moveSelection(direction)   {
    if (selectedGame + direction === numGames) return false;
    if (selectedGame + direction < 0) return false;

    if (selectedGame + direction >= firstGameId + maxGamesInView)    {
        adjustGameList(direction); //Going down
    } else if (selectedGame + direction < firstGameId)  {
        adjustGameList(direction); //Going up
    }

    selectGame(selectedGame, selectedGame + direction);
    selectedGame += direction;
}

function adjustGameList(direction)  {
    let list = document.getElementById("gameList");
    if (direction === 1) { //Down
        list.removeChild(list.firstChild);
        let gameIndex = firstGameId + maxGamesInView;
        let gameNode = createGameListNode(gameData[gameIndex], gameIndex);
        list.appendChild(gameNode);
        firstGameId++;
        if (firstGameId === 1) {
            document.getElementById('scrollUp').style.display = 'inherit';
        }
        if (firstGameId + maxGamesInView === numGames)  {
            document.getElementById('scrollDown').style.display = 'none';
        }
    } else if (direction === -1)    { //Up
        list.removeChild(list.lastChild);
        let gameIndex = firstGameId - 1;
        let gameNode = createGameListNode(gameData[gameIndex], gameIndex);
        list.insertBefore(gameNode, list.firstChild);
        firstGameId--;
        if (firstGameId === 0)  {
            document.getElementById('scrollUp').style.display = 'none';
        }
        if (firstGameId + maxGamesInView < numGames) {
            document.getElementById('scrollDown').style.display = 'inherit';
        }
    }
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

function createGameListNode(gameData, nodeId)   {
    let node = document.createElement("div");

    node.setAttribute('id', 'game' + nodeId);
    node.setAttribute('gameId', gameData.id);
    node.setAttribute('fileName', gameData.file_name);
    node.classList.add("animated");
    node.innerHTML = gameData.name;

    return node;
}

ipcRenderer.on('populate-game-list', function(e, gameData)  {
    self.gameData = gameData;
    numGames = gameData.length;
    for (let i = 0; i < gameData.length; i++)    {
        let node = createGameListNode(gameData[i], i);

        document.getElementById("gameList").appendChild(node);

        if ((i + 1) === maxGamesInView) break;
    }
    document.getElementById("game0").classList.add("selected");
    ipcRenderer.send('request-game-details', getSelectedGameId());
    setGameInfo(0);

    if (numGames > maxGamesInView) {
        document.getElementById('scrollDown').style.display = 'inherit';
    }
});

ipcRenderer.on('populate-console-info', function(e, consoleInfo)    {
    document.getElementById("consoleName").innerHTML = consoleInfo.abbreviation;
    document.getElementById("consoleImage").setAttribute("src", `../imgs/${consoleInfo.abbreviation}.png`);
});

ipcRenderer.send('request-game-list', "");
ipcRenderer.send('request-console-info', "");