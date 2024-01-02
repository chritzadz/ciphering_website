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


//BG STARS
particlesJS("bg_star", {
		"particles": {
			"number": {
				"value": 1200,
				"density": {
					"enable": true,
					"value_area": 800
				}
			},
			"color": {
				"value": "#ffffff"
			},
			"shape": {
				"type": "circle",
				"stroke": {
					"width": 0,
					"color": "#000000"
				},
				"polygon": {
					"nb_sides": 5
				},
				"image": {
					"src": "img/github.svg",
					"width": 100,
					"height": 100
				}
			},
			"opacity": {
				"value": 0.48927153781200905,
				"random": false,
				"anim": {
					"enable": true,
					"speed": 0.2,
					"opacity_min": 0,
					"sync": false
				}
			},
			"size": {
				"value": 2,
				"random": true,
				"anim": {
					"enable": true,
					"speed": 2,
					"size_min": 0,
					"sync": false
				}
			},
			"line_linked": {
				"enable": false,
				"distance": 150,
				"color": "#ffffff",
				"opacity": 0.4,
				"width": 1
			},
			"move": {
				"enable": true,
				"speed": 0.2,
				"direction": "none",
				"random": true,
				"straight": false,
				"out_mode": "out",
				"bounce": false,
				"attract": {
					"enable": false,
					"rotateX": 600,
					"rotateY": 1200
				}
			}
		},
		"interactivity": {
			"detect_on": "canvas",
			"events": {
				"onhover": {
					"enable": true,
					"mode": "bubble"
				},
				"onclick": {
					"enable": true,
					"mode": "push"
				},
				"resize": true
			},
			"modes": {
				"grab": {
					"distance": 400,
					"line_linked": {
						"opacity": 1
					}
				},
				"bubble": {
					"distance": 83.91608391608392,
					"size": 2,
					"duration": 3,
					"opacity": 1,
					"speed": 3
				},
				"repulse": {
					"distance": 200,
					"duration": 0.4
				},
				"push": {
					"particles_nb": 4
				},
				"remove": {
					"particles_nb": 2
				}
			}
		},
		"retina_detect": true
	});

