// container.js
var Container = function(x) {
	this.__value = x;
}

Container.prototype.map = function(f){
	return Container.of(
		f(this.__value)
	); 
}

Container.of = function(x) {
	return new Container(x);
}


var a = Container.of(3); 

var inc = x => x + 1;

console.log(
	a.map(inc).map(inc)

)
