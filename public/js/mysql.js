const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'telephone314',
    database: 'emulation_station'
});

connection.connect();

this.testMysql = function() {

    connection.query('SELECT * FROM game_systems;', function (err, rows, fields) {
        if (err) throw err;

        console.log("Result query:");
        console.log(rows);
    });

    connection.end();
};

this.getActiveGameSystems = function(callback) {
    connection.query('SELECT * FROM game_systems WHERE active = 1;', function (err, rows, fields) {
        if (err) throw err;
        callback(rows);
    });
};

this.addGame = function(name, system, release)   {
    release = new Date(release);
    release = `${release.getFullYear()}-${release.getMonth()}-${release.getDay()}`;
    let sql = `INSERT INTO games (name, system, \`release\`) VALUES (${mysql.escape(name)}, ${system}, '${release}')`;
    sql += `ON DUPLICATE KEY UPDATE \`release\` = '${release}'`;
    connection.query(sql)
};