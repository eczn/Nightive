// Ex13-BlockingEventLoop.js

function repeat(operation, num) {
	if (num <= 0) return; 
	operation(); 

	return setTimeout(function(){
		(($num)=>{
			repeat(operation, $num);
		})(--num); 
	}, 0); 
}

module.exports = repeat; 

// answer 
function repeat_ans(operation, num) {
	if (num <= 0) return; 
	operation(); 

	if (num % 10 === 0){
		setTimeout(function(){
			repeat(operation, --num); 
		}, 0); 
	} else {
		return repeat(operation, --num); 
	}
}
