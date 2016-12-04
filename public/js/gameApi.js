//const gameLauncher = require('./gameLauncher.js');
const unirest = require('unirest');
const http = require('http-request');
const mysql = require('./mysql');

this.queryGameData = function(gameName, fileExtension, system)    {
    let options = {};
    sendQuery(gameName, fileExtension, system, options);
};

function sendQuery(fileSystemName, fileExtension, system, options)   {
    let apiKey = "UZ7Yzmbll7mshdQKUXm6iIzXeMKDp1BMIUPjsnA7KrwDs0Mahj";

    let limit =  options.limit || 30;
    let offset =  options.offset || 0;
    let order =  options.order || "release_dates.date:desc";

    let url = `https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=*&limit=${limit}&offset=${offset}&search=${fileSystemName}`;

    unirest.get(encodeURI(url))
        .header("X-Mashape-Key", apiKey)
        .header("Accept", "application/json")
        .end(function (result) {
            let games = result.body;
            let targetSlug = convertToSlug(fileSystemName);
            games = games.filter(function(game) {
                return (game.slug == targetSlug);
            });
            let game = games[0];
            if (game)   {
                mysql.addGame(game.name, (fileSystemName + fileExtension), system, game.first_release_date, function (insertId)   {
                    downloadCover(insertId, game.cover.cloudinary_id);
                });
            } else {
                console.log(`Failed to find game with name identical to "${fileSystemName}"`);
                console.log(`Looked for slug "${targetSlug}"`);
                games.map(function(game) { console.log(game.name); });
                console.log("\nAttempted URL:");
                console.log(url);
            }
        });
}

function convertToSlug(string)    {
    string = string.toLowerCase();
    string = string.replace(/ - /g, ' '); //The slug for the SNES TMNT game looks like "Stuff - More stuff" and the hyphen gets removed
    string = string.replace(/[:.!]/g, '');
    string = string.replace(/[ ']/g, '-');
    string = string.replace(/(-)\1+/g, '$1');
	
    return changeSlugForAPIBeingWrong(string);
}

//The IGDB can be wrong on what games are called and this prevents them from being found when searching
//This function converts their real slug into the slug IGDB expects.
function changeSlugForAPIBeingWrong(slug) {
    if (slug == "battletanx") {
        return "battle-tanx";
    } else if (slug == "battletanx-global-assault") {
        return "battle-tanx-global-assault"
    } else if (slug == "aerofighters-assault") {
        return "aero-fighters-assault"; 
    } else if (slug == "road-runner-s-death-valley-rally") {
        return "road-runners-death-valley-rally"; //This slug it wants is just wrong. Different than how all the others were generated. Good job IGDB
    }
	
	return slug;
}

function downloadCover(gameId, cloudinaryId)    {
    let url = `https://res.cloudinary.com/igdb/image/upload/t_cover_big_2x/${cloudinaryId}`;
    let imageDir = `./public/imgs/covers/${gameId}.jpg`;

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
