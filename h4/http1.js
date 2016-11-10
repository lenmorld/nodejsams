var http = require('http');

// function(res) is a callback that takes the response as an argument

http.get({ host: 'shapeshed.com' }, function(res) {
	console.log("Got response: " + res.statusCode);
}).on('error', function(e) {
	console.log("Got error: " + e.message);
});