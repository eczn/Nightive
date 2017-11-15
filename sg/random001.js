var randomRamda = [
	{ base:   150, offset:  100 }, 
	{ base:  1000, offset: 1500 },
	{ base: 10000, offset: 8000 }
].map(val => {
	return () => Math.ceil(Math.random() * val.offset) + val.base
}); 

var scoreMap = s => Math.floor(s / 4) - 1; 

