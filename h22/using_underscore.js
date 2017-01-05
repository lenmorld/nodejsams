var numbers = [1,2,3];
for (var i=0; i < numbers.length; i++) {
	console.log(numbers[i]);
}


//using each of underscore

// var underscore = require('underscore.js');
var numbers = [1,2,3];
_.each(numbers, function(n) {
	console.log(n);
});