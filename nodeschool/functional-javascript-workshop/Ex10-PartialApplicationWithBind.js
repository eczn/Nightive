// Ex10-PartialApplicationWithBind.js

module.exports = function(namespace){
	return console.log.bind(console, namespace); 
}
