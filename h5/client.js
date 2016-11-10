var http = require('http');

var options = {
	host: 'devhumor.com',
	port: 80,
	path: '/'
};

http.get(options, function(res) {
	if (res.statusCode == 200) {
		console.log("this site is up!");
	}
	else {
		console.log("this site is down!");
	}
}).on('error', function(e) {
	console.log("some error : " + e.message);
});