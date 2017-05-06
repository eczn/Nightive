// ls.js
var LS = (function(ls){
	var LSP = {}; 
	
	LSP.get = function(){
		return JSON.parse(ls.getItem(this.name)); 
	}
	
	LSP.set = function(e){
		// e.__timeStamp = new Date(); 
		return ls.setItem(this.name, JSON.stringify(e)); 
	}

	LSP.add = function(e){
		var o = this.get(); 
		e.__createAt = new Date(); 
		e.__id = +(new Date()); 
		o.push(e); 
		this.set(o); 

		// callback 
		this.whenAdd && this.whenAdd(e); 
	}

	LSP.map = function(howToDo, needAsnyc, cb){
		function _(){
			var data = this.get(); 
			var newData = howToDo(data); 
			LSP.set(newData); 

			typeof cb === 'function' && cb(newData); 
			return newData; 
		}

		return needAsnyc ? setTimeout(_) : _(); 
	}

	LS.prototype = LSP; 

	function LS(name, cb, isObj){
		this.name = name; 
		// whenAdd's this <= this.get() 
		this.whenAdd = cb.bind(this); 
		if (!ls[name]){
			if (isObj){ // empty object 
				ls.setItem(name, JSON.stringify({}));
			} else { // empty array
				ls.setItem(name, JSON.stringify([]));
			}
		} else {
			this.whenAdd(); 
		}
	}
	LS.VERSION = 'ls.js@0.1.0'; 

	return LS; 
})(window.localStorage)
