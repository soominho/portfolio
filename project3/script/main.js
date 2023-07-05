window.addEventListener("load", function(){
	let h,winHalf;
	let n=0;
	let targety=0;

	let body=document.body;
	let header=document.getElementById("header");
	let top=header.firstElementChild;

	let nav=document.getElementById("gnb");
	let navLi=nav.firstElementChild.children;

	let tab=document.querySelector(".tab");
	let tabMenu=document.querySelector(".tab_menu");
	let [tabClose, tabContent]=tabMenu.children;
	let tabLi=tabContent.firstElementChild.children;

	let section=document.querySelector("section");
	let pageList=section.children;
	console.log(pageList);

	let dim=document.querySelector(".dim");

	let up=document.getElementById("up");

	function init(){
		h=window.innerHeight;
		winHalf=h/2;
	}

	init();

	window.addEventListener("resize", init);

	function scrollInteraction(t){
		if(t < pageList[0].offsetTop-winHalf){
			n=0;
		}
		else if(t < pageList[1].offsetTop-winHalf){
			n=1;
		}
		else if(t < pageList[2].offsetTop-winHalf){
			n=2;
		}
		else if(t < pageList[3].offsetTop-winHalf){
			n=3;
		}
		else if(t < pageList[4].offsetTop-winHalf){
			n=4;
		}
		else{
			n=5;
		}

		for(let i=0; i < navLi.length; i++){
			if(i === n){
				if(navLi[i].classList.contains("active") === false)
				navLi[i].classList.add("active");
			}
			else{
				if(navLi[i].classList.contains("active") === true)
				navLi[i].classList.remove("active");
			}
		}
		top.classList.add("active");
	}

	tab.addEventListener("click", function(e){
		e.preventDefault();
		body.classList.add("fixed");
		tabMenu.classList.toggle("active");
		dim.classList.toggle("active");
	});

	tabClose.addEventListener("click", function(e){
		e.preventDefault();
		body.classList.remove("fixed");
		tabMenu.classList.remove("active");
		dim.classList.remove("active");
	});

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
			callback: (offset, dir) => { scrollInteraction(offset.y); }
		}
	});

	trigger.add("#header, [id^=page]");

	for(let i=0; i<navLi.length; i++){
		navLi[i].addEventListener("click", function(e){
			e.preventDefault();
			targety=pageList[i].offsetTop-winHalf;
			gsap.to(window, {scrollTo: targety, duration: 0.5});
		});

		tabLi[i].addEventListener("click", function(e){
			e.preventDefault();
			body.classList.remove("fixed");
			tabMenu.classList.remove("active");
			dim.classList.remove("active");

			setTimeout(function(){
				targety=pageList[i].offsetTop-winHalf;
				gsap.to(window, {scrollTo: targety, duration: 0.5});
			}, 500);
		});
	}

	up.addEventListener("click", function(){
		targety=0;
		gsap.to(window, {scrollTo: targety, duration: 0.5});
	});
});