// Ex03-Map.js

function doubleAll(numbers){ // numbers is an array 
	return numbers.map(function(elem, idx, its){
		return elem*2; 
	}); 
}

module.exports = doubleAll; 
