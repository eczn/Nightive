// Ex15-AsyncLoops.js


function loadUsers_old(userIds, load, done) {
	var users = []; 

	for (let i = 0; i< userIds.length; i++) {
		(function(i){
			setTimeout(()=>{
				users.push(load(userIds[i])); 
			}, 0);
		})(i); 
	}

	return users; 
}

function loadUsers(userIds, load, done) {
	var users = []; 
	var count = 0; 
	userIds.forEach(function(id, idx, its){
		load(id, function(user){
			users[idx] = user; 
			count ++; 
			if (count == its.length){
				return done(users); 
			}
		});
	}); 
}

module.exports = loadUsers; 
