var click_nav;
var set_fixed;
$(function(){
	var li_idx,page_idx,wheel_id=0;
	var is_finished = true;
	$(document.body).animate({
		scrollTop:"0"
	})
// 页面滚动
	var scrollFunc = function(e){
		var e = event || window.event; 
		e.preventDefault();
		if(is_finished){
			if(e.wheelDelta<0){					   
				//滚轮下滑		
				if(typeof(li_idx) == "undefined"){ 
				//直接是滚动事件开始的
					if(wheel_id<7){
						page_idx = wheel_id;

						scroll_nextP();
						$('.p2 .nav .nav_ct .nav_row .item').removeClass('active');
						$('.p2 .nav .nav_ct .nav_row .item .mask_bg').removeClass('longer');
						$('.p2 .nav .nav_ct .nav_row .item .mask_bg').hide();

						$('.p2 .nav .nav_ct .nav_row .item').eq(page_idx).addClass('active');
						$('.p2 .nav .nav_ct .nav_row .item').eq(page_idx).find('.mask_bg').show();
						$('.p2 .nav .nav_ct .nav_row .item').eq(page_idx).find('.mask_bg').addClass('longer');
						if(page_idx>1){
							$('.p2 .nav').css({
					 			position:'fixed'
					 		})
						}
					}
				}else{							
				//滚动前已经存在过点击事件
					if(li_idx!=7){
						page_idx = li_idx;      //滚动事件引用点击事件的上次点击li索引
						li_idx++;
						scroll_nextP();
						$('.p2 .nav .nav_ct .nav_row .item').removeClass('active');
						$('.p2 .nav .nav_ct .nav_row .item .mask_bg').removeClass('longer');
						$('.p2 .nav .nav_ct .nav_row .item .mask_bg').hide();

						$('.p2 .nav .nav_ct .nav_row .item').eq(page_idx).addClass('active');
						$('.p2 .nav .nav_ct .nav_row .item').eq(page_idx).find('.mask_bg').show();
						$('.p2 .nav .nav_ct .nav_row .item').eq(page_idx).find('.mask_bg').addClass('longer');
						if(page_idx>1){
							$('.p2 .nav').css({
					 			position:'fixed'
					 		})
						}
					}				  
				}
			}else if(e.wheelDelta>0){   	
				//滚轮上滑		
				if(typeof(li_idx) == "undefined"){
				//直接是滚动事件开始的
					if(wheel_id>0){
						page_idx = wheel_id;
						scroll_lastP();
						$('.p2 .nav .nav_ct .nav_row .item').removeClass('active');
						$('.p2 .nav .nav_ct .nav_row .item .mask_bg').removeClass('longer');
						$('.p2 .nav .nav_ct .nav_row .item .mask_bg').hide();

						$('.p2 .nav .nav_ct .nav_row .item').eq(page_idx).addClass('active');
						$('.p2 .nav .nav_ct .nav_row .item').eq(page_idx).find('.mask_bg').show();
						$('.p2 .nav .nav_ct .nav_row .item').eq(page_idx).find('.mask_bg').addClass('longer');
						if(page_idx<1){
							set_abs();
						}
					}
				}else{							
				//滚动前已经存在过点击事件
					if(li_idx!=0){
						page_idx = li_idx;      //滚动事件引用点击事件的上次点击li索引
						li_idx--;
						scroll_lastP();
						$('.p2 .nav .nav_ct .nav_row .item').removeClass('active');
						$('.p2 .nav .nav_ct .nav_row .item .mask_bg').removeClass('longer');
						$('.p2 .nav .nav_ct .nav_row .item .mask_bg').hide();

						$('.p2 .nav .nav_ct .nav_row .item').eq(page_idx).addClass('active');
						$('.p2 .nav .nav_ct .nav_row .item').eq(page_idx).find('.mask_bg').show();
						$('.p2 .nav .nav_ct .nav_row .item').eq(page_idx).find('.mask_bg').addClass('longer');
						if(page_idx<1){
							set_abs();
						}
					}				  
				}
			}
		}
	}

//滚动触发的事件函数 
	function scroll_nextP(){
		is_finished = false;
		page_idx++;
		wheel_id++;	
		console.log("-->"+page_idx);
		var page_offset_top = $('.index').eq(page_idx).offset().top;
		$(document.body).animate({
			scrollTop:page_offset_top
		},500)
		
		setTimeout(function(){
			is_finished = true;
		},500)
	}
	function scroll_lastP(){
		is_finished = false;
		page_idx--;
			
		wheel_id--;
		console.log("-->"+page_idx);
		var page_offset_top = $('.index').eq(page_idx).offset().top;
		$(document.body).animate({
			scrollTop:page_offset_top
		},500)
		
		setTimeout(function(){
			is_finished = true;
		},500)
	}

// 注册滚轮事件方法
	function regist_mousewheel(){
		//非IE 
		if(document.addEventListener && !document.attachEvent) 
		{ 
			document.addEventListener('mousewheel',scrollFunc); 
			//FF绑定滚动事件 
			document.addEventListener('DOMMouseScroll',scrollFunc); 
		} 
		//IE
		else if(document.attachEvent && !document.addEventListener){ 
			document.attachEvent('onmousewheel',scrollFunc); 
		}else{ 
			window.onmousewheel = scrollFunc; 
		}
	}

// 注销滚轮事件方法
	function concel_mousewheel(){
		//非IE 
		if(document.removeEventListener && !document.detachEvent) 
		{ 
			document.removeEventListener('mousewheel',scrollFunc); 
			//FF绑定滚动事件 
			document.removeEventListener('DOMMouseScroll',scrollFunc); 
		} 
		//IE
		else if(document.detachEvent && !document.removeEventListener){ 
			document.attachEvent('onmousewheel',scrollFunc); 
		}else{ 
			window.onmousewheel = ""; 
		}
	}

//点击导航触发页面滑动方法
	click_nav = function click_nav(_this){
			$('.p2 .nav .nav_ct .nav_row .item').removeClass('active');
			$('.p2 .nav .nav_ct .nav_row .item .mask_bg').removeClass('longer');
			$('.p2 .nav .nav_ct .nav_row .item .mask_bg').hide();

			_this.addClass('active');
			_this.find('.mask_bg').show();
			_this.find('.mask_bg').addClass('longer');

	 		//_this.index()从1开始有疑问
	 		li_idx = _this.index()-1; 
	 		var index = li_idx;
	 		$(document.body).stop().animate({
	 			scrollTop:$('.index').eq(index).offset().top
	 		},500)
	}

// 设置fixed方法
	set_fixed = function set_fixed(){
		// setTimeout(function(){
			$('.p2 .nav').css({
	 			position:'fixed'
	 		})
 		// },500)
	}
// 设置absolute方法
	function set_abs(){
		//方案一
 		// if($('.p2 .nav').css("position") != "absolute"){
			// $('.p2 .nav').animate({
	 	// 		opacity:0
	 	// 	},200)
	 	// 	setTimeout(function(){
	 	// 		$('.p2 .nav').css({
		 // 			position:'absolute'
		 // 		})
		 // 		$('.p2 .nav').animate({
	 	// 			opacity:1
	 	// 		},200)
	 	// 	},700)
 		// }

 		//方案二
 		$('.p2 .nav').css({
 			position:'absolute'
 		})
	}

// 执行页面滚轮绑定
 	regist_mousewheel();

//点击nav触发的页面滑动事件
 	$('.p2 .nav .nav_ct .nav_row .item').click(function(){
 		var _this = $(this);
 		click_nav(_this);
 		
 	})
 	$('.p2 .nav .nav_ct .nav_row .item').not(":eq(0)").click(function(){
 		set_fixed();
 	})
 	$('.p2 .nav .nav_ct .nav_row .item').eq(0).click(function(){
 		set_abs();
 	})

})
// 子页返回本页是刷新定位到具体的某个导航项；
	var locate_id = window.location.href.split('?')[1];
	function locate_to(){
		if(typeof(locate_id) != "undefined"){
			click_nav($('.p2 .nav .nav_ct .nav_row .item').eq(locate_id));
	 		set_fixed();
		}
	}