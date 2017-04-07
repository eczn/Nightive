// 调用num次作为参数传递进来的 "高阶函数 (Higher-Order-Function)"
function repeat(operation, num){
	for (let i=0;i<num;i++){
		operation(); 
	}
}

module.exports = repeat; 
