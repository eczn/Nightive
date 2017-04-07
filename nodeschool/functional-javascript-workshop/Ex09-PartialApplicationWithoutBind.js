// Ex09-PartialApplicationWithoutBind.js

var slice = Array.prototype.slice; 

function logger(namespace){
	return function(){
		var argu = slice.call(arguments);
		argu.unshift(namespace); 
		console.log(argu.join(' '));
	}
}

module.exports = logger; 

// answer 

function logger_ans(namespace){
	return function(){
		console.log.apply(console, [namespace].concat(slice.call(arguments))); 
	}
}
