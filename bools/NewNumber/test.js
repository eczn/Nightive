// test.js
const NN = require('./nn.js'); 

var l = new NN('2222.3567'); 
var d = new NN('0.2');  

console.log('2222.35 * 0.2'); 
console.log('::::', 2222.35 * 0.2); 
console.log('NN::', l.mul(0.2).valueOf());


