// todo.js

// L(function(){
	// DOM Elements
	var $todo = L('#commit-content')
	  , $time = L('#commit-time')
	  , $date = L('#commit-date');

	// an simple db based on localStorage 
	// arguments[1] means that a function will be invoked when before invoking LS.prototype.add 
	var db = new LS('todos', render); 

	// key-bind function 
	var key2func = []; 
	key2func[13] = commit; 

	// event handle
	$todo.keyHandle(e => key2func[e.keyCode] ? key2func[e.keyCode]() : false); 


	// commit when add a new todo 
	function commit(){
		var arr = [
			$todo.attr('value'),
			$date.attr('value'),
			$time.attr('value')
		]; 

		var date = new Date(arr[1] + ' ' + arr[2]);
		
		if (+date && arr[0]){
			// construct a todo to storage()
			storage({
				deadline: date, 
				todo: arr[0]
			}); 
		} else {
			alert('please check your input');
		}
	}

	// render 
	function render(newElement){
		
		// just equal to db.get(); 
		var arr = this.get(); 

		var target = L('#todos'); 
		target.empty(); 
		arr.forEach(e => {
			L('#todos').append(`
				<span>${e.todo}</span>
			`); 
		});
	}

	// storage 
	function storage(data){
		db.add(data); 
	}
// }); 