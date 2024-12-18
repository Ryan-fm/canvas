// 两个矩形接触
var canvas = document.querySelector('canvas')


var innerWidth = window.innerWidth
var innerHeight = window.innerHeight
canvas.width = innerWidth
canvas.height = innerHeight


var c = canvas.getContext('2d')

const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
}

window.addEventListener('mousemove', function(event){
	mouse.x = event.clientX
	mouse.y = event.clientY
})

function animate(){
	requestAnimationFrame(animate)
	c.fillStyle = 'rgba(255, 255, 255, 0.1)'
	c.fillRect(0, 0, innerWidth, innerHeight)
	c.fillStyle = 'red'
	c.fillRect(mouse.x, mouse.y, 100, 100)
	
	if(mouse.x + 100 > canvas.width / 2 - 50 && mouse.x < canvas.width / 2 + 50 && mouse.y + 100 > canvas.height / 2 - 50 && mouse.y < canvas.height / 2 + 50){
		c.fillStyle = '#92ABEA'
		c.fillRect(mouse.x, mouse.y, 100, 100)
	}
	
	c.fillStyle = '#92ABEA'
	c.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100)
}

animate()
