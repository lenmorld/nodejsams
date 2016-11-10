var http = require('http');

http.createServer(function (req, res) {
	res.writeHead(301, {
		'Location': 'http://devhumor.com'
	});

	// res.end('Hello World\n');
	res.end('Programming in node.js\n');
	// console.log(res);
}).listen(4920, "127.0.0.1");
console.log('Server running at http://127.0.0.1:4920');

