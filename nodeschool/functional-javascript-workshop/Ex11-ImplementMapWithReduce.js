// Ex11-ImplementMapWithReduce.js

module.exports = function arrayMap(arr, fn){
	return arr.reduce(function(prev, curr, idx, its){
		prev.push(fn(curr, idx, its)); 
		return prev; 
	}, []); 
}
