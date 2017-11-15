// Q.js
let EXP = /\(.*\)/; 

function bracketParse(str){
	let arr = str.replace(/\[/g, ' [ ')
	   .replace(/\]/g, ' ] ')
	   .replace(/\{/g, ' { ')
	   .replace(/\}/g, ' } ')
	   .replace(/\(/g, ' ( ')
	   .replace(/\)/g, ' ) ')
	   .split(' ')
	   .filter(e => e !== ""); 


	let tree = reduce(arr)
	// console.log(arr); 
	return arr; 
}

function outterBracketsPos(arr){
	let deep = 0
	  , start = []
	  , end = []

	for (let i = 0; i < arr.length; i++){
		let c = arr[i]; 

		if (c === '('){
			deep ++ ; 
			if (deep === 1){
				start.push(i); 
			} 
		} else if (c === ')'){
			deep -- ; 
			if (deep === 0){
				end.push(i); 
			}
		}
	}

	return start.map((l, idx) => {
		let r = end[idx]; 

		return {
			l, 
			r
		}
	})
}

function outterArr(arr){
	let inner = goInner(arr); 

	let res = outterBracketsPos(inner); 

	return res.map(pos => {
		let { l, r } = pos; 

		return inner.slice(l, r + 1); 
	})
}

function goInner(arr){
	return arr.slice(1, -1); 
}

function isIn(l, x, r){
	return l <= x && l <= r; 
}

function isInPoss(x, poss){
	return poss.some(pos => {
		let { l, r } = pos; 

		return isIn(l, x, r); 
	})
}

function reduce(arr){
	let inner = goInner(arr); 
	let posi = outterBracketsPos(inner); 
	let res = []; 

	inner.forEach((c, idx) => {
		if (isInPoss(idx, posi)){
			
		}
	})

	console.log(inner); 
	console.log(posi)
}

let c = `(+ 2 3 (+ 4 5) (+ 'hello 'world))`; 

console.log(c)
let d = bracketParse(c)


// let p = outterArr(d); 
// console.log(d)
// console.log(p)
