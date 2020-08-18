import { getSVGs, Loading } from "./utilities/util";
import { Fullpage, FullpageOptions } from "./libraries/Fullpage";
import Axios from "axios";

document.addEventListener("DOMContentLoaded", async () => {
	getSVGs(".svg");
	Loading();
	// create instance fullpage
	const fpOptions: FullpageOptions = {
		prevEl: ".fp-prev",
		nextEl: ".fp-next",
		speed: 800,
		slideClass: ".fp-slide",
		dots: true,
		on: {
			// event is fired before slide start transition
			beforeSlideChange: function (
				currentSlide,
				nextSlide,
				currentIndex,
				nextIndex,
			) {
				console.log(currentSlide, nextSlide, currentIndex, nextIndex);
			},
			// event is fired after slide end transition
			afterSlideChange: function (currentSlide, currentIndex) {
				console.log(currentSlide, currentIndex);
			},
		},
	};
	const fp = new Fullpage(".fp-container", fpOptions);
	// method slide to a slide with index
	fp.slideTo(0);
	// method get current index of fullpage
	fp.getIndex();
	// method allow or not allow scroll to slide fullpage: true = allow, false = not allow
	fp.canScroll(true);
});

const fetchData = () => {
	const formData = new FormData();
	formData.append("FirstName", "Sơn");
	formData.append("LastName", "Vũ");
	Axios.post("/user", formData).then(function (response) {
		console.log(response);
	});

	Axios.get("./api/test.json")
		.then((response) => {
			return response;
		})
		.finally(() => {});
};
