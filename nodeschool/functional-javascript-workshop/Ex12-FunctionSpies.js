// Ex12-FunctionSpies.js

function Spy(target, method){
	let pre = target[method]; 
	var spy = {
		count: 0
	}; 

	target[method] = function(){
		let argu = Array.prototype.slice.call(arguments);
		spy.count++; 
		
		return pre.apply(target, argu); 
	}

	return spy; 
}

module.exports = Spy; 

// ans: 
function Spy_ans(target, method) {
	var originalFunction = target[method]; 

	var result = {
		count: 0
	}

	target[method] = function() {
		result.count++; 
		return originalFunction.apply(this, arguments); 
	}
}
