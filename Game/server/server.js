const PORT = 55000;

var server = require('http').createServer();
var io = require('socket.io')(server);

io.on('connection', function(client) {
    
    client.on('test', function() {
        console.log('test received');
    });
	
	/* ATTEMPT AT BACKGROUND
	client.on('background', function() {
		client.broadcast.emit('background', client.background);
	});*/
	
	/****************************************
	*										*
	*			create new player			*
	*										*
	****************************************/
    client.on('newplayer',function() {
		//set player ID 1 higher than previous player ID.
		//set player x & y co-ordinates.
		//max movement speed to 20.
        client.player = {
            id: server.lastPlayerID++,
            x: 600,
            y: 600,
            maxSpeed: 20
        };
        client.emit('allplayers',getAllPlayers());
        client.broadcast.emit('newplayer', client.player);
		
		/****************************************
		*										*
		*			player movement				*
		*										*
		****************************************/
        client.on('leftKeyPress', function(data) {					//left key movement.
            console.log('left key press received');
            client.player.x -= client.player.maxSpeed;
            
            io.emit('move',client.player);
        });
        client.on('rightKeyPress', function(data) {					//right key movement.
            console.log('right key press received');
            client.player.x += client.player.maxSpeed;
            io.emit('move',client.player);
        });
        client.on('upKeyPress', function(data) {					//up key movement.
			console.log('up key press received');
			client.player.y -= client.player.maxSpeed;
			io.emit('move', client.player);
		});
		client.on('downKeyPress', function(data) {					//down key movement.
			console.log('down key press received');
			client.player.y += client.player.maxSpeed;
			io.emit('move', client.player);
		});
		
		//player disconnects, remove player ID.
        client.on('disconnect',function() {
            io.emit('remove', client.player.id);
            console.log('disconnecting: ' + client.player.id);
        });
    });
    
});

server.listen(PORT, function(){
    console.log('Listening on ' + server.address().port);
});

server.lastPlayerID = 1;

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

