window.addEventListener("load", () => {
	let n=0;
	let prevN;
	let pos=0;

	let sectionList=document.getElementsByTagName("section");
	let header=document.getElementById("header");
	let menu=header.getElementsByClassName("total")[0];
	let menuList=menu.firstElementChild.firstElementChild.children;
	let tab=header.getElementsByClassName("tab")[0];

	let scrollInteraction=t => {
		if(t < sectionList[1].offsetTop){
			n=0;
		}
		else if(t < sectionList[2].offsetTop){
			n=1;
		}
		else if(t < sectionList[3].offsetTop){
			n=2;
		}
		else{
			n=3;
		}

		if(n === prevN) return;

		prevN=n;

		for(let i=0; i<menuList.length; i++){
			if(i === n){
				menuList[i].classList.add("active");
			}
			else{
				menuList[i].classList.remove("active");
			}
		}
	}

	const trigger=new ScrollTrigger.default({
		trigger: {
			once: true,
			toggle: {
				class: {
					in: "active",
					out: "inactive"
				}
			},
			offset: {
				viewport: {
					x: 0,
					y: 0.25
				}
			}
		},
		scroll: {
			element: window, 
			callback: (offset, dir) => scrollInteraction(offset.y)
		}
	});

	trigger.add("#start, #page1, #page2, #page3 .title, #page3 .work li");

	tab.addEventListener("click", e => {
		e.preventDefault();

		if(e.currentTarget.classList.contains("active") === false){
			e.currentTarget.classList.add("active");
			document.body.classList.add("fixed");

			gsap.fromTo(menu, {display: "block", opacity: 0}, {opacity: 1, duration: 0.3});
		}
		else{
			e.currentTarget.classList.remove("active");
			document.body.classList.remove("fixed");

			gsap.to(menu, {opacity: 0, duration: 0.3, onComplete: () => {
				menu.removeAttribute("style");
			}});
		}
	});

	let mainSlider=document.getElementsByClassName("main_slider")[0];
	let controller=mainSlider.getElementsByClassName("controller")[0];
	let [num, progressbar, direction]=controller.children;
	let bar=progressbar.firstElementChild;
	let [prevBtn, nextBtn]=direction.children;
	let tween;

	const mainSwiper=new Swiper(".mainSwiper", {
		speed: 1200,
		// loop: true,
		autoplay: {
			delay: 8000,
			disableOnInteraction: false
		},
		on: {
			init: function(){
				current=this.realIndex;
				total=this.slides.length;

				num.innerHTML=`${current+1}<span></span> / ${total}`;
				prevBtn.classList.remove("visible");
				nextBtn.classList.add("visible");

				tween=gsap.to(bar, {width: "100%", duration: 8});
			},
			slideChange: function(){
				current=this.realIndex;
				total=this.slides.length;

				num.innerHTML=`${current+1}<span></span> / ${total}`;
				tween.pause();
				tween.seek(0)

				setTimeout(() => {
					tween.play();
				}, 50);

				switch(current){
					case 0 :
						prevBtn.classList.remove("visible");
						nextBtn.classList.add("visible");
						break;
					case total-1 :
						prevBtn.classList.add("visible");
						nextBtn.classList.remove("visible");
						break;
					default:
						prevBtn.classList.add("visible");
						nextBtn.classList.add("visible");
						break;
				}
			}
		}
	});

	prevBtn.addEventListener("click", e => {
		e.preventDefault();
		mainSwiper.slidePrev();
	});
	nextBtn.addEventListener("click", e => {
		e.preventDefault();
		mainSwiper.slideNext();
	});

	for(let i=0; i<menuList.length; i++){
		menuList[i].addEventListener("click", e => {
			e.preventDefault();
			tab.classList.remove("active");
			document.body.classList.remove("fixed");

			if(i == 0){
				pos=0;
			}
			else{
				pos=Math.round(sectionList[i].offsetTop);
			}

			gsap.to(menu, {opacity: 0, duration: 0.3, onComplete: () => {
				menu.removeAttribute("style");
				gsap.to(window, {scrollTo: pos, duration: 0.5});
			}});
		});
	}
});