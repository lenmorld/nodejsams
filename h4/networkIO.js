var fs = require('fs'),
	http = require('http');


http.get({ host: 'devhumor.com' }, function(res) {
	console.log("Got response devhumor: " + res.statusCode);
}).on('error', function(e) {
	console.log("Got error: " + e.message);
});

fs.readFile('apples', 'utf-8', function (err, data) {
	if (err) throw err;
	// console.log(data);
	console.log("File read!")
});


http.get({ host: 'www.bbc.co.uk' }, function(res) {
	console.log("Got response bbc: " + res.statusCode);
}).on('error', function(e) {
	console.log("Got error: " + e.message);
});


fs.readFile('oranges', 'utf-8', function (err, data) {
	if (err) throw err;
	// console.log(data);
	console.log("File read!")
});



/*

the two files beingn read from disk are likely to return first

File read!
File read!
Got response bbc: 200
Got response devhumor: 200
*/