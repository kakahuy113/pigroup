import { getSVGs, Loading } from "./utilities/util";
import Axios from "axios";
declare var Swiper:any;
declare var $:any;

const swiperMainBanner = () => {
	var swiper = new Swiper('.mainBanner__wrapper .swiper-container', {
		slidesPerView: 1,
		speed: 2000,
		loop:true,
		// simulateTouch: false,
		autoplay: {
			delay: 2000,
		},
		
	});
}
const swiperProgramRule = () => {
	var swiper = new Swiper('.swiper-custom-common .swiper-container', {
		slidesPerView: 1,
		speed: 2000,
		loop:true,
		simulateTouch: false,
		autoplay: {
			delay: 2000,
		},
		breakpoints: {
			1024.98: {
				slidesPerView: 1,
				centeredSlides: false,
			},
			700: {
				slidesPerView: 3,
				centeredSlides: true,
			},
			300: {
				slidesPerView: 1.5,
				centeredSlides: true,
			}
		}
	  });
}
const swiperSummaryBottom = () => {
	var swiper = new Swiper('.summary__wrapper--bottom .swiper-container', {
		slidesPerView: 5,
		speed: 2000,
		loop:true,
		breakpoints: {
			1024.98: {
				slidesPerView: 5,
				simulateTouch: false,
			},
			400: {
				slidesPerView: 3,
				simulateTouch: true,

			},
			300: {
				slidesPerView: 2,
				simulateTouch: true,

			}
		}
	  });
}
const checkLayoutBanner = () => {
	const header = document.querySelector("header").offsetHeight;
	document.querySelector(".mainBanner").setAttribute("style" , `padding-top:${header}px`)
}

// SHOW BACK TO TOP
const showBackToTop = () => {
	$(window).scroll(function() {
		if ($(this).scrollTop() > 800) {
			$('#go-top').addClass('show');
		} else {
			$('#go-top').removeClass('show');
		}
	});

	$('#go-top').on('click', function(e:any) {
		e.preventDefault();
		$('html,body').animate({
			scrollTop: 0,
		});
	});
};

const initMenuMobile = () => {
	document.querySelector(".hambuger-menu").addEventListener("click", (e:any) => {
		e.target.classList.toggle("active")
		const menu:HTMLElement = document.querySelector(".header--menu .navBar")
		menu.classList.toggle("active")
	})
}
const scrollToSection = () => {
	$('[data-scroll-to]').on('click', function(e:any) {
		e.preventDefault();
		const scrollToNumber = $(this).attr('data-scroll-to');
		$('html,body').animate({
				scrollTop: $(`[data-scroll-id="${scrollToNumber}"]`).offset().top -
					$('header').height(),
			},
			1200
		);
	
	});
};

const canvas = () => {
	$(function() {
		var canvas = $('#canvas')[0];
		canvas.width = $(window).width();
		canvas.height = $(window).height();
		var ctx = canvas.getContext('2d');
		
		// resize
		$(window).on('resize', function() {
			canvas.width = $(window).width();
			canvas.height = $(window).height();
			ctx.fillStyle = '#000';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		});
	
		// init
		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		// objects
		var listFire: any[] = [];
		var listFirework: any[] = [];
		var fireNumber = 10;
		var center = { x: canvas.width / 2, y: canvas.height / 2 };
		var range = 100;
		for (var i = 0; i < fireNumber; i++) {
			var fire:any = {
				x: Math.random() * range / 2 - range / 4 + center.x,
				y: Math.random() * range * 2 + canvas.height,
				size: Math.random() + 0.5,
				fill: '#fd1',
				vx: Math.random() - 0.5,
				vy: -(Math.random() + 4),
				ax: Math.random() * 0.02 - 0.01,
				far: Math.random() * range + (center.y - range)
			};
			fire.base = {
				x: fire.x,
				y: fire.y,
				vx: fire.vx
			};
			//
			listFire.push(fire);
		}
	
		function randColor() {
			var r:any = Math.floor(Math.random() * 256);
			var g:any = Math.floor(Math.random() * 256);
			var b:any = Math.floor(Math.random() * 256);
			var color = 'rgb($r, $g, $b)';
			color = color.replace('$r', r);
			color = color.replace('$g', g);
			color = color.replace('$b', b);
			return color;
		}
	
		(function loop() {
			requestAnimationFrame(loop);
			update();
			draw();
		})();
	
		function update() {
			for (var i = 0; i < listFire.length; i++) {
				var fire = listFire[i];
				//
				if (fire.y <= fire.far) {
					// case add firework
					var color = randColor();
					for (var i = 0; i < fireNumber * 5; i++) {
						var firework :any = {
							x: fire.x,
							y: fire.y,
							size: Math.random() + 1.5,
							fill: color,
							vx: Math.random() * 5 - 2.5,
							vy: Math.random() * -5 + 1.5,
							ay: 0.05,
							alpha: 1,
							life: Math.round(Math.random() * range / 2) + range / 2
						};
						firework.base = {
							life: firework.life,
							size: firework.size
						};
						listFirework.push(firework);
					}
					// reset
					fire.y = fire.base.y;
					fire.x = fire.base.x;
					fire.vx = fire.base.vx;
					fire.ax = Math.random() * 0.02 - 0.01;
				}
				//
				fire.x += fire.vx;
				fire.y += fire.vy;
				fire.vx += fire.ax;
			}
	
			for (var i = listFirework.length - 1; i >= 0; i--) {
				var firework = listFirework[i];
				if (firework) {
					firework.x += firework.vx;
					firework.y += firework.vy;
					firework.vy += firework.ay;
					firework.alpha = firework.life / firework.base.life;
					firework.size = firework.alpha * firework.base.size;
					firework.alpha = firework.alpha > 0.6 ? 1 : firework.alpha;
					//
					firework.life--;
					if (firework.life <= 0) {
						listFirework.splice(i, 1);
					}
				}
			}
		}
	
		function draw() {
			// clear
			ctx.globalCompositeOperation = 'source-over';
			ctx.globalAlpha = 0.18;
			ctx.fillStyle = '#000';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
	
			// re-draw
			ctx.globalCompositeOperation = 'screen';
			ctx.globalAlpha = 1;
			for (var i = 0; i < listFire.length; i++) {
				var fire = listFire[i];
				ctx.beginPath();
				ctx.arc(fire.x, fire.y, fire.size, 0, Math.PI * 2);
				ctx.closePath();
				ctx.fillStyle = fire.fill;
				ctx.fill();
			}
	
			for (var i = 0; i < listFirework.length; i++) {
				var firework = listFirework[i];
				ctx.globalAlpha = firework.alpha;
				ctx.beginPath();
				ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
				ctx.closePath();
				ctx.fillStyle = firework.fill;
				ctx.fill();
			}
		}
	})
}
document.addEventListener("DOMContentLoaded", async () => {
	getSVGs(".svg");
	Loading();
	swiperMainBanner();
	swiperProgramRule();
	swiperSummaryBottom();
	checkLayoutBanner();
	showBackToTop();
	initMenuMobile();
	scrollToSection();
	canvas();
	// const num = document.querySelectorAll("h1").length
	
	// document.querySelector("button").addEventListener("click" , (item) => {
	// 	let check: number = 0;
	// 	if(document.querySelector("input[type=radio]:checked")) {
	// 		document.querySelectorAll("input[type=radio]:checked").forEach((item) => {
	// 			const istrue = item.getAttribute("data-istrue") 
	// 			if(istrue == "true") {
	// 				check++;
	// 			} else {
	// 				item.parentElement.classList.add('test')
	// 			}
	// 		})
	// 	}
	// 	if(check == num) {
	// 		console.log(check);
	// 		console.log("done");
	// 	} else {
	// 		console.log(check);
	// 		console.log("fail");
	// 	}
	// })
});
document.addEventListener("resize", () => {
	checkLayoutBanner();
});