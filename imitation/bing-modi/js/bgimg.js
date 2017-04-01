// bgimg.js

var List = (function($){
	var $next = $('#goNext'); 
	var $pre = $('#goPre'); 
	var base = 'img/'; 
	var TIME = 500; 
	var imgList = [
		'ジャン・ポポ - 真紅 (36980944@455626)[ローゼンメイデン 真紅].jpg', 
		'001.jpg', 
		'bkg_1478166948.jpg',
		'18.png', 
		'ジャン・ポポ - 崖の町 (46501221@455626)[オリジナル ファンタジー 背景 風景 獣耳 花びら 白ワンピ ワンピース服].jpg', 
		'51921620_p0.png'
	]; 

	$content = $('.content'); 
	$bgimg = $('.bgimg'); 
	$newContainer = $('.news-container'); 
	var toDisplay = function(picSrc){
		// $('.bgimg').remove(); 

		// var html = '<div class="bgimg"></div>'; 
		// $content.append(html); 
		$bgimg.css('opacity', 0); 
		$newContainer.css('opacity', 0); 

		setTimeout(function(){
			$bgimg.css('background-image', 'url("'+ base+picSrc +'")'); 
			setTimeout(function(){
				$bgimg.css('opacity', 1); 
				$newContainer.css('opacity', 1); 
			}, 100); // time to load image 
		}, TIME); 
		// console.log(picSrc); 
	}

	$next.click(function(){
		var head = imgList.pop(); 
		imgList.unshift(head); 

		// console.log(head); 		
		toDisplay(imgList[0]); 
	}); 

	$pre.click(function(){
		var head = imgList.shift(); 
		imgList.push(head); 
		toDisplay(imgList[0]); 
	}); 

	toDisplay(imgList[0]); 

	var adjustBG = function(){
		// console.log('!'); 
		var WH_Rate = window.innerWidth / window.innerHeight; 
		if (WH_Rate > 1.4){
			$('.bgimg').css('background-size', '100% auto'); 
			
		} else {
			$('.bgimg').css('background-size', 'auto 100%'); 
		}
	}
	adjustBG(); 

	$(window).resize(adjustBG);

	// background-image: url("../img/ジャン・ポポ - 真紅 (36980944@455626)[ローゼンメイデン 真紅].jpg");
})($); 
