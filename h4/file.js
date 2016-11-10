var fs = require('fs');

fs.readFile('apples', 'utf-8', function (err, data) {
	if (err) throw err;
	console.log(data);
});