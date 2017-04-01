// memu.js

// console.log()

$('.main-btns > li').click(function(){
	var $childrenUL = $(this).children('ul');


	if ($childrenUL.length != 0) {
		if ($(this).attr('is-show') == '√'){
			$(this).css('height', '50px').attr('is-show', ''); 
		} else {
			var $subLi = $childrenUL.children('li'); 
			var subLenght = $subLi.length; 
			$(this).css('height', ((subLenght+1)*50).toString()+'px').attr('is-show', '√'); 	
		}
		

	} else {

	}
}); 

$('.memu-btn').click(function(){
	if (!$('.memu-container').attr('is-show')){
		$('.memu-container').attr('is-show', '√').css('height', '340px'); 
		setTimeout(function(){
			$('.memu-container').addClass('auto-height'); 
		}, 400); 
	} else {
		$('.memu-container').removeClass('auto-height').attr('is-show', ''); 
		setTimeout(function(){
			$('.memu-container').css('height', '0px'); 
		}, 50)
	}
	
}); 