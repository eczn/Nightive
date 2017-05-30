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

// var r = Q(`
// (
//     (let [temp 5])
//     (
// 		(let [
// 			f (lambda (x) (* x temp))
// 		])
// 		(+ 1 (f (++ temp)))
//     )
// )
// `);


var QInfo = console.log.bind(console, '>>>>'); 

// QInfo('Q-lang:')
// QInfo(r); 


// QInfo(
// Q(`

// (
// 	(let [
// 		n (lambda (x) ( if (> x 0) (* x (n (-- x))) 1 ))
// 	])
// 	(n 3)
// )

// `)
// )

QInfo(
Q(`

(
	(let [
		dd (lambda (x) (if (<= x 0) -1 1))
	])
	(dd -5)
)

`)
)

// (* x (n (-- x)))