var Client = {};
Client.socket = io('http://localhost:55000');

Client.sendTest = function() {
    console.log("test sent");
    Client.socket.emit('test');
};


//move player
Client.moveLeft = function(){ Client.socket.emit('leftKeyPress'); };
Client.moveRight = function(){ Client.socket.emit('rightKeyPress'); };
Client.moveUp = function() { Client.socket.emit('upKeyPress'); };
Client.moveDown = function() { Client.socket.emit('downKeyPress'); };

//uses socket object & sends message to server, labelled new player.
Client.askNewPlayer =  function() {
    Client.socket.emit('newplayer');
};

//data object fed to newplayer callback corresponds to socket.player data sent by server.
Client.socket.on('newplayer',function(data) {
    Game.addNewPlayer(data.id, data.x, data.y);
});

Client.socket.on('allplayers',function(data) {
	
    for(var i = 0; i < data.length; i++){								//id date, x & y co-ordinate data.
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y);
    }

    Client.socket.on('move',function(data){
        Game.movePlayer(data.id, data.x, data.y);
    });

    Client.socket.on('remove',function(id){
        Game.removePlayer(id);
    });
});


