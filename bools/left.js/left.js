var L = (function(){
	var LP = []; 

	LP.addClass = function(newClass){
		this.forEach(function(elem, idx, its){
			var preClassName = elem.getAttribute('class'); 
			elem.setAttribute('class', preClassName + ' ' + newClass); 
		}); 
	}

	LP.removeClass = function(targetClass){
		this.forEach(function(elem, idx, its){
			var preClassName = elem.getAttribute('class'); 
			var classList = preClassName.split(' '); 
			
			var newClassList = classList.filter(item => item !== targetClass); 

			elem.setAttribute('class', newClassList.join(' '))
		}); 
	}

	LP.click = function(cb){
		this.forEach(function(elem, idx, its){
			elem.addEventListener('click', cb);
		}); 
	}

	LP.keyHandle = function(cb){
		this.forEach(function(elem, idx, its){
			elem.addEventListener('keydown', cb);
		}); 
	}

	LP.html = function(newHTML){
		return newHTML ? this.forEach( (elem) => {
			elem.innerHTML = newHTML; 
		}) : this.map((e) => e.innerHTML);
	}

	LP.not = function(notSel){
		var q = Array.prototype.slice.call(
			document.querySelectorAll(notSel)
		); 
		
		return L(this.filter((elem, idx1)=>{
			return !q.some(function(item, idx2){
				if (idx1 === idx2){
					return true; 
				} else {
					return (item === elem); 
				}
			});
		}));  
	}

	LP.attr = function(name, val){
		if (val){
			return this[0].setAttribute(name, val);
		} else {
			var fir = this[0].getAttribute(name); 
			return fir ? fir : this[0][name]
		}
	}

	LP.before = function(html){
		this.forEach(e => {
			e.outerHTML = html + e.outerHTML; 
		}); 
	}

	LP.after = function(html){
		this.forEach(e => {
			e.outerHTML += html; 
		}); 
	}

	LP.append = function(html){
		this.forEach(e => {
			e.innerHTML += html; 
		}); 
	}

	LP.prepend = function(html){
		this.forEach(e => {
			e.innerHTML = html + e.innerHTML; 
		});
	}

	LP.empty = function(){
		this.forEach(e => {
			e.innerHTML = ''; 
		});
	}

	LP.remove = function(){
		this.forEach(e => {
			e.outerHTML = ''; 
		});
	}

	function ready(fn) {
		if (document.readyState != 'loading'){
			fn();
		} else {
			document.addEventListener('DOMContentLoaded', fn, false);
		}
	}

	function L(sel){
		function Left(sel){
			// maybe it is DOM 
			var query;  
			if (typeof sel === 'string'){
				query = document.querySelectorAll(sel);
			} else if (typeof sel === 'function'){
				ready(sel); 
				return; 
			} else if (sel.length) {
				query = sel;
			} else {
				query = [ sel ]
			}
			
			this._version = 'left.js@0.0.1'; 
			this.sel = sel; 


			query.forEach((elem, idx, its)=>{
				this[idx] = elem; 
			}); 
			this.length = query.length; 
		}


		Left.prototype = LP; 


		return new Left(sel);
	}

	return L; 
})(); 
