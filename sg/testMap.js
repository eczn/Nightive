 
var data = [
    {
        "id":1,
        "number":"100.000",
        "name": "admin.",
        "level":1,
        "children": [
            {
                "id": 2,
                "number": "100.210",
                "name": "admin.marketing",
                "level": 2
            },
            {
                "id": 3,
                "number": "100.260",
                "name": "admin.operation",
                "level": 2,
                "children": [
                    {
                        "id": 5,
                        "number": "260.261",
                        "name": "operation.content",
                        "level": 3
                    },
                    {
                        "id": 6,
                        "number": "260.262",
                        "name": "operation.promote",
                        "level": 2
                    },
                    {
                        "id": 7,
                        "number": "260.263",
                        "name": "operation.service",
                        "level": 2
                    }
                ]
            },
            {
                "id": 4,
                "number": "100.280",
                "name": "admin.development",
                "level": 2
            }
        ]
    }
]


function headFor(o, cb){
	if (!o) return; 

	o.forEach(child => {
		cb(child); 
		if (child.children) {
			headFor(child.children, cb);	
		}
	});
}


var res = []; 
headFor(data, item => {
	var temp = {}; 
	temp.id = item.id
	temp.number = item.number;
	temp.name = item.name; 
	temp.level = item.level; 
    res.push(temp); 
}); 

res.sort((a, b) => {
	return a.id > b.id; 
})

res.forEach(e => console.log(e)); 
