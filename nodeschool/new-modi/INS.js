function INS(cons){
	var argu = Array.prototype.slice.call(arguments, 1)
	  , instance = Object.create(cons.prototype)
	  , result = cons.apply(instance, argu); 

	if (typeof result === 'object'){
		return result; 
	} else {
		return instance; 
	}
}

module.exports = INS; 
