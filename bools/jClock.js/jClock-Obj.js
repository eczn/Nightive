var r = 400
	// DOM 
  , domCanvas = document.getElementById('clock')
  	// g 
  , g = domCanvas.getContext('2d')
  	// 配置 
  , pointers = [
		{
			// 分针 
			length: 166, 
			r: r, 
			color: 'rgba(255, 255, 255, .7)', 
			max: 60, 
			lineWidth: 2, 
			getTime: () => {
				var now = new Date(); 
				return now.getMinutes() + (now.getSeconds() / 60);
			}
		},
		{
			// 时针 
			length: 115, 
			r: r, 
			lineWidth: 5, 
			color: 'rgba(255, 255, 255, .7)', 
			max: 12, 
			getTime: () => {
				var now = new Date(); 
				return  now.getHours() + (now.getMinutes() / 60); 
			}
		},
		{	
			// 秒针 
			length: 200, 
			r: r, 
			color: 'rgb(235, 110, 110)', 
			lineWidth: 2, 
			max: 60, 
			getTime: () => {
				var now = new Date(); 
				return now.getSeconds(); 
			}
		}
	].map(
		Pointer.create
	)

	// 绘制 
  , makeItRendered = pointer => pointer.render(g)

	// 定时执行器 
  , clocking = () => {
		g.clearRect(0, 0, 400, 400)
		pointers.forEach(makeItRendered); 
	}

	// timer 
  , timer = setInterval(clocking, 1000)

  	// 停止 
  , stop = () => {
		clearInterval(timer); 
	}


///////////////////////// 
///   WhenOnloading   /// 
window.onload = clocking;
/////////////////////////