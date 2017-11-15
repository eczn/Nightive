var IO = require('./var/io'); 
var fs = require('fs'); 
var _  = require('ramda'); 

var fs = require('fs');

var map = function(f){
	return IO.of(f(this.__value))
}


//  readFile :: String -> IO String
var readFile = function(filename) {
  return new IO(function() {
    return fs.readFileSync(filename, 'utf-8');
  });
};

//  print :: String -> IO String
var print = function(x) {
  return new IO(function() {
    console.log(x);
    return x;
  });
}

// Example
// ===========================
//  cat :: IO (IO String)
var cat = _.pipe(
	_.map(print),
	readFile
);

console.log(
	cat("./miao.txt")
)


