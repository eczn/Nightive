var PP = {
	sayName: function(){
		console.log(`${this.name}: Hello, i am ${this.name}`); 
	},
	sayHelloTo: function(otherOne){
		console.log(`${this.name}: Hello, ${otherOne.name}`); 
	}
}

function Person(n, a){
	this.name = n; 
	this.age = a; 
}

Person.prototype = PP; 

module.exports = Person; 
