// Ex08-Call.js

function duckCount(){
	// arguments
	return Array.prototype.filter.call(arguments, function(elem, idx, its){
		return Object.hasOwnProperty.call(elem, 'quack'); 
	}).length; 
}

module.exports = duckCount; 

// answer
// 需要把arguments转化成数组 我没做这个 但是还是通过了
function duckCount_ans(){
	return Array.prototype.slice.call(arguments).filter(function(obj){
		return Object.prototype.hasOwnProperty.call(obj, 'quack'); 
	}).length; 
}
