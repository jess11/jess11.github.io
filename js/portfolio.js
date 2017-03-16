$(window).on("load",function(){
    $('#fullpage').fullpage({
      scrollOverflow: true,
      menu: '#menu',
      anchors:['home', 'about', 'work', 'contact'],
      keyboardScrolling: false,
    });




//ANIMATIONS



var $animation_elements = $('.animation-element');
var $window = $(window);

function check_if_in_view(){
  var windowh = $window.height();
  var windowt = $window.scrollTop();
  var windowb= (windowt + windowh);

  if (windowt > $('.navbar-holder').offset().top ){
    $('header').addClass('fixed-navbar');
  }
  if (windowt < $('.navbar-holder').offset().top){
    console.log("yay");
    $('header').removeClass('fixed-navbar');
  }

  $.each($animation_elements, function(){
    var $element = $(this);
    var elementh = $element.outerHeight();
    var elementt= $element.offset().top;
    var elementb= (elementt + elementh);

    if((elementb >= windowt) && (elementt<=windowb)){
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });
}


$window.on('scroll', check_if_in_view);

$window.trigger('scroll');

$('.title').addClass('faded');
});
