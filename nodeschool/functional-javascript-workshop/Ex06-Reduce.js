// Ex06-Reduce.js

function countWords(inputWords){
	var result = {}; 
	inputWords.reduce(function(prev, curr, idx, its){
		if (!prev[curr]) { // 不存在 则创建 
			prev[curr] = 1; 
		} else {
			prev[curr]++; 
		}
		return prev; 
	}, result); 

	return result; 
}

module.exports = countWords; 


// Answer: 
function countWords_answer(arr){
	return arr.reduce(function(countMap, word){
		countMap[word] = ++countMap[Word] || 1; 
		return countMap; 
	}, {});
}
