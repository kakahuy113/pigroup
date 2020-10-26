import { getSVGs, Loading } from "./utilities/util";
import Axios from "axios";
declare var Swiper:any;
declare var $:any;
declare var grecaptcha:any;

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
		simulateTouch: false,
		autoplay: {
			delay: 2000,
		},
		breakpoints: {
			1024.98: {
				slidesPerView: 5,
				simulateTouch: false,
				autoplay: false,
				spaceBetween: 0
			},
			400: {
				spaceBetween: 10,
				slidesPerView: 3,
				simulateTouch: true,
			},
			300: {
				spaceBetween: 10,
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
	if(document.querySelector("#quiz-answer")) {
		document.querySelector(".answer-btn").addEventListener("click" , (e:any) => {
			e.preventDefault();
		   const checkedInput = document.querySelectorAll(`#quiz-answer input[type=radio]:checked`)
		   if(checkedInput.length < 5) {
			   console.log(checkedInput.length);
			   $.fancybox.open({
				   src: "#noti-2",
				   type: "inline"
			   })
			   return;
		   }
		   let istrue = 0;
		   checkedInput.forEach((item) => {
			   if(item.getAttribute("istrue") == "true") {
				   istrue++;
			   } 
		   })
		   if(istrue == 5 ) {
			   $.fancybox.open({
				   src: "#info-customer",
				   type: "inline",
				   closeExisting: true,
			   })
		   } else {
			   document.querySelectorAll(".answer--item").forEach((parent:any) => {
				   const temp = parent.querySelector("input");
				   if ( parent.querySelector("input").checked) {
					   if(temp.getAttribute("istrue") == "true") {
						   parent.classList.add("active")
						   parent.parentNode.style.cssText  = "pointer-events:none"
					   } else {
						   parent.classList.add("disable")
					   }
				   }
			   })
			   document.querySelectorAll(".answer--item").forEach(parent => {
				   const temp = parent.querySelector("input");
				   if( temp.getAttribute("istrue") == "true") {
					   parent.classList.add("active-hint")
				   }
				   parent.addEventListener("click" , (e:any) => {
					   if ( parent.querySelector("input").checked) {
						   parent.classList.add("active")
					   }
					   document.querySelectorAll(".answer--item").forEach(parent => {
						   const temp = parent.querySelector("input");
						   if ( parent.querySelector("input").checked) {
							   parent.classList.add("active")
							   
						   }
						   if(temp.getAttribute("istrue") == "false") {
							   parent.classList.remove("active")
		   
						   } 
					   })
				   })
			   })
		   
		   
			   
			   $.fancybox.open({
				   src: "#noti",
				   type: "inline",
			   })
		   }
		})
	}
}

const infoCustomerRequest = () => {
	if(document.querySelector("#info-customer")) {
		document.querySelector(".complete button").addEventListener("click" , (e:any) => {	
			e.preventDefault();
			const url = $(".complete button").attr("data-url")
			const formData = new FormData();
			const select: any = document.querySelector(".field-select select")
			const responserRecaptcha: HTMLInputElement = document.querySelector(".g-recaptcha")
			document.querySelectorAll(".field-input input").forEach((item:any) => {
				const name = item.getAttribute("name")
				const value = item.value
				formData.append(name , value)
			});
			const nameSelected = select.getAttribute("name");
			const valueSelected = select.value;
			formData.append(nameSelected , valueSelected);
			
			const valueToken = responserRecaptcha.value;
			const nameRecaptcha = responserRecaptcha.getAttribute("name");
			formData.append(nameRecaptcha , valueToken);
			if($(".table-info-custom form").valid() === true) {
				// Axios.interceptors.request.use(config => {
				// 	$(e.target).attr("disabled" , "disabled");
				// 	return config;
				// })
				Axios.post(`${url}`, formData).then((res: any) => {
					if (res.data.Code == 200) {
						$.fancybox.open({
							src: "#congratulation",
							type: "inline"
						})
					}
					if (res.data.Code == 400) {
						alert(`${res.data.Message}`);
						$(e.target).removeAttr("disabled");
					}
				});
			}
		})
	}
}

const recaptcha = () => {
	var script = document.createElement('script');
	script.onload = function() {
		console.log("Script loaded and ready");
	};
	if(document.querySelector(".g-recaptcha")) {
		const sitekey = document.querySelector(".g-recaptcha").getAttribute("data-sitekey");
		script.src = `https://www.google.com/recaptcha/api.js?render=${sitekey}`;
		script.setAttribute("async", "");
		script.setAttribute("defer", "");
		document.getElementsByTagName('head')[0].appendChild(script);

		var button = document.createElement("button")
		button.classList.add("fake-button-recaptcha")
		button.onclick = (e:any) => {
			e.preventDefault();
			grecaptcha.ready(function () {
				const recaptcha: HTMLInputElement =document.querySelector('.g-recaptcha');
				const sitekey = recaptcha.getAttribute("data-sitekey")
				grecaptcha.execute(`${sitekey}`, { action: 'PiGroup' }).then(function (token: any) {
					recaptcha.value = token
				});
			});
		}
		document.querySelector('.table-info-custom .wrapper').appendChild(button);
	}
	
}

const renderCustomerGame = () => {
	document.querySelectorAll(".pagination li a").forEach(item => {
		item.addEventListener("click" , (e:any) => {
			e.preventDefault();
			const url = e.target.getAttribute("data-url")
			Axios.get(`${url}`).then((res:any) => {
				if(res.data.Code == 200) {
					document.querySelector(".customer-list__wrapper--inner .wrapper").innerHTML = `${res.data.Result}`
				} else {
					alert(res.data.Message)
				}
			})
		})
	})
}

const checkPagination =  () => {
	const paginationLength = document.querySelectorAll(".pagination li");
	paginationLength.forEach((item:any , index) => {
		if(item.classList.contains("active")) {
			if(index == 1) {
				document.querySelector(".pagination-prev").classList.add("disable")
			}
			if(index == (paginationLength.length - 2)) {
				document.querySelector(".pagination-next").classList.add("disable")
			}
		}
		
	})
}
window.onload = () => {
	if(document.querySelector(".fake-button-recaptcha")) {
		const button: HTMLElement = document.querySelector(".fake-button-recaptcha");
		button.click()
	}

}

document.addEventListener("DOMContentLoaded", async () => {
	getSVGs(".svg");
	Loading();
	recaptcha()
	swiperMainBanner();
	swiperProgramRule();
	swiperSummaryBottom();
	checkLayoutBanner();
	showBackToTop();
	initMenuMobile();
	scrollToSection();
	fireworks();
	answerQuestions();
	infoCustomerRequest();
	renderCustomerGame();
	checkPagination();
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