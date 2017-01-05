var lennyObject = {
	name: "Lenny",
	occupation: "programmer",
	home: "Montreal"
}

console.log('JS Object');
console.log(lennyObject);


var json = JSON.stringify(lennyObject);
console.log('JS object to JSON');
console.log(json);

var parsedJSON = JSON.parse(json);
console.log('Parsing JSON into JS Object');
console.log(parsedJSON);
