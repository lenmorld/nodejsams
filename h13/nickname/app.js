//simple Express Socket.IO server

/*
	server index.html and send a welcome message to clients when they connect
*/


var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

// NICKNAMES
var nicknames= [];


app.set('port', process.env.PORT || 3000);

if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});

// ssocket.io code
io.sockets.on('connection', function(socket) {
	socket.emit('welcome', { text: 'HELLO! you are connected'});

	// when client sends nickname
	socket.on('nickname', function(data) {
		console.log('User has connected ', data);
		nicknames.push(data);
		console.log(nicknames);
		socket.nickname = data; 	// track user for disconnect
	});


	// when client disconnects
	socket.on('disconnect', function() {
		if (!socket.nickname) return;		// no nicknames yet
		if (nicknames.indexOf(socket.nickname) > -1) {
			// splice(index, howmany)
			nicknames.splice(nicknames.indexOf(socket.nickname), 1);
		}
		console.log(nicknames);
	});



});


// start server
server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
})