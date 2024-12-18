// 自定义值
var canvas = document.querySelector('canvas')


// 弹球
var innerWidth = window.innerWidth
var innerHeight = window.innerHeight
canvas.width = innerWidth
canvas.height = innerHeight


var c = canvas.getContext('2d')

let colors = [ 'blue', 'green', 'yellow']

let mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
}

window.addEventListener('mousemove', function(event){
	mouse.x = event.clientX
	mouse.y = event.clientY
})
window.addEventListener('mouseup', function(){
	// 鼠标抬起时，将circle2的x,y设置为mouse的x,y
	circle2.x = mouse.x
	circle2.y = mouse.y
})
window.addEventListener('resize', function(){
	canvas.width = innerWidth
	canvas.height = innerHeight
	init()
})
//自定义颜色
function randomColor (colors){
	return colors[Math.floor(Math.random() * colors.length)]
}

function randomIntFromRange(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min)
}

// 获取两球之间的距离
function getDistance(x1, y1, x2, y2){
	return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

function particle(x, y, radius, color){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.radian = Math.random() * Math.PI * 2;
	this.velocity = 0.01;
	this.distanceFromCenter = randomIntFromRange(100, 200);
	this.lastMouse = {
		x: x,
		y: y
	}
	
	this.update = function(){
		const lastPoint = {
			x: this.x,
			y: this.y
		}
		this.radian += this.velocity;
		
		this.lastMouse.x = (this.x - this.lastMouse.x) * 0.05;
		this.lastMouse.y = (this.y - this.lastMouse.y) * 0.05;
		
		this.x = mouse.x + Math.cos(this.radian) * this.distanceFromCenter;
		this.y = mouse.y + Math.sin(this.radian) * this.distanceFromCenter;
		this.draw(lastPoint);
	}
	this.draw = function(lastPoint){
		c.beginPath();
		c.strokeStyle = this.color;
		c.lineWidth = this.radius;
		c.moveTo(lastPoint.x, lastPoint.y);
		c.lineTo(this.x, this.y);
		c.stroke();
		c.closePath();
	}
}


let ballArray
function init(){
	ballArray = []
	for(let i = 0; i < 100; i++){
		let x = Math.random() * (innerWidth - 100) + 100
		let y = Math.random() * (innerHeight - 100) + 100
		let radius = 2
		let color = randomColor(colors)
		ballArray.push(new particle(x, y, radius, color))
	}
}

function animate(){
	requestAnimationFrame(animate);
	c.fillStyle = 'rgba(255, 255, 255, 0.05)';
	c.fillRect(0, 0, canvas.width, canvas.height);
	for(let i = 0; i < ballArray.length; i++){
		ballArray[i].update();
	}
}
init()
animate();