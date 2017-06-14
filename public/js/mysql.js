const mysql = require('mysql');

try {
    var db_config = require('../../db.conf.json');
} catch (err) {
    console.log('Error reading db.conf.json! Copy db.conf.example and rename it db.conf.json with your MySQL database credentials');
    console.log(err);
}

var connection = mysql.createConnection(db_config);

connection.connect();

keepAliveForever();

function keepAliveForever()	{
    connection.query('SELECT * FROM game_systems LIMIT 1', function (err, rows, fields) {
        console.log('Pinging to keep MySQL connection alive');
    });
    setTimeout(keepAliveForever, 600000);
}

function handleDisconnect() {
  connection = mysql.createConnection(db_config);

  connection.connect(function(err) {
    if(err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

this.getActiveGameSystems = function(callback) {
    try {
        connection.query(`SELECT * FROM game_systems WHERE active = 1;`, function (err, rows, fields) {
            if (err) throw err;
            callback(rows);
        });
    } catch (err) {
        handleDisconnect();
        getActiveGameSystems(callback);
    }
};

this.getGames = function(system, callback)    {
	try {
        connection.query(`SELECT * FROM games WHERE system = ${system} ORDER BY name ASC;`, function (err, rows, fields) {
            if (err) throw err;
            callback(rows);
        });
    } catch (err) {
        handleDisconnect();
        getGames(system, callback);
    }
};

this.getGameData = function(gameId, callback)   {
	try {
        connection.query(`SELECT * FROM games WHERE id = ${gameId};`, function (err, rows, fields) {
            if (err) throw err;
            callback(rows);
        });
    } catch (err) {
        handleDisconnect();
        getGameData(gameId, callback);
    }
};

this.getConsoleData = function(consoleId, callback) {
	try {
        connection.query(`SELECT * FROM game_systems WHERE id = ${consoleId}`, function (err, rows, fields) {
            if (err) throw err;
            callback(rows);
        });
    } catch (err) {
        handleDisconnect();
        getConsoleData(consoleId, callback);
    }
};

this.addGame = function(name, fileSystemName, system, release, callback)   {
	try {
        let releaseDate = new Date(release);
        releaseDate = `${releaseDate.getFullYear()}-${releaseDate.getMonth()}-${releaseDate.getDay()}`;
        let sql = `INSERT INTO games (name, file_name, system, \`release\`) VALUES (${mysql.escape(name)}, ${mysql.escape(fileSystemName)}, ${system}, '${releaseDate}')`;
        sql += `ON DUPLICATE KEY UPDATE \`release\` = '${releaseDate}', file_name = ${mysql.escape(fileSystemName)}`;
        
		connection.query(sql, function (err, result)    {
            if (err) throw err;

            callback(result.insertId);
        });
    } catch (err) {
        handleDisconnect();
        addGame(name, fileSystemName, system, release, callback);
    }
};