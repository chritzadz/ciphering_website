//MOUSE HOVER:
const canvas = document.getElementById('mouse');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const mouse = {
	x: undefined,
	y: undefined
}
var particleArray = [];
var maxParticles = 10;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});		

class Particle {
    constructor(x, y){
            this.x = x;
            this.y = y;
            this.prevX = x;
            this.prevY = y;
            this.alpha = 1;
            this.fadeOutRate = 0.005;
            this.radius = 5;
            //test
            this.lineLength = 150;
            this.angle = Math.random() * Math.PI * 2; 
    }
    updateTrail(){
            this.alpha -= this.fadeOutRate;
            this.prevX = this.x;
            this.prevY = this.y;
            this.x = mouse.x; //update
            this.y = mouse.y;
    }
    drawTrail(){
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`; 
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.moveTo(this.prevX, this.prevY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }
}

canvas.addEventListener('mousemove', function(event) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;

    if (mouse.x !== undefined && mouse.y !== undefined) {
            particleArray.push(new Particle(mouse.x, mouse.y));

            if (particleArray.length > maxParticles) {
                particleArray.splice(0, particleArray.length - maxParticles);
            }
    }
});

function handleParticles(){
		for (let i = 0; i < particleArray.length; i++){
				particleArray[i].updateTrail();
				particleArray[i].drawTrail();

				if (particleArray[i].alpha <= 0){
					particleArray.splice(i, 1); // Remove faded particles from the array
					i--;
				}
		}
}

function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if (mouse.x === undefined && mouse.y === undefined) {
				maxParticles = 0;
				particleArray = [];
		} else {
				maxParticles = 10;
				handleParticles();
		}

		requestAnimationFrame(animate);
}
animate();