// new-modi.js
var Person = require('./Person')
  , INS = require('./INS'); 

// 普通的 new 
var eczn = new Person('eczn', 20); 
// 模拟的 new 
var xiao = INS(Person, 'xiao', 18);  

// 调用原型方法 
eczn.sayName(); 
xiao.sayName(); 
xiao.sayHelloTo(eczn); 
