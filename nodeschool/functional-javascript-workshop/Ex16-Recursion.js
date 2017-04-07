// Ex16-Recursion.js

function getDependencies(tree, res){
	res = res || []; 

	if (tree){
		for (prop in tree.dependencies){
			let temp = prop+'@'+tree.dependencies[prop].version; 

			if (res.indexOf(temp) === -1){
				res.push(temp); 
			}
			getDependencies(tree.dependencies[prop], res);
		}
	} 

	return res.sort();
}

function getDependencies_new(tree, res){
	res = res || []; 

	var dependencies = tree && tree.dependencies || []; 

	// 
	Object.keys(dependencies).forEach(function(subDep){
		var temp = subDep+'@'+dependencies[subDep].version;
		if (res.indexOf(temp) === -1) res.push(temp); 
		getDependencies(dependencies[subDep], res);
	});

	return res.sort();
}

module.exports = getDependencies; 
