// Ex07-Recursion.js
function _reduce(arr, fn, prev) {
	var curr;
	curr = arr[0]; 

	if (arr.length == 1){
		return fn(prev, curr);  

	} else {
		prev = fn(prev, curr); 
		return reduce(arr.slice(1), fn, prev);	
	}
}

function reduce(arr, fn, initial) {
	var prev, curr;

	if (initial !== undefined){
		prev = initial;
		curr = arr[0];
	} else {
		prev = arr[0];
		curr = [1]; 
		arr = arr.slice(1); 
	}

	return _reduce(arr, fn, prev); 
}

module.exports = reduce; 


// Answer 
// 如果执行 reduce_ans(arr, fn) 不提供 initial .... 
// value应该是 undefined的。。。 
// 而不是标准文档指出的 
// "如果没有initialValue参数, reduce从index为1开始执行回调函数, 跳过第一个index. 如果有initialValue参数, reduce 将从index为 0 开始执行回调."
function reduce_ans(arr, fn, initial) {
	return (function() reduceOne(idx, value){
		if (idx > arr.length -1) return value; 

		return reduceOne(idx+1, fn(value, arr[idx], idx, arr)); 
	})(0, initial); 
}
