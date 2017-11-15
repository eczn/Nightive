// test.js
var _ = require('ramda'); 
var accounting = require('accounting'); 

var bug = x => {
	console.log(x); 
	return x; 
}



var CARS = [
    {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
    {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
    {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
    {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
    {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
    {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false}
];

var add = (x, y) => x + y; 
var average = xs => _.reduce(add, 0, xs) / xs.length; 

var allDoller = _.pipe(
	// Get dollar_value As New Array 
	_.map(
		_.prop('dollar_value')
	),
	// Get Average 
	average
)





var sanitizeNames = _.map(
	_.pipe(
		_.prop('name'),
		_.toLower,
		_.split(' '),
		_.join('_')
	)
)

var availablePrices = _.pipe(
	_.filter(
		_.prop('in_stock')
	),
	_.map(
		_.pipe(
			_.prop('dollar_value'),
			// bug, 
			// x => x + 1
			accounting.formatMoney
		)
	),
	_.join(' | ')
); 


var fastestCarIn = _.pipe(
	_.sortBy(
		_.prop('horsepower')
	), 
	_.last,
	_.prop('name')
)

console.log(
	
)


