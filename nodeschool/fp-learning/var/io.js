function IO(v){
	this.__value = v; 
}

IO.of = function(v){
	return new IO(v); 
}

IO.prototype.map = function(f){
	return IO.of(f(this.__value))
}

module.exports = IO; 
