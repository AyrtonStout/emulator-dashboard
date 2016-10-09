//const gameLauncher = require('./gameLauncher.js');
const unirest = require('unirest');
const http = require('http-request');
const mysql = require('./mysql');

this.queryGameData = function(gameName, system)    {
    let options = {};
    sendQuery(gameName, system, options);
};

function sendQuery(gameName, system, options)   {
    let apiKey = "UZ7Yzmbll7mshdQKUXm6iIzXeMKDp1BMIUPjsnA7KrwDs0Mahj";

    let limit =  options.limit || 30;
    let offset =  options.offset || 0;
    let order =  options.order || "release_dates.date:desc";

    let url = `https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=*&limit=${limit}&offset=${offset}&search=${gameName}`;

    unirest.get(encodeURI(url))
        .header("X-Mashape-Key", apiKey)
        .header("Accept", "application/json")
        .end(function (result) {
            let games = result.body;
            games = games.filter(function(game) {
                return (game.name.toLowerCase() == gameName.toLowerCase());
            });
            let game = games[0];
            if (game)   {
                downloadCover(gameName, game.cover.cloudinary_id);
                mysql.addGame(game.name, system, game.first_release_date);
            } else {
                console.log(`Failed to find game with name identical to "${gameName}"`);
                games.map(function(game) { console.log(game.name); });
                console.log("\nAttempted URL:");
                console.log(url);
            }

            /*
             console.log(result.body.map(function(game) {
             return game.cover.cloudinary_id;
             }));
             */
        });
}

function downloadCover(gameName, cloudinaryId)    {
    let url = `https://res.cloudinary.com/igdb/image/upload/t_cover_big_2x/${cloudinaryId}`;
    let imageDir = `./public/imgs/covers/${gameName}.jpg`;

    let options = {url: url};
    http.get(options, imageDir, function (error, result) {
        if (error) {
            console.error("Error downloading game cover");
            console.error(error);
            console.error(`Url: ${url}`);
            console.error(`CloudinaryId: ${cloudinaryId}`);
        }
    });
}
