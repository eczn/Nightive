// todo.js

// L(function(){
	// DOM Elements
	// var $todo = L('#commit-content')
	//   , $time = L('#commit-time')
	//   , $date = L('#commit-date');
	var $commit = L('.todo-commit > input, .todo-commit > textarea');

	// an simple db based on localStorage 
	// arguments[1] means that a function will be invoked when before invoking LS.prototype.add 
	var db = new LS('todos', render); 

	// key-bind function 
	var key2func = []; 
	key2func[13] = commit; 

	// event handle
	$commit.keyHandle(e => key2func[e.keyCode] ? key2func[e.keyCode]() : false); 

	// commit when add a new todo 
	function commit(){
		// var arr = [
		// 	$todo.attr('value'),
		// 	$date.attr('value'),
		// 	$time.attr('value')
		// ]; 

		var commit = $commit.map(e => {
			return e.value; 
		}); 

		var date = new Date(commit[0] + ' ' + commit[1]);
		
		if (+date && commit[2]){
			// construct a todo to storage()
			storage(commit.reduce((acc, curr, idx) => {
				var name = L($commit[idx]).attr('name'); 
				acc[name] = curr; 
				return acc; 
			}, {
				deadline: date, 
			})); 
		} else {
			alert('please check your input');
		}
	}

	// render 
	function render(newElement){
		
		// just equal to db.get(); 
		var todos = this.get(); 

		var target = L('#todos'); 
		target.empty(); 
		todos.forEach(todo => {
			var date = new Date(); 
			L('#todos').append(`
				<div class="tool-block todo">
					<p class="title">${todo.title}</p>
					<p class="datetime">${todo.date + ' ' + todo.time}</p>
					<p class="content">${todo.content}</p>
					<p class="create-at">${todo.__createAt}</p>
				</div>
			`); 
		});

		L('#todos').prepend(`
			<div style="text-align: center;" class="tool-block">
				<span class="commit-btn"></span>
			</div>
		`); 
	}

	// storage 
	function storage(data){
		db.add(data); 
	}
// }); 