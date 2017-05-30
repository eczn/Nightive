var keysTo = [
	'o', 'a', 'b', 'c', 'd', 'e', 'f', 'g'
]

var parseToArr = str => str.split('\t').join(' ').split('').reduce((acc, cur) => {
	if (cur === '(' || cur === '['){
		acc.push(' '); 
		acc.push(cur); 
		acc.push(' '); 
		return acc;
	} else if (cur === ')' || cur === ']') {
		acc.push(' '); 
		acc.push(cur); 
		acc.push(' '); 
	} else {
		acc.push(cur); 
	}

	return acc; 
}, []).join('').split(' ').map(ch => {
	if (!Number.isNaN(parseInt(ch))){
		return parseInt(ch); 
	} else {
		return ch; 
	}
}).filter(e => e !== '' && e!== '\n'); 

// 语法分析 求 AST
// (* (+ 1 1) (+ 2 2))
var _parse = arr => {
	var deep = 0; 
	var temp = []; 
	var tokens = []; 

	if (arr.length === 1) return arr[0]; 

	arr.forEach((ch, idx, its) => {
		if (ch === '(') {
			deep ++ ; 

			if (deep === 2){
				temp.push(idx); 
			}
		} else if (ch === ')') {
			deep -- ; 

			if (deep === 1){
				let pre = temp.pop(); 
				tokens.push({
					from: pre, 
					to: idx
				}); 
			}
		} else {
			// 除了括号 其他都是 标识符 或者 立即数 
			if (deep === 1){
				tokens.push({
					from: idx, 
					to: idx
				}); 
			}
		}
	}); 

	return tokens.reduce((acc, cur, idx) => {
		let block = arr.slice(cur.from, cur.to + 1);

		acc[keysTo[idx]] = _parse(block); 

		return acc; 
	}, Object.create(null)); 
}


var treeToArr = tree => keysTo.map(key => {
	return tree[key]
}).filter(e => e !== undefined);

// 从语法树得到值 
// 遍历 
var calc = tree => {
	let oType = typeof tree.o;

	if (oType === 'object'){ // 说明该节点不是表达式 而是声明 
		scopeCalc(tree.o); 
		
		if (tree.a) {
			let returnVal = calc(tree.a);
			// pop(); 
			return returnVal; 
		}
	} else if (oType === 'string') {
		push(Object.create(null));
		// 主要是实现多参函数而写的 
		// 简单的四则运算都是两个参数 都是函数 被定义在全局上 
		// 但是实际情况中 o 的参数列表可能不只两个 
		// 因此要把 tokens 第二个元素之后的所有值求出来 再应用到 o 上 

		let o = find(tree.o); 
	
		// 这段执行完后得到结果是 vals 
		// vals 的结构类似这样： [函数, 值, 值, 值 .... ] 长度取决于 keysTo.length 
		// 注意有 .slice(1) 

		// console.group('tree');
		// print(tree)
		// console.groupEnd()

		var vals = keysTo.slice(1).filter(key => tree[key] !== undefined).map((cur, idx, its) => {
			// 取出键名 比如 tree.a tree.b 等等 

			let t = tree[cur]
				// is_ns: t 是数字或者变量吗？ 
			  , is_ns = typeof t === 'number' || typeof t === 'string'
			    // its 是这样的： ['a', 'b', 'c', 'd' .... ] 
			    // 这里从tree取出 tree.a tree.b 这些 
			  , keyInTree = tree[its[idx]]

			if (is_ns){
				// console.group('栈');
				// console.log('ERROR', keyInTree);
				// scopes.forEach(print)
				// console.groupEnd()
				return find(keyInTree); 
			} else {
				let returnVal = calc(keyInTree); 
				// pop(); 
				return returnVal; 
			}
		}); 

		if (o.o === 'lambda'){
			// lambda 的处理 
			let lambda = treeToArr(o);
			let list = treeToArr(lambda[1]); 

			// 创建一个作用域 
			let newScope = list.reduce((acc, name, idx) => {

				acc[name] = vals[idx]; 
				return acc; 
			}, Object.create(null)); 

			console.log('lambda', lambda); 
			console.log('list', list);
			console.log('newScope:', newScope);

			
			// 把新作用域压入栈 
			push(newScope); 

			var returnVal = calc(lambda[2]);

			// pop(); 

			// console.log('newScope:', newScope)
			// console.log('returnVal:', returnVal);

			return returnVal;
		} else {
			// 从这里可以看出一个一个参数的传递 
			// 换言之 Q-lang 只接受柯里化的函数 


			let returnVal = vals.reduce((acc, val) => {
				return acc(val); 
			}, o); 

			console.group(tree);
			console.log('CALC', [returnVal, '<<<<', tree.o].concat(vals));
			scopes.forEach(print);
			console.groupEnd('One')

			// pop();
			return returnVal;
		}
	}
}

var scopeCalc = todo => {
	var p = keysTo.slice(1).reduce((acc, cur) => {
		if (todo[cur]) acc.push(todo[cur]); 
		
		return acc; 
	}, []).filter(e => e !== '[' && e !== ']'); 

	if (todo.o === 'let') {
		p.forEach((item, idx, its) => {
			if (idx % 2 === 0){ // 偶数
				let key = item
				  , val = its[idx + 1]; 
				
				add(key, val); 
			}
		})
	}
} 


// Q 
var parse = str => _parse(parseToArr(str)); 
var Q = str => calc(parse(str)); 
