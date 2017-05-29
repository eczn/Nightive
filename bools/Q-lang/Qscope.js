// Qscope.js

var scopes = [
	{
		'+': ap => bp => ap + bp, 
		'-': as => bs => as - bs,
		'*': am => bm => am * bm,
		'/': ad => bd => ad / bd,
		'doubleSum': a => b => a * 2 + b * 2,
		'++': d => d + 1,
		'--': d => d - 1
	}
]; 

var find = key => {
	let val; 

	if (typeof key === 'number') return key; 

	for (let i = scopes.length - 1; i >= 0; i--){
		let scope = scopes[i]; 

		if (typeof scope[key] !== 'undefined'){
			val = scope[key]; 
			break; 
		}
	}

	if (typeof val !== 'undefined') return val 
	else throw new Error(`${key} is not defined` ); 
}

var add = (key, val) => {
	let top = scopes.pop(); 
	top[key] = val; 
	scopes.push(top); 
}

var push = newScope => scopes.push(newScope); 

var pop = () => scopes.pop(); 
