var http = require('http');
http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	var lennyObject = {
		name: "Lenny",
		occupation: "programmer",
		home: "Montreal"
	}
	// res.end('{"name": "Lenny", "occupation": "programmer", "home": "Montreal"}');
	res.end(JSON.stringify(lennyObject));

}).listen(3000, "127.0.0.1");

console.log("server running at http://127.0.0.1:3000/");