// Ex18-FunctionCall.js
// Function.prototype.call()

// module.exports = (arr, a, b) => Array.prototype.slice.call(arr, a, b);


// ans: 
module.exports = Function.call.bind(Array.prototype.slice); 


// 这个其实就是 Array.prototype.slice.call 