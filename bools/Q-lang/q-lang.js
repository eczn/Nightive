var rules = {
	'+': ap => bp => ap + bp, 
	'-': as => bs => as - bs,
	'*': am => bm => am * bm,
	'/': ad => bd => ad / bd
}

var parseToArr = str => str.trim().split(' ').filter(e => e !== '').map((e, idx, its) => {
	let temp = parseInt(e); 
	if (Number.isNaN(+e)){
		if (Number.isNaN(temp)){
			return e.split(''); 
		} else {
			// 4))
			return [temp].concat(e.replace(temp.toString(), '').split(''))
		}
	} else {
		return temp; 
	}
}).reduce((acc, cur) => {
	if (Array.isArray(cur)){
		return acc.concat(cur); 
	} else {
		acc.push(cur); 
		return acc; 
	}
}, []); 

// 语法分析 求 AST
// (* (+ 1 1) (+ 2 2))
var parse = str => _parse(parseToArr(str)); 

var _parse = arr => {
    var tree = Object.create(null)
      , LR = []
      , posStart = []
      , posEnd = []
      , deep = 0;

    arr.forEach((ch, idx) => {
        if (ch === '('){
            deep ++; 
            if (deep === 2){
                posStart.push(idx); 
            }
        } else if (ch === ')'){
            deep--; 
            if (deep === 1){
                posEnd.push(idx); 
            }
        } else if (rules[ch]){
            if (deep === 1){
                tree.o = ch;    
            }
        } else {
            // 普通的数字 
            if (deep === 1) LR.push({
                val: ch,
                pos: idx
            }); 
        }
    }); 

    if (LR.length === 0){
        // 左右均为表达式
        tree.a = _parse(arr.slice(posStart[0], posEnd[0] + 1));

        tree.b = _parse(arr.slice(posStart[1], posEnd[1] + 1));
    } else if (LR.length === 1){
        // 左边是表达式、右边是数字
        // 或者
        // 左边是数字、右边是表达式
        let temp = LR.pop(); 
        let l = posStart[0]
          , r = posEnd[0];

        if (temp.pos < l){
            // temp 在左 
            tree.a = temp.val; 
            tree.b = _parse(arr.slice(posStart[0], posEnd[0] + 1));
        } else if (temp.pos > r) {
            // temp 在右 
            tree.a = _parse(arr.slice(posStart[0], posEnd[0] + 1));
            tree.b = temp.val; 
        }
    } else if (LR.length === 2){
        // 左右均为数字 
        tree.a = LR[0].val; 
        tree.b = LR[1].val; 
    } 

    // console.log(arr); 

    return tree; 
}

// 从语法树得到值 
var calc = tree => {
	let o = rules[tree.o]
	  , a = tree.a
	  , b = tree.b
	  , a_is_num = typeof a === 'number'
	  , b_is_num = typeof b === 'number';


	// if (a_is_num && b_is_num){
	// 	// a b 都是数字 说明已到达最深处 
	// 	return o(a)(b); 
	// } else if (!a_is_num && b_is_num) {
	// 	// a 是表达式, b 是数字 继续对 a 求值 
	// 	return o(calc(a))(b); 
	// } else if (a_is_num && !b_is_num) {
	// 	// a 是数字, b 是表达式 继续对 b 求值  
	// 	return o(a)(calc(b)); 
	// } else if (!a_is_num && !b_is_num){
	// 	// a b 都是表达式 都要继续求值 
	// 	return o(calc(a))(calc(b)); 
	// }

	return o(
		a_is_num ? a : calc(a)
	)(
		b_is_num ? b : calc(b)
	)
}

var Q = str => calc(parse(str)); 
