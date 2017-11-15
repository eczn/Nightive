function fn(a, b, c){
    console.log(a, b, c); 
}

function adder(arr, fn, _this){
    _this = _this || window; 
    var toAdd = arr.slice(0, fn.length); 
    
    return function(){
        var argu = Array.prototype.slice.call(arguments); 
        
        fn.apply(_this, toAdd.map((item, idx) => {
            return argu[idx] + item; 
        })); 
    }
}

// var fnOffset = adder([0, 2, 0], fn); 

// fnOffset(0, 0, 0); 
// fnOffset(2, 1, 0); 

module.exports = adder; 
