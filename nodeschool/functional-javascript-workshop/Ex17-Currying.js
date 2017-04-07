// Ex17-Currying.js

function curryN(fn, n, argu){
	n = n || fn.length; 
	argu = argu || []; 


	return function(){
		let tempArgu = Array.prototype.slice.apply(arguments); 
		var newOne = tempArgu[tempArgu.length-1]; 
		
		if (argu.length === n-1){
			return fn.apply(this, argu.concat(newOne));
		} else {
			return curryN(fn, n, argu.concat(newOne));
		}
	}
}

module.exports = curryN; 
