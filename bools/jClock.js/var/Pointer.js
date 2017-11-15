// Pointer.js
// new Pointer(config) 
// or 
// Pointer.create 
var Pointer = (function(){
	// 把 config 和 this 合并 
	function Pointer(config){
		Object.keys(config).forEach(key => {
			// 赋值 
			this[key] = config[key]; 
		}); 
		console.log('New Pointer Created:', this);
	}

	// 原型 
	var PointerProto = {}; 
	Pointer.prototype = PointerProto

	// render 
	PointerProto.render = function(g){
		var rad = this.getRad() + Math.PI / 2; 

		g.strokeStyle = this.color; 
		g.lineWidth = this.lineWidth; 

		g.beginPath(); 
		g.moveTo(
			this.r / 2,
			this.r / 2
		); 
		g.lineTo(
			this.r / 2 + Math.cos(rad) * this.length,  
			this.r / 2 + Math.sin(rad) * this.length
		); 
		g.closePath(); 

		g.stroke();
	}

	// getRad 
	PointerProto.getRad = function(){
		var sec = this.getTime(); 

		var rad = (
			((sec - this.max / 2) / this.max)
			*
			(2 * Math.PI)
		); 

		return rad; 
	}

	// 封装 new 以避免使用 new 
	Pointer.create = function(config){
		return new Pointer(config); 
	}

	return Pointer; 
})(); 
