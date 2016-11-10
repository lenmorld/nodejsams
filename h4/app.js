function haveBreakfast(food, drink, callback) {
	console.log('Having breakfast: ' + food + ' ' + drink);
	if (callback && typeof(callback) === "function") {
		callback();
	}
}



function alertMe() {
	console.log("hey ho");
}


//anonymous function
haveBreakfast('bacon', 'coke', function () {
	console.log('finished breakfast. go to work!');
});


/*
it is weird that hey ho displays after have breakfast, even though
the only diffrence with the anonymous function is that is anonymous
*/
haveBreakfast('apple', 'apple juice', alertMe());


