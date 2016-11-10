function sleep(ms) {
	var start = new Date().getTime();
	while ((new Date().getTime() - start) < ms ) {

	}
}

//simulates getting a webpage, and getting data from API

function fetchPage() {
	console.log('fetching page');
	sleep(2000);
	console.log('data returned from requesting page');
}


function fetchAPI() {
	console.log('fetching API');
	sleep(2000);
	console.log('data returned from API');
}


fetchPage();
fetchAPI();