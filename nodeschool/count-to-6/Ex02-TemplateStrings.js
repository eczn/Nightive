// Ex02-TemplateStrings.js
let name = process.argv[2]; 
let str = 
`Hello, ${name}!
Your name lowercased is "${name.toLowerCase()}".`; 

console.log(str); 
