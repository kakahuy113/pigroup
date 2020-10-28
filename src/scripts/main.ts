import { getSVGs, Loading } from "./utilities/util";
import Axios from "axios";
declare var Swiper: any;
declare var $: any;
declare var grecaptcha: any;

const swiperMainBanner = () => {
	var swiper = new Swiper(".mainBanner__wrapper .swiper-container", {
		slidesPerView: 1,
		speed: 2000,
		// autoHeight: true,
		loop: true,
		// simulateTouch: false,
		autoplay: {
			delay: 2000,
		},
	});
};
const swiperProgramRule = () => {
	var swiper = new Swiper(".swiper-custom-common .swiper-container", {
		slidesPerView: 1,
		speed: 2000,
		loop: true,
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
			},
		},
	});
};
const swiperSummaryBottom = () => {
	var swiper = new Swiper(".summary__wrapper--bottom .swiper-container", {
		slidesPerView: 5,
		speed: 2000,
		loop: true,
		simulateTouch: false,
		autoplay: {
			delay: 2000,
		},
		breakpoints: {
			1024.98: {
				slidesPerView: 5,
				simulateTouch: false,
				autoplay: false,
				spaceBetween: 0,
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
			},
		},
	});
};
const checkLayoutBanner = () => {
	const header = document.querySelector("header").offsetHeight;
	document
		.querySelector(".mainBanner")
		.setAttribute("style", `padding-top:${header}px`);
};

// SHOW BACK TO TOP
const showBackToTop = () => {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 800) {
			$("#go-top").addClass("show");
		} else {
			$("#go-top").removeClass("show");
		}
	});

	$("#go-top").on("click", function (e: any) {
		e.preventDefault();
		$("html,body").animate({
			scrollTop: 0,
		});
	});
};

const initMenuMobile = () => {
	document
		.querySelector(".hambuger-menu")
		.addEventListener("click", (e: any) => {
			e.target.classList.toggle("active");
			const menu: HTMLElement = document.querySelector(
				".header--menu .navBar",
			);
			menu.classList.toggle("active");
		});
};
const scrollToSection = () => {
	$("[data-scroll-to]").on("click", function (e: any) {
		e.preventDefault();
		const scrollToNumber = $(this).attr("data-scroll-to");
		$("html,body").animate(
			{
				scrollTop:
					$(`[data-scroll-id="${scrollToNumber}"]`).offset().top -
					$("header").height(),
			},
			1200,
		);
	});
};

const fireworks = () => {
	if (document.documentElement.offsetWidth > 1025) {
		$(".demo").fireworks({
			sound: false,
			opacity: 0.2,
			width: "100%",
			height: "100%",
		});
	}
};

const answerQuestions = () => {
	if (document.querySelector("#quiz-answer")) {
		document.querySelectorAll(".answer").forEach((item) => {
			item.querySelectorAll(".answer--item").forEach((child) => {
				child
					.querySelector(".wrapper")
					.addEventListener("click", () => {
						item.querySelectorAll(".answer--item").forEach(
							(child) => {
								child.classList.remove("checked");
							},
						);
						child.classList.add("checked");
					});
				child.addEventListener("click", (e) => {
					const checkedInput = document.querySelectorAll(
						`#quiz-answer input[type=radio]:checked`,
					);
					if (checkedInput.length > 4) {
						document
							.querySelector(".answer-btn")
							.classList.add("active");
					}
				});
			});
		});
		document
			.querySelector(".answer-btn")
			.addEventListener("click", (e: any) => {
				e.preventDefault();
				const checkedInput = document.querySelectorAll(
					`#quiz-answer input[type=radio]:checked`,
				);
				document.querySelectorAll(".answer--item").forEach((parent) => {
					parent.classList.remove("disable");
				});
				if (checkedInput.length < 5) {
					return;
				}
				let istrue = 0;
				checkedInput.forEach((item) => {
					if (item.getAttribute("istrue") == "true") {
						istrue++;
					}
				});
				if (istrue == 5) {
					$.fancybox.open({
						src: "#info-customer",
						type: "inline",
						closeExisting: true,
					});
				} else {
					document
						.querySelectorAll(".answer--item")
						.forEach((parent: any) => {
							const temp = parent.querySelector("input");
							if (parent.querySelector("input").checked) {
								if (temp.getAttribute("istrue") == "true") {
									parent.classList.add("active");
									parent.parentNode.style.cssText =
										"pointer-events:none";
								} else {
									parent.classList.add("disable");
								}
							}
						});
					document
						.querySelectorAll(".answer--item")
						.forEach((parent) => {
							const temp = parent.querySelector("input");
							if (temp.getAttribute("istrue") == "true") {
								parent.classList.add("active-hint");
							}
							//    parent.addEventListener("click" , (e:any) => {
							// 	   if ( parent.querySelector("input").checked) {
							// 		   parent.classList.add("active")
							// 	   }
							// 	   document.querySelectorAll(".answer--item").forEach(parent => {
							// 		   const temp = parent.querySelector("input");
							// 		   if ( parent.querySelector("input").checked) {
							// 			   parent.classList.add("active")
							// 		   }
							// 		   if(temp.getAttribute("istrue") == "false") {
							// 			   parent.classList.remove("active")
							// 		}
							// 	   })
							//    })
							document
								.querySelectorAll(".answer")
								.forEach((item) => {
									item.querySelectorAll(
										".answer--item",
									).forEach((child) => {
										child
											.querySelector(".wrapper")
											.addEventListener("click", () => {
												item.querySelectorAll(
													".answer--item",
												).forEach((child) => {
													child.classList.remove(
														"active",
													);
												});
												child.classList.add("active");
											});
									});
								});
						});

					$.fancybox.open({
						src: "#noti",
						type: "inline",
					});
				}
			});
	}
};

const infoCustomerRequest = () => {
	if (document.querySelector("#info-customer")) {
		document
			.querySelector(".complete button")
			.addEventListener("click", (e: any) => {
				e.preventDefault();
				const url = $(".complete button").attr("data-url");
				const formData = new FormData();
				const select: any = document.querySelector(
					".field-select input",
				);
				const responserRecaptcha: HTMLInputElement = document.querySelector(
					".g-recaptcha",
				);
				document
					.querySelectorAll(".field-input input")
					.forEach((item: any) => {
						const name = item.getAttribute("name");
						const value = item.value;
						formData.append(name, value);
					});
				const nameSelected = select.getAttribute("name");
				const valueSelected = select.value;
				formData.append(nameSelected, valueSelected);

				const valueToken = responserRecaptcha.value;
				const nameRecaptcha = responserRecaptcha.getAttribute("name");
				formData.append(nameRecaptcha, valueToken);
				if ($(".table-info-custom form").valid() === true) {
					// Axios.interceptors.request.use(config => {
					// 	$(e.target).attr("disabled" , "disabled");
					// 	return config;
					// })
					Axios.post(`${url}`, formData).then((res: any) => {
						if (res.data.Code == 200) {
							document.querySelector(
								".toGift .code",
							).textContent = res.data.Result;
							$.fancybox.open({
								src: "#congratulation",
								type: "inline",
								closeExisting: true
							});
						}
						if (res.data.Code == 400) {
							alert(`${res.data.Message}`);
							$(e.target).removeAttr("disabled");
						}
					});
				}
			});
	}
};

const recaptcha = () => {
	var script = document.createElement("script");
	script.onload = function () {
		console.log("Script loaded and ready");
	};
	if (document.querySelector(".g-recaptcha")) {
		const sitekey = document
			.querySelector(".g-recaptcha")
			.getAttribute("data-sitekey");
		script.src = `https://www.google.com/recaptcha/api.js?render=${sitekey}`;
		script.setAttribute("async", "");
		script.setAttribute("defer", "");
		document.getElementsByTagName("head")[0].appendChild(script);

		var button = document.createElement("button");
		button.classList.add("fake-button-recaptcha");
		button.onclick = (e: any) => {
			e.preventDefault();
			grecaptcha.ready(function () {
				const recaptcha: HTMLInputElement = document.querySelector(
					".g-recaptcha",
				);
				const sitekey = recaptcha.getAttribute("data-sitekey");
				grecaptcha
					.execute(`${sitekey}`, { action: "PiGroup" })
					.then(function (token: any) {
						recaptcha.value = token;
					});
			});
		};
		document
			.querySelector(".table-info-custom .wrapper")
			.appendChild(button);
	}
};

const renderCustomerGame = () => {
	// document.querySelectorAll(".pagination li a").forEach((item) => {
	// 	item.addEventListener("click", (e: any) => {
	// 		e.preventDefault();
	// 		const url = e.target.getAttribute("data-url");
	// 		Axios.get(`${url}`).then((res: any) => {
	// 			console.log(res);
	// 			document.querySelector(
	// 				".customer-list__wrapper--inner .wrapper",
	// 			).innerHTML = `${res.data}`;
	// 		});
	// 	});
	// });

	$(document).on('click', '.pagination li a', function(e:any) {
		e.preventDefault();
		const url = e.target.getAttribute("data-url");
		Axios.get(`${url}`).then((res: any) => {
			console.log(res);
			document.querySelector(
				".customer-list__wrapper--inner .wrapper",
			).innerHTML = `${res.data}`;
		});
	})
};

const checkPagination = () => {
	const paginationLength = document.querySelectorAll(".pagination li");
	paginationLength.forEach((item: any, index) => {
		if (item.classList.contains("active")) {
			if (index == 1) {
				document
					.querySelector(".pagination-prev")
					.classList.add("disable");
			}
			if (index == paginationLength.length - 2) {
				document
					.querySelector(".pagination-next")
					.classList.add("disable");
			}
		}
	});
};

const popupContent = () => {
	const content = document
		.querySelector(".programe-rule__left .rule-content")
		.outerHTML.toString();
	$("#program-rule .popup__wrapper").append(`${content}`);
	document.querySelector(".programe-rule__left .rule-content").remove();
};

const customSelect = () => {
	var x: any,
		i: any,
		j: any,
		l: any,
		ll: any,
		selElmnt: any,
		a: any,
		b: any,
		c: any;
	/*look for any elements with the class "custom-select":*/
	x = document.getElementsByClassName("custom-select");
	l = x.length;
	for (i = 0; i < l; i++) {
		selElmnt = x[i].getElementsByTagName("select")[0];
		ll = selElmnt.length;
		/*for each element, create a new DIV that will act as the selected item:*/
		a = document.createElement("DIV");
		a.setAttribute("class", "select-selected");
		a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		
		x[i].appendChild(a);
		/*for each element, create a new DIV that will contain the option list:*/
		b = document.createElement("DIV");
		b.setAttribute("class", "select-items select-hide");
		for (j = 1; j < ll; j++) {
			/*for each option in the original select element,
    create a new DIV that will act as an option item:*/
			c = document.createElement("DIV");
			c.innerHTML = selElmnt.options[j].innerHTML;
			c.addEventListener("click", function (e: any) {
				/*when an item is clicked, update the original select box,
		and the selected item:*/
				e.preventDefault();
				var y: any, i: any, k: any, s: any, h: any, sl: any, yl: any;
				s = this.parentNode.parentNode.getElementsByTagName(
					"select",
				)[0];
				sl = s.length;
				h = this.parentNode.previousSibling;
				for (i = 0; i < sl; i++) {
					if (s.options[i].innerHTML == this.innerHTML) {
						s.selectedIndex = i;
						h.innerHTML = this.innerHTML;
						y = this.parentNode.getElementsByClassName(
							"same-as-selected",
						);
						yl = y.length;
						for (k = 0; k < yl; k++) {
							y[k].removeAttribute("class");
						}
						this.setAttribute("class", "same-as-selected");
						document.querySelector<any>(".field-select input").value = this.innerHTML;
						break;
					}
				}
				h.click();
			});
			b.appendChild(c);
		}
		x[i].appendChild(b);
		a.addEventListener("click", function (e: any) {
			/*when the select box is clicked, close any other select boxes,
	  and open/close the current select box:*/
			e.stopPropagation();
			e.preventDefault();

			closeAllSelect(this);
			checkformSan();
			this.nextSibling.classList.toggle("select-hide");
			this.classList.toggle("select-arrow-active");
		});
	}
	function closeAllSelect(elmnt: any) {
		/*a function that will close all select boxes in the document,
  except the current select box:*/
	  elmnt.preventDefault();
		var x,
			y,
			i,
			xl,
			yl,
			arrNo = [];
		x = document.getElementsByClassName("select-items");
		y = document.getElementsByClassName("select-selected");
		xl = x.length;
		yl = y.length;
		for (i = 0; i < yl; i++) {
			if (elmnt == y[i]) {
				arrNo.push(i);
			} else {
				y[i].classList.remove("select-arrow-active");
			}
		}
		for (i = 0; i < xl; i++) {
			if (arrNo.indexOf(i)) {
				x[i].classList.add("select-hide");
			}
		}
	}
	/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
	document.addEventListener("click", closeAllSelect);
};

const checkformSan = () => {
	const selectlength =  document.querySelectorAll(".field-select select option").length
	const selectIndex = document.querySelector<any>("#san").selectedIndex
	if(selectlength - 1 == selectIndex) {
		document.querySelector<any>(".field-select input").value = ""
		document.querySelector(".field-select").classList.add("active")
		document.querySelector<any>(".field-select input").focus();
	} else {
		document.querySelector(".field-select").classList.remove("active")
	}
}

window.onload = () => {
	if (document.querySelector(".fake-button-recaptcha")) {
		const button: HTMLElement = document.querySelector(
			".fake-button-recaptcha",
		);
		button.click();
	}
};

document.addEventListener("DOMContentLoaded", async () => {
	getSVGs(".svg");
	Loading();
	recaptcha();
	popupContent();
	swiperMainBanner();
	swiperProgramRule();
	swiperSummaryBottom();
	checkLayoutBanner();
	showBackToTop();
	initMenuMobile();
	scrollToSection();
	answerQuestions();
	infoCustomerRequest();
	renderCustomerGame();
	checkPagination();
	customSelect();
	fireworks();

});
document.addEventListener("resize", () => {
	checkLayoutBanner();
});
