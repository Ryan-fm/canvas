// 自定义值
var canvas = document.querySelector('canvas')


// 弹球
var innerWidth = window.innerWidth
var innerHeight = window.innerHeight
canvas.width = innerWidth
canvas.height = innerHeight


var c = canvas.getContext('2d')

let colors = ['red', 'blue', 'green', 'yellow', 'purple']

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

// 获取两球之间的距离
function getDistance(x1, y1, x2, y2){
	return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

function Ball(x, y, radius, color){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	
	this.update = function(){
		this.draw();
	}
	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	}
}

let circle1
let circle2 
let ballArray
function init(){
	ballArray = []
	circle1 = new Ball(((innerWidth - 100) / 2), ((innerHeight - 100) / 2), 100, 'black');
	for(let i = 0; i < 100; i++){
		let radius = Math.random() * 30
		let x = Math.random() * (innerWidth - radius * 2) + radius
		let y = Math.random() * (innerHeight - radius * 2) + radius
		let color = randomColor(colors)
		ballArray.push(new Ball(x, y, radius, color))
	}
}

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	circle1.update();
	for(let i = 0; i < ballArray.length; i++){
		ballArray[i].update();
		// 让ballArray[i] 中的球向circle1移动 时间 1000ms
		ballArray[i].x += (circle1.x - ballArray[i].x) / 1000
		ballArray[i].y += (circle1.y - ballArray[i].y) / 1000
		if(getDistance(circle1.x, circle1.y, ballArray[i].x, ballArray[i].y) < circle1.radius + ballArray[i].radius){
			// 碰撞后，绕着circle1旋转 
			if (ballArray[i].x < (circle1.x + circle1.radius)){
				ballArray[i].x = circle1.x + (ballArray[i].x - circle1.x) * Math.cos(Math.PI / 180) - (ballArray[i].y - circle1.y) * Math.sin(Math.PI / 180)
				ballArray[i].y = circle1.y + (ballArray[i].x - circle1.x) * Math.sin(Math.PI / 180) + (ballArray[i].y - circle1.y) * Math.cos(Math.PI / 180)
			}
			// 如果全部汇集到中点 又散开
			if(ballArray[i].x === circle1.x && ballArray[i].y === circle1.y){
				ballArray[i].x = Math.random() * (innerWidth - ballArray[i].radius * 2) + ballArray[i].radius
				ballArray[i].y = Math.random() * (innerHeight - ballArray[i].radius * 2) + ballArray[i].radius
			}
		}
	}
	
		
	// if(getDistance(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.radius + circle2.radius){
	// 	console.log('碰撞');
	// 	// 碰撞后，circle2的颜色设置为circle1的颜色
	// 	circle2.color = circle1.color
	// }else {
	// 	circle2.color = 'blue'
	// }
}
init()
animate();