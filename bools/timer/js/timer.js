class Remain {
	constructor(h, m, s) {
		this.h = h || '99';
		this.m = m || '99';
		this.s = s || '99';
	}

	parse(spec){
		return this.h + spec + this.m + spec + this.s; 
	}

	toArray(){
		return [
			this.h,
			this.m,
			this.s
		]
	}

	diff(newRemain){
		var now = this.parse('').split(''); 
		var diff = newRemain.parse('').split(''); 

		return now.map((str, idx) => {
			return !!(parseInt(str) - parseInt(diff[idx]));
		}); 
	}
}

class Ball {
	constructor(x, y, vx, vy, g, r, k, color) {
		this.x = x || 0;
		this.y = y || 0;
		this.r = r || 8; 
		this.vx = vx || 2;
		this.vy = vy || 2;
		this.g = g; 

		this.k = k || 0.5; 
		this.color = color || "rgb(255,165,0)";
		this.over = false; 

		this.vec = 1; 
	}

	go(maxWidth, maxHeight){
		if (this.y >= maxHeight || this.y <= 0) {
			this.landing();
			
			if ((this.x >= maxWidth + this.r) || (this.x <= -this.r)){
				this.over = true; 
			}
		}; 

		if (!this.over){
			this._go(); 

			if (this.r > 0){
				let t = Math.abs(this.vx) + Math.abs(this.vy)
				this.r -= t / 200;
				this.r = Math.abs(this.r);
			} else {
				this.over = true; 
			}
		}
	}

	_go(){
		this.x += this.vx; 
		this.y += this.vy; 
		this.vy += this.g; 

		let temp = Math.random() - 0.5; 

		// this.vy += temp; 
		// this.vx += temp; 
		this.change_g(); 

		// this.g += temp;
	}


	change_g(){
		if (this.r < 3){
			this.vx += this.vx/10 * 0.5
			this.vy += this.vy/10 * 0.5
		}
	}

	landing(){
		// _k = _k || this.k; 
		this.vy = this.k * -this.vy; 
		this._go(); 
	}

	draw(g){
		let temp = g.fillStyle; 
		g.beginPath()
		g.fillStyle = this.color; 
		g.cir(this.x, this.y, this.r); 
		g.closePath(); 
		g.fill(); 

		g.fillStyle = temp; 
	}
}



var timer = (function(digit, L){
	var config; 
	// config = {
	// 	el: '#time',
	// 	end: new Date(2017, 5, 15, 12, 12, 12)
	// }
	var PI = Math.PI; 
	var canvas
	var g; 
	var endTimer, ballsTimer, ballsClearTimer; 
	var printers; 
	var diffPosition = []; 
	var balls = [];

	var remain = new Remain();

	function init(_config){
		config = _config; 

		config.clockWidth = config.r * 2 * 58; 
		config.marginLeft = (window.innerWidth - config.clockWidth) / 2; 

		canvas = L(config.el)[0]; 
		canvas.width = config.width;
		canvas.height = config.height;
		g = canvas.getContext('2d');

		g.cir = function(x, y, r, color){
			return this.arc(x, y, r, 0, 2 * PI, true); 
		}

		printers = digit.map((num, idx) => print(idx)); 

		endTimer = setInterval(clock, 1000); 
		clock(); 
		ballsTimer = requestAnimationFrame(frame); 

		// console.log(config); 
		ballsClearTimer = setInterval(function(){
			console.log(balls.length)
			balls = balls.filter(ball => !ball.over); 
		}, 1000); 
	}

	var opacity = 1; 
	var vec = -1; 
	function frame(){
		// g.clearRect(0, 0, config.width, config.height);
		let tempFS = g.fillStyle; 
		g.fillStyle = 'rgba(255,255,255,0.5)'
		g.rect(0, 0, config.width, config.height);
		g.fill()
		g.fillStyle = tempFS; 


		balls.forEach(ball => {
			ball.draw(g); 
			ball.go(config.width, config.height); 
		});


		var x = config.marginLeft
		  , y = config.marginTop
		  , temp = config.wordLength * 2 * config.r
		  , draw = (inner_x, inner_y, color) => {
			
			g.fillStyle = color;
			g.beginPath(); 
			g.cir(inner_x, inner_y, config.r); 
			g.closePath(); 
			g.fill(); 
		}

		// console.log(remain.toArray())


		opacity += vec * 0.05; 
		

		printers[12](
			config.marginLeft + 42 * config.r,
			config.marginTop + 22 * config.r, 
			(x, y, color) => {
				// rgb(0,0,0); 
			  	// => 
				// rgba(0,0,0,0);

				g.fillStyle = `rgba(244, 100, 54, ${opacity})`; 
				g.beginPath();
				g.cir(x, y, config.r); 
				g.fill(); 
			}
		); 

		remain.toArray().forEach((val, idx) => {

			val.split('').forEach((e, i) => {

				printers[e](x, y, draw); 
				x += temp; 				
			});

			if (idx !== 2) { 
				printers[10](x, y, draw);
				x += temp / 2 + config.r * 2;
			} 
		}); 
		

		requestAnimationFrame(frame); 
	}

	function addBalls(todo, x, y){
		todo(x, config.marginTop, (xi, yi) => {
			// (x, y, vx, vy, g, r, k, color)
			// var ball = new Ball(
			// 	xi,  // x
			// 	yi,  // y
			// 	3 * (Math.random() > 0.5 ? -1 : 1),   // vx
			// 	-5 + 5 * Math.random(),   // vy
			// 	1,   // g
			// 	config.r,   // r 
			// 	// k
			// 	0.6 + Math.random() / 4
			// ); 
			var ball = new Ball(
				xi,  // x
				yi,  // y
				(Math.random() - 0.5) > 0 ? (20 * Math.random() + 5) : (-20 * Math.random() - 5),   // vx
				20 * (Math.random() - 0.5),   // vy
				0.1,   // g
				config.r + Math.random(),   // r 
				// k
				0.6 + Math.random() / 4,
				colors.get()
			); 
			balls.push(ball); 
		}); 
	}

	function render(){
		// colors 
		g.fillStyle = "rgb(255,165,0)";

		var x = config.marginLeft
		  , y = config.marginTop
		  , temp = config.wordLength * 2 * config.r
		  , draw = (inner_x, inner_y, color) => {
		  	g.fillStyle = color; 
			g.beginPath(); 
			g.cir(inner_x, inner_y, config.r); 
			g.closePath(); 
			g.fill(); 
		}

		remain.toArray().forEach((val, idx) => {
			val.split('').forEach((e, i) => {
				// printers[e](x, 0, draw); 
				// console.log(x)
				
				if (diffPosition[idx * 2 + i]) {
					addBalls(printers[e], x, y); 
				}

				x += temp; 
			});

			if (idx !== 2) { 
				// printers[10](x, y, draw);
				x += temp / 2 + config.r * 2;
			} 
		}); 
	}

	function print(num){
		return function(x, y, cb){
			x += config.r;  y += config.r; 
			var d = digit[num] || digit[11]; 
			var initX = x; 
			var D = 2 * config.r; 

			d.forEach((line, idx) => {
				line.forEach(e => {
					if (e.is) cb(x, y, e.color); 

					x += D;
				});
				// console.log(x, y); 
				x = initX; 
				y += D; 
			}); 
		}
	}

	var remainDiff; 
	function clock(){
		var now = new Date() 
		  , end = config.end 
		  , midd = end - now
		  , temp = midd / 3600000
		  , hours = parseInt(temp)
		  , mins = parseInt((temp - hours)*60)
		  , secs = parseInt(((temp - hours)*60 - mins) * 60)


		var tempRemain = new Remain(
			('00' + hours).slice(-2),
			('00' + mins).slice(-2),
			('00' + secs).slice(-2)
		);

		diffPosition = remain.diff(tempRemain);
		// remain.h = ('00' + hours).slice(-2); 
		// remain.m = ('00' + mins).slice(-2); 
		// remain.s = ('00' + secs).slice(-2); 

		remain = tempRemain; 

		opacity = 1; 
		// console.log(remain); 
		render(); 
	}


	return {
		init: init
	}
})(digit, L); 