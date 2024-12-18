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

function RamdomIntFromRange(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min)
}
function rotate(velocity, angle){
	return {
		x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
		y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
	}
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}



function Ball(x, y, radius, color){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.opacity = 0
	this.mass = 1
	this.velocity = {
		x: (Math.random() - 0.5) * 4,
		y: (Math.random() - 0.5) * 4
	}
	this.update = function(){
		this.draw();
		for(let i = 0; i < ballArray.length; i++){
			if(this === ballArray[i]){
				continue
			}
			if (getDistance(this.x, this.y, ballArray[i].x, ballArray[i].y) - this.radius * 2 < 0){
				resolveCollision(this, ballArray[i])
			}
		}
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.velocity.x = -this.velocity.x;
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.velocity.y = -this.velocity.y;
		}
		
		// mouse 互动
		if (getDistance(mouse.x, mouse.y, this.x, this.y) < 120 && this.opacity < 0.2){
			this.opacity += 0.02
		} else if(this.opacity > 0){
			this.opacity -= 0.02
			this.opacity = Math.max(0, this.opacity)
		}
		
		this.x += this.velocity.x
		this.y += this.velocity.y
	}
	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		// 描边
		c.save()
		c.globalAlpha = this.opacity
		c.fillStyle = this.color
		c.fill()
		c.restore()
		c.strokeStyle = this.color
		c.stroke()
		c.closePath();
	}
}

let ballArray
function init(){
	ballArray = []
	for(let i = 0; i < 200; i++){
		let radius = 20
		let x = Math.random() * (innerWidth - radius * 2) + radius
		let y = Math.random() * (innerHeight - radius * 2) + radius
		let color = randomColor(colors)
		
		if(i != 0) {
			for(let j = 0; j < ballArray.length; j++){
				if(getDistance(x, y, ballArray[j].x, ballArray[j].y) - radius * 2 < 0){
					x = RamdomIntFromRange(radius, innerWidth - radius)
					y = RamdomIntFromRange(radius, innerHeight - radius)
					j = -1
				}
			}
		}
		ballArray.push(new Ball(x, y, radius, color))
	}
}

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	for(let i = 0; i < ballArray.length; i++){
		ballArray[i].update();
	}
}
init()
animate();