// index.js
var tpl = require('./tpl'); 
var path = require('path');
var fs = require('fs'); 


var testRender = tpl.fromFile(path.join(__dirname, './test.html'), {
	compress: true
}); 


var res = testRender({
	title: '普通的乘法九十九', 
	list: [1, 2, 3, 4, 5, 6, 7, 8, 9], 
	mul: (a, b) => a * b, 
	isBigger: (a, b) => {
		if (a > b){
			return '√'; 
		} else {
			return '×'; 
		}
	}
}); 



fs.writeFile('./99.html', res, err => {
	if (err) throw err; 
	else console.log('Save Success'); 
}); 
