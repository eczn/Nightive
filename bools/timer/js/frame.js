// frame
function Pen(dom){
	var g = dom.getContext('2d');
	var width = dom.getAttribute('width'); 
	var height = dom.getAttribute('height'); 
	var color = 'rgb(68, 68, 68)'; 

	function drawCircle(x, y){
		g.beginPath(); 
		g.arc(x * 20 + 10, y * 20 + 10, 10, 0, 2 * Math.PI); 
		g.fillStyle = color; 
		g.closePath(); 
		g.fill(); 
	}

	function drawChar(i, offsetX){
		if (!offsetX) offsetX = 0; 

		var imgData = digit[i]; 

		imgData.forEach((row, py) => {
			row.forEach((elem, px) => {
				if (elem === 1){	
					drawCircle(
						// em 
						px + offsetX,

						// em 
						py
					); 
				}
			})
		})
	}

	function drawStr(str){
		g.clearRect(0, 0, width, height); 

		var is = str.split(''); 
		is.forEach((i, idx) => {
			drawChar(i, 8 * idx);

		}); 
	}

	function setColor(newColor){
		color = newColor; 
	}

	return {
		g: g,
		drawCircle: drawCircle, 
		setColor: setColor,
		drawChar: drawChar, 
		drawStr: drawStr
	}
}

var colors = [
	"rgb(255,165,0)", 
	"rgb(240,170,0)",
	"rgb(236,174,0)",
	"rgb(254,188,0)",
	"rgb(224,147,16)",
	"rgb(185,102,0)",
	"rgb(255,165,0)",
	"rgb(235,065,20)",
	"rgb(175,167,30)"
]

colors.get = function(){
	return this[Math.floor( Math.random() * this.length )]
}

var domCanvas = document.getElementById('c'); 
var pen = Pen(domCanvas); 


function counter(operation){
	var val = 0; 

	return function next(){
		val ++; 
		operation(val); 
		return val; 
	}
}

// var printer = counter(function(val){
// 	pen.drawStr(val.toString()); 
// }); 

var printer = function(){
	var now = new Date(); 

	var h = now.getHours(); 
	var m = now.getMinutes(); 
	var s = now.getSeconds(); 
	
	var toRender = [h, m, s].map(e => {
		var temp = '00' + e.toString()
		return temp.slice(-2); 
	}).join(':'); 

	pen.setColor(colors.get()); 
	pen.drawStr(toRender); 
} 

setInterval(printer, 1000); 
