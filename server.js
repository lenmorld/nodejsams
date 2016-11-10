var http = require('http');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	// res.end('Hello World\n');
	res.end('Programming in node.js\n');
}).listen(4920, "127.0.0.1");
console.log('Server running at http://127.0.0.1:4920');

