var Client = {};
Client.socket = io('http://localhost:55000');

Client.sendTest = function() {
    console.log("test sent");
    Client.socket.emit('test');
};

/*
Client.fireProjectile = function() { Client.socket.emit('spaceKeyPress'); }
*/

//move player
Client.moveLeft 	= 	function()	{ 	Client.socket.emit('leftKeyPress'); 	};
Client.moveRight 	= 	function()	{ 	Client.socket.emit('rightKeyPress'); 	};
Client.moveUp 		= 	function() 	{ 	Client.socket.emit('upKeyPress'); 		};
Client.moveDown 	= 	function() 	{ 	Client.socket.emit('downKeyPress'); 	};


Client.askNewPlayer =  function() {														//uses socket object & sends message to server, labelled new player.
    Client.socket.emit('newplayer');
};
Client.socket.on('newplayer',function(data) {											//data object fed to newplayer callback corresponds to socket.player data sent by server.
    Game.addNewPlayer(data.id, data.x, data.y);
});

Client.socket.on('allplayers',function(data) {
	
    for(var i = 0; i < data.length; i++){												//id data, x & y co-ordinate data.
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y);
    }

    Client.socket.on('move',function(data){												//calls move function.
        Game.movePlayer(data.id, data.x, data.y);
    });

    Client.socket.on('remove',function(id){												//calls removes player function.
        Game.removePlayer(id);
    });
});