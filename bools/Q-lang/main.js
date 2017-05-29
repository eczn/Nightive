// main.js
// var r = Q('(+ 1 (* 2 3))'); 
// console.log(r); 
// JSON.stringify(
// 	parse(`

// (
//   (let [f (lambda (x y) (* x y))]) 
//     (+ 1 1))


// `)
// ); 

var s = {
	"o":{
		"o":"let",
		"a":"[",
		"b":"f",
		"c":{
			"o":"lambda",
			"a":{
				"o":"x",
				"a":"y"
			},
			"b":{
				"o":"*",
				"a":"x",
				"b":"y"
			}
		},
		"d":"]"
	},
	"a":{
		"o":
		"+",
		"a":1,
		"b":1
	}
}