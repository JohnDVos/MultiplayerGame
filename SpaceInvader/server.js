var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var players = {};

app.use(express.static(__dirname + '/public'));
 
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('user ' +socket.id+ ' connected');    
    
    // create a new player and add it to our players object
    players[socket.id] = {
        rotation: 0,
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 500) + 50,
        playerId: socket.id,
        team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
    };
	
	var heartPowerUp = {
		x : Math.floor(Math.random() * 700) + 50,
		y : Math.floor(Math.random() * 500) + 50
	};
	
	var damagePowerUp = {
		x : Math.floor(Math.random() * 700) + 50,
		y : Math.floor(Math.random() * 500) + 50
	};
	
	var scores = {
		blue : 0,
		red : 0
	};
	
    
    socket.emit('currentPlayers', players);																				// send the players object to the new player.
    socket.broadcast.emit('newPlayer', players[socket.id]);  															// update all other players of the new player.
	
	socket.emit('heartPowerUpLocation', heartPowerUp);																	//send heart power-up object to the new player.
	socket.emit('damagePowerUpLocation', damagePowerUp);																//send damage power-up object to the new player.
	socket.emit('scoreUpdate', scores);																					//send the current scores.
    
    socket.on('disconnect', function () {
        console.log('user disconnected');
        // remove this player from our players object
        delete players[socket.id];
        // emit a message to all players to remove this player
        io.emit('disconnect', socket.id);
    });
    // when a player moves, update the player data
    socket.on('playerMovement', function (movementData) {
        players[socket.id].x = movementData.x;
        players[socket.id].y = movementData.y;
        players[socket.id].rotation = movementData.rotation;
    // emit a message to all players about the player that moved
        socket.broadcast.emit('playerMoved', players[socket.id]);
    });
	
	socket.on('heartPowerUpCollected', function() {																			//when a heart power-up is collected.
		if(players[socket.id].team === 'red') {																				//if the socket id belongs to the red team.
			scores.red += 10;																								//red teams score + 10 points.
		} else {																											//if the socket id belongs to the blue team.
			scores.blue += 10;																								//blue teams score + 10 points.
		}
		heartPowerUp.x = Math.floor(Math.random() * 700) + 50;																//x co-ordinate.
		heartPowerUp.y = Math.floor(Math.random() * 500) + 50;																//u co-ordinate.
		io.emit('heartPowerUpLocation', heartPowerUp);																		//emits heart power-up was picked up.
		io.emit('scoreUpdate', scores);																						//updates score.
	});
	
	socket.on('damagePowerUpCollected', function() {																		//when a damage power-up is collected.
		if(players[socket.id].team === 'red') {																				//if the socket id belongs to the red team.
			scores.red += 10;																								//red teams score + 10 points.
		} else {																											//if the socket id belongs to the blue team.
			scores.blue += 10;																								//blue teams score + 10 points.
		}
		damagePowerUp.x = Math.floor(Math.random() * 700) + 50;																//x co-ordinate.
		damagePowerUp.y = Math.floor(Math.random() * 500) + 50;																//u co-ordinate.
		io.emit('damagePowerUpLocation', damagePowerUp);																	//emits damage power-up was picked up.
		io.emit('scoreUpdate', scores);																						//updates score.
	});
});

server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`);
});