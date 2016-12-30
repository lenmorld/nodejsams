/*
	console.log()
	console.error()
	console.time() <-> console.end()
	console.trace()


*/



console.log("hello")


function notDefinedFunction() {
	try {
		someFunction(); //undefined
	}
	catch(e) {
		console.error(e);
	}
}
notDefinedFunction();




function someFunction2() {
	return undefinedVar; // undefined var
}


function notDefinedVar() {
	try {
		someFunction2(); 
	}
	catch(e) {
		console.error(e);
	}
}
notDefinedVar();


// *** benchamarking using console.time() and console.end() ****

var sum = 0;
var arr = new Array(1000000);

for (var i = 0; i < arr.length; i++) {
  arr[i] = Math.random();
}

console.time('for-loop-1');
for (var i in arr) {
  sum += arr[i];
}
console.timeEnd('for-loop-1');

console.time('for-loop-2');					//!!! CLASSIC FOR LOOP IS MUCH FASTER !!!
for (var i = 0; i < arr.length; i++) {
  sum += arr[i];
}
console.timeEnd('for-loop-2');




function notDefinedFunction3() {
	console.trace();
	try {
		someFunction3(); //undefined
	}
	catch(e) {
		console.error(e);
	}
}
notDefinedFunction3();