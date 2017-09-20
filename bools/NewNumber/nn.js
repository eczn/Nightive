// nn.js 
function NewNumber(str){
	let type = typeof str; 

	if (type === 'string'){
		// 是字符串 
		let arr = str.split('')
		  , dotPos = arr.indexOf('.'); 

		if (dotPos !== -1){
			// 小数 在其后面填 0 
			let zeroFix = arr.concat(['0', '0', '0']); 

			// 切割 舍弃小数点两位后面的小数 并放大 100 倍 
			let bigArr = zeroFix.slice(0, dotPos + 3); 
			bigArr.splice(dotPos, 1); 

			// 放大一百倍之后是整数 
			let bigStr = bigArr.join(''); 
			this.bigNumber = parseInt(bigStr); 
		} else {
			// 整数 
			this.bigNumber = parseInt(str) * 100; 
		}
		
		// this.__primitive = str; 
	} else if (type === 'number') {
		// 是普通的数字，转换成字符串处理 
		return new NewNumber(str.toString()); 
	} else if (type === 'object') {
		// 对象 
		if (Object.getPrototypeOf(str) === p){
			// 如果是 NN 对象，那么取出值重新构造
			return new NewNumber(str.valueOf()); 
		} else {
			// 不合法按 0 处理 
			return new NewNumber(0); 	
		}
	} else {
		// 不合法按 0 处理 
		return new NewNumber(0); 
	}
}

// 原型 
let p = {}; 
NewNumber.prototype = p; 

// new 的语法糖
p.create = function(str){
	return new NewNumber(str); 
}

// 覆写 valueOf  
p.valueOf = p.val = function(){
	return this.bigNumber / 100; 
}

// 覆写 toString
p.toString = function(){
	return this.valueOf().toString(); 
}

// 四则运算  
let calcTableLower = {
	add: (a, b) => a + b, 
	sub: (a, b) => a - b,
	mul: (a, b) => a * b, 
	div: (a, b) => a / b
}

Object.keys(calcTableLower).forEach(key => {
	p[key] = function(b){
		// 将 b 转换成 nn 对象 
		b = p.create(b); 

		// 求值 
		this.bigNumber = p.create(calcTableLower[key](
			this.valueOf(),
			b.valueOf()
		)).bigNumber; 

		// 链式调用 
		return this; 
	}
});

module.exports = NewNumber; 
