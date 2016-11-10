var http = require('http');



// non-blocking code, uses callbacks
// no gurantee which order these functions might return in


function fetchPage() {
	console.log("Fetching page");
	http.get({ host: 'trafficjamapp.herokuapp.com', path: '/?delay=2000' }, 
	function(res) {
		console.log("data returned from page: " + res.statusCode);
	}).on('error', function(e) {
		console.log("Got error: " + e);
	});
}





function fetchAPI() {
	console.log("Fetching data from API");
	http.get({ host: 'trafficjamapp.herokuapp.com', path: '/?delay=2000' }, 
	function(res) {
		console.log("data returned from API: " + res.statusCode);
	}).on('error', function(e) {
		console.log("Got error: " + e);
	});
}


fetchPage();
fetchAPI();


