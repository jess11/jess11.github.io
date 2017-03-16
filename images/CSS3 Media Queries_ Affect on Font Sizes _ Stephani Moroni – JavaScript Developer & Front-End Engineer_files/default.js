/* 
	Javascript 
	by Stephani Alves
	alves@stephanimoroni.com
	On July 12, 2013
*/

jQuery(window).ready(function () {
var sections = $('.section');
var length = $('.section').size();
var pos = 1;
var current = 'banner';
var current_pos = 0;

/*
	Load background images
	& Reposition images
*/
function resizeMySections(){
	$('.section').each(function(){

		var min_height = $(this).next();
		var height= $(window).height();
		if(min_height > height){
			height = min_height
		}
		$(this).css('min-height', height);

		var bg_img = $(this).attr('dataImgBkg');
		if(bg_img){
			var path = 'url(images/' + bg_img + ')';
			$(this).css('background-image', path );
			$(this).css({backgroundSize: "cover"});
		}
		
	});
}

/*
	on load of page
*/
resizeMySections();

/*
	on window resize
*/
$(window).resize(function() {
	resizeMySections();
	adjustFooter();
});


/*
	Respond to main menu
*/

$('#hard-coded-menu ul li').on('click', function(){
	var id = $(this).attr('id');
	var arr = id.split('-');
	var current_section = $('#'+ arr[1] +'');
	var position = $('#'+ arr[1] +'').position();
	$('.section').removeClass('current');
	current_section.addClass('current');
	if(arr[1] != current){
		$(window).tween({
			scroll:{
				stop: position.top,
				time: 0,
				duration: 1,
				effect: 'expoInOut'
			}
		});
		$.play();
	}else{
		$(window).tween({
			scroll:{
				stop: position.top,
				time: 0,
				duration: 1,
				effect: 'expoInOut'
			}
		});
		$.play();
	} 

});


/*
	Share menu animations
*/


$('.share-btns li').on('mouseover', function(){
	//console.log('mouseover');
	//console.log($(this));
	$(this).tween({
		opacity:{
	      start: 100,
	      stop: 50,
	      time: 0,
	      duration: 0.5,
	      effect:'linear'
	   }
	});

	$.play();
});


/* 
	Share
*/
 $('#share-twitter').on('click',function(event) {
    var width  = 575,
        height = 400,
        left   = ($(window).width()  - width)  / 2,
        top    = ($(window).height() - height) / 2,
        url    = this.href,
        opts   = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left;
    
    window.open(url, 'twitter', opts);
 
    return false;
  });


/*
	Testing isotope
*/
$('#content-iso').isotope({
	itemSelector: 'article',
	layoutMode : 'masonry'
}).isotope('insert', $('#load-content').find('article'));

var $checkboxes = $('#filters input');

$checkboxes.change(function(){
	//console.log('changed');
	var filters = [];
	// get checked checkboxes values
	$checkboxes.filter(':checked').each(function(){
	  filters.push( this.value );
	});
	// ['.red', '.blue'] -> '.red, .blue'
	filters = filters.join(', ');
	$('#content-iso').isotope({ filter: filters });
});


/*
	Detecting end of page
*/
var near_bottom = false;
$(window).scroll(function() {
	if(near_bottom == false){
		if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        // console.log("near bottom!");
         near_bottom = true;
   		}//end near bottom		
	}else{
		//near bottom has approached load more posts

	}

});
/*
	Adjust footer
*/
function adjustFooter(){
	var min = $(window).height();
	$('#contentWrap').css('min-height', min + 'px');
}

adjustFooter();


/*
	Load more articles
*/

$('#btn-load-more').on('click', function(){
	//console.log('load more...');
});

/*
	Load more details, project portfolio 
*/
$('#flip-portfolio').on('click', function(){
	$('#flip-portfolio').hide();
	$('.front-portfolio').tween({
		left:{
			start: 0,
			stop: -9000,
			unit: 'px',
			time: 0,
			duration: 0.5,
			effect:'linear',
			onStop: function(){
				$('.front-portfolio').hide();


				$('.back-portfolio').show();

				$('.back-portfolio').tween({
					left:{
						start: 4000,
						stop: 0,
						unit: 'px',
						time: 0,
						duration: 0.1,
						effect:'linear'

					}
				});
				$.play();
			}

		}
	});

	$.play();


});




$('.portfolio-viewer').on('mouseover', function(){
	var h = $(this).height();
	$(this).css('height', 'auto');
	var autoheight = $(this).height();

	$(this).height(h).stop().animate({
		opacity: 1,
		height: autoheight
	});
});

$('.portfolio-viewer').on('mouseout', function(){
	$(this).stop().animate({
		opacity: 0.66,
		height: "200"
	});
})


});//end of finish load



