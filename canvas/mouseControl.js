var canvas = document.querySelector('canvas')



var c = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// 弹球
var innerWidth = window.innerWidth
var innerHeight = window.innerHeight

let mouse = {
	x:undefined,
	y:undefined
}
window.addEventListener('mousemove',function(e){
	mouse.x = e.x
	mouse.y = e.y
})
window.addEventListener('resize',function(e){
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	init()
})
const maxRadius = 40 //最大半径
const minRadius = 2  //最小半径

var colorArray = [
	'#ffaa33',
	'#99ffaa',
	'#00ff00',
	'#4411aa',
	'#ff1100'
]

function Circle(x, y, dx, dy, radius) {
	this.x = x
	this.y = y
	this.dx = dx
	this.dy = dy
	this.radius = radius
	this.minRadius = radius
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
	this.draw = function (){
		c.beginPath()
		c.arc(this.x, this.y, this.radius,0, Math.PI * 2, false)
		c.fillStyle = this.color
		c.fill();
		
	}
	
	this.update = function (){
		// 把小球控制在视口
		if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
			this.dx = - this.dx
		}
		if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
			this.dy = - this.dy
		}
		this.x += this.dx
		this.y += this.dy
		
		// 鼠标控制小球 
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
			if(this.radius < maxRadius){
				this.radius += 1
			}
		}else if(this.radius > this.minRadius){
			this.radius -= 1
		}
		
		this.draw()
	}
	
}
var circleArray = []
// 初始化
function init (){
	circleArray = []
	for (var i = 0;i < 800; i++){
		var x = Math.random() * innerWidth
		var y = Math.random() * innerHeight
		var dx = (Math.random() - 0.5) //移动距离
		var dy = (Math.random() - 0.5)
		var radius = Math.random() * 3 + 1//
		circleArray.push(new Circle(x, y, dx, dy, radius))
	}
	console.log(circleArray);
}

init()

function animate (){
	requestAnimationFrame(animate)
	c.clearRect(0,0,innerWidth,innerHeight)
	for (let index = 0; index < circleArray.length; index++) {
		circleArray[index].update()
	}
}
animate()