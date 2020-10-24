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

const fireworks = () => {
	$('.demo').fireworks({ sound: false, opacity: .2, width: '100%', height: '100%' });
}

const answerQuestions = () => {
	 document.querySelector(".answer-btn").addEventListener("click" , (e:any) => {
		document.querySelector(`#quiz-answer input[type=radio]:checked`)
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
	fireworks();
	
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