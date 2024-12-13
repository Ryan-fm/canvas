var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight


var c = canvas.getContext('2d')

// //line 
// c.beginPath()
// c.moveTo(50,300)
// c.lineTo(300,300)
// c.lineTo(500,200)
// c.strokeStyle = '#fa3ac3' 
// c.stroke()

// // arc /circle

// c.beginPath()
// c.arc(300,200,30,0,Math.PI * 2, false)
// c.strokeStyle = 'blue'
// c.stroke()

// 弹球
var innerWidth = window.innerWidth
var innerHeight = window.innerHeight


function Circle(x, y, dx, dy, radius) {
	this.x = x
	this.y = y
	this.dx = dx
	this.dy = dy
	this.radius = radius
	this.randomNum = Math.random()
	this.draw = function (){
		c.beginPath()
		c.arc(this.x, this.y, this.radius,0, Math.PI * 2, false)
		// 创建渐变色
		const gradient = c.createRadialGradient(this.x, this.y, this.radius * 0.2, this.x, this.y, this.radius);
		gradient.addColorStop(0, 'red'); // 内部颜色
		gradient.addColorStop(this.randomNum, 'yellow'); // 中间颜色
		gradient.addColorStop(1, 'blue'); // 外部颜色
		// 设置填充和描边颜色
		c.fillStyle = gradient; // 使用渐变色填充
		c.strokeStyle = 'black'; // 黑色描边
		c.fill();
		c.stroke()
	}
	
	this.update = function (){
		if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
			this.dx = - this.dx
		}
		if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
			this.dy = - this.dy
		}
		this.x += this.dx
		this.y += this.dy
		this.draw()
	}
	
}

var circleArray = []
for (var i = 0;i < 100; i++){
	var x = Math.random() * innerWidth
	var y = Math.random() * innerHeight
	var dx = (Math.random() - 0.5) //移动距离
	var dy = (Math.random() - 0.5)
	var radius = 30 //
	circleArray.push(new Circle(x, y, dx, dy, radius))
}
console.log(circleArray);

function animate (){
	requestAnimationFrame(animate)
	c.clearRect(0,0,innerWidth,innerHeight)
	for (let index = 0; index < circleArray.length; index++) {
		circleArray[index].update()
	}
}
animate()