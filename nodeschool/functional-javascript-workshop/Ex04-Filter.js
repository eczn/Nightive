// Ex04-Filter.js
// 官方英文题目的意思是说 
// messages是一个数组，元素是对象 这个对象里面有个属性 message 
// 要求利用 Array.prototype.filter 来筛选出属性 message 长度小于 50 的元素 并构成新数组返回 (新数组元素是字符串)
// input:  [{ message: '长度很长...省略...一共100'}, { message: 'eczn'}]
// output: [ 'eczn' ]

function getShortMessages(messages){
	return messages.filter(function(elem, idx, its){
		return elem.message.length < 50; 
	}).map(function(elem, idx, its){
		return elem.message; 
	}); 
}

module.exports = getShortMessages; 
