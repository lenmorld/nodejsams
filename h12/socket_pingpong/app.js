var http = require('http');
var fs = require('fs');

var ctr = 0;


var server = http.createServer(function (req, res) {
	fs.readFile('./index.html', function(error, data) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(data, 'utf-8');
	});
}).listen(3000, "127.0.0.1");

console.log('Server running at http://127.0.0.1:3000');

// bind socket.io to the server, making real-time comm available to any
// client connecting to the server

var io = require('socket.io').listen(server);


io.sockets.on('connection', function(socket) {


	socket.on('ping', function(data) {
		console.log('received PING');
		socket.emit('pong', {text: 'PONG'});
	});

	socket.on('pong', function(data) {
		console.log('received PONG response! PONG!!!');
	});


	//send PING every 10 sec
	setInterval(function () {
		console.log('Sending PING to client!');
		socket.emit('ping', { text: 'PING'});
	}, 10000);


});