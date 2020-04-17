const PORT = 55000;

var server = require('http').createServer();
var io = require('socket.io')(server);

io.on('connection', function(client) {
    
    client.on('test', function() {
        console.log('test received');
    });
    
    client.on('newplayer',function() {
        client.player = {
            id: server.lastPlayerID++,
            x: randomInt(100,400),
            y: randomInt(100,400),
            maxSpeed: 10
        };
        client.emit('allplayers',getAllPlayers());
        client.broadcast.emit('newplayer',client.player);

        client.on('leftKeyPress', function(data) {
            console.log('left key press received');
            client.player.x -= client.player.maxSpeed;
            
            io.emit('move',client.player);
        });
        
        client.on('rightKeyPress', function(data) {
            console.log('right key press received');
            client.player.x += client.player.maxSpeed;
            
            io.emit('move',client.player);
        });
        
        client.on('upKeyPress', function(data) {
			console.log('up key press received');
			client.player.y -= client.player.maxSpeed;
			
			io.emit('move', client.player);
		});
		
		client.on('downKeyPress', function(data) {
			console.log('down key press received');
			client.player.y += client.player.maxSpeed;
			
			io.emit('move', client.player);
		});
		
		/*
		socket.on('movement', function(data) {
			var player = player[socket.id] || {};
			if (data.up) { player.y -= 10; }
			if (data.down) { player.y += 10; }
			if (data.left) { player.x -= 10; }
			if (data.right) { player.x += 10; }
		});*/
		
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

