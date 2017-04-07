// Ex14-Trampoline.js
// 利用蹦床 Trampoline 解决递归可能导致的栈溢出问题

function repeat(operation, num){
	if (num < 0) return false; 
	operation(); 

	return function(){
		repeat(operation, --num);
	} 
}

function trampoline(fn) {
	while (fn){
		fn = fn(); 
	}
}

module.exports = function(operation, num) {
	trampoline(function(){
		return repeat(operation, num); 	
	}); 
}

