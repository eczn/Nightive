// index.js
var tpl = require('./tpl'); 
var path = require('path');
var fs = require('fs'); 


var testRender = tpl.fromFile(path.join(__dirname, './test2.html'), {
	compress: true
}); 


var res = testRender({
	papapa: true
}); 



fs.writeFile('./if-else.html', res, err => {
	if (err) throw err; 
	else console.log('Save Success'); 
}); 
