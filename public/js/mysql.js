const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'telephone314',
    database: 'emulation_station'
});

connection.connect();

this.getActiveGameSystems = function(callback) {
    connection.query('SELECT * FROM game_systems WHERE active = 1;', function (err, rows, fields) {
        if (err) throw err;
        callback(rows);
    });
};

this.getGames = function(system, callback)    {
    connection.query(`SELECT * FROM games WHERE system = ${system};`, function (err, rows, fields)  {
        if (err) throw err;
        callback(rows);
    });
};

this.getGameData = function(gameId, callback)   {
    connection.query(`SELECT * FROM games WHERE id = ${gameId};`, function (err, rows, fields)  {
        if (err) throw err;
        callback(rows);
    });
};

this.getConsoleData = function(consoleId, callback) {
    connection.query(`SELECT * FROM game_systems WHERE id = ${consoleId}`, function (err, rows, fields) {
        callback(rows);
    });
};

this.addGame = function(name, fileSystemName, system, release, callback)   {
    release = new Date(release);
    release = `${release.getFullYear()}-${release.getMonth()}-${release.getDay()}`;
    let sql = `INSERT INTO games (name, file_name, system, \`release\`) VALUES (${mysql.escape(name)}, ${mysql.escape(fileSystemName)}, ${system}, '${release}')`;
    sql += `ON DUPLICATE KEY UPDATE \`release\` = '${release}', file_name = ${mysql.escape(fileSystemName)}`;
    connection.query(sql, function (err, result)    {
        if (err) throw err;

        callback(result.insertId);
    });
};