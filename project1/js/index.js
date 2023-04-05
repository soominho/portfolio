$(function(){
	let pageN=0;

	$(".control li").eq(0).addClass("current");
	$(".keyvisual li").eq(0).addClass("active");

	$(".control li").click(function(e){
		e.preventDefault();
		$(".control li").removeClass("current");
		$(this).addClass("current");

		pageN=$(this).index();
		$(".keyvisual li").removeClass("active");
		$(".keyvisual li").eq(pageN).addClass("active");
		
	});

	$("a.right").click(function(e){
		e.preventDefault();

		if(pageN < 3){ 
			pageN=pageN+1;
		}
		else{
			pageN=0;
		}

		$(".control li").removeClass("current");
		$(".control li").eq(pageN).addClass("current");
		$(".keyvisual li").removeClass("active");
		$(".keyvisual li").eq(pageN).addClass("active");
	});
	$("a.left").click(function(e){
		e.preventDefault();
		

		if(pageN > 0){
			pageN=pageN-1;
		}
		else{
			pageN=3;
		}

		$(".control li").removeClass("current");
		$(".control li").eq(pageN).addClass("current");
		$(".keyvisual li").removeClass("active");
		$(".keyvisual li").eq(pageN).addClass("active");
	});
});
$(function(){
	$("#gnb > ul > li").hover(
		function(){
			$("#header .menu").addClass("active");
		},
		function(){
			$("#header .menu").removeClass("active");
		}
	);
});