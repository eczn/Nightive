// Ex03-ArrowFunctions.js
let inputs = process.argv.slice(2); 

var result = inputs.map((elem)=>{
	return elem.charAt(0);
}).reduce((acc, curr)=>{
	return acc+curr; 
}, ''); 

console.log(`[${inputs.join(',')}] becomes "${result}"`); 

// Answer 
// var inputs = process.argv.slice(2); 
// var result = inputs.map(s => s[0])
// 				.reduce((soFar, s) => soFar + s);
// console.log(`[${inputs}] becomes "${result}"`); 
