var R = (function(){
    var base = 0
      , inc  = 2;  
      
    // base 是基数， _inc 是增量 
    function config(_base, _inc){
        base = _base; 
        inc = _inc; 
    }
    
    function randGenerator(){
        var pre = base; 
        base += inc; 
        return pre + (Math.random() * inc); 
    }
    
    return {
        rand: randGenerator,
        config: config
    }
})(); 

// R.config(0, 2); 
// R.rand(); // 0 ~ 2 中的随机数
// R.rand(); // 2 ~ 4 中的随机数 

module.exports = R;
