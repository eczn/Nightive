// Qscope.js

var scopes = [
	{
		'+': ap => bp => ap + bp, 
		'-': as => bs => as - bs,
		'*': am => bm => {
			// console.log('am, bm', am, bm); 
			return am * bm
		},
		'/': ad => bd => ad / bd,
		'>': a => b => {
			// console.group('>')
			// console.log('a, b:', a, b);
			// console.groupEnd()
			return a > b
		}, 
		'>=': a => b => {
			// console.group('>=')
			// console.log('a, b:', a, b);
			// console.groupEnd()
			return a >= b;
		}, 
		'<=': a => b => {
			// console.group('<=')
			// console.log('a, b:', a, b);
			// console.groupEnd()
			return a <= b;
		}, 
		'<': a => b => {
			// console.group('<')
			// console.log('a, b:', a, b);
			// console.groupEnd()
			return a < b;
		}, 
		'==': a => b => a === b, 
		'doubleSum': a => b => a * 2 + b * 2,
		'++': d => d + 1,
		'--': d => d - 1, 
		'if': condition => trueTodo => falseTodo => {

			// console.group('if')
			// console.log('c', condition);
			// console.log('true  => ', trueTodo); 
			// console.log('false => ', falseTodo)
			// console.groupEnd()

			if (condition) {
				return trueTodo; 
			} else {
				return falseTodo; 
			}
		}
	}
]; 

var find = key => {
	let val; 

	if (typeof key === 'number') return key; 

	if (typeof key === 'object') return key; 

	for (let i = scopes.length - 1; i >= 0; i--){
		let scope = scopes[i]; 

		if (typeof scope[key] !== 'undefined'){
			val = scope[key]; 
			break; 
		}
	}

	if (typeof val !== 'undefined') {
		// console.log('key, val', key, val); 
		return val; 
	}
	else throw new Error(`${key} is not defined` ); 
}

var add = (key, val) => {
	let top = scopes.pop(); 
	top[key] = val; 
	scopes.push(top); 
}

var push = newScope => {

	// console.group('入栈')
	// console.log('创建作用域'); 
	// console.log(JSON.stringify(newScope)); 
	// console.groupEnd()

	return scopes.push(newScope);
}; 

var pop = () => {

	var d = scopes.pop()

	// console.group('出栈'); 
	// console.log('销毁作用域'); 
	// print(d)
	// console.groupEnd(); 
	return d; 
}; 

var print = obj => {
	var d = JSON.parse(
		JSON.stringify(obj)
	); 

	console.log(d); 
}

// var getTop = () => {
// 	return scopes.slice(-1)[0];
// }
