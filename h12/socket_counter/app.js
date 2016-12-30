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

// allow socket.io respond to certain events and messages from clients
// socket.io listens for many events, such as conn and disconn
io.sockets.on('connection', function(socket) {
	ctr++;
	console.log('User connected. ' + ctr + ' users present.');
	socket.emit('users', {number: ctr});		//send from server to 1 client
	socket.broadcast.emit('users', {number: ctr});		//send from server to all clients

	socket.on('disconnect', function() {
		ctr--;
		console.log("User disconnect. " + ctr + ' users present');
		socket.broadcast.emit('users', {number: ctr})
	});

});