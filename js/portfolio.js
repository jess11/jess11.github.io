$(document).ready(function(){

  $('#fullpage').fullpage({
  scrollOverflow: true,
  menu: '#navBar',
  anchors:['home', 'about', 'stack', 'work', 'contact'],
  keyboardScrolling: false,
  scrollOverflowOptions: {
    scrollbars: false,
    mouseWheel: true,
    hideScrollbars: true,
  }

  });

  //Pop up menu on phones
  var menuOn = false;
  $('#menu, .menuList').on('click',function(){
    if( menuOn === false){
      $('.menuList').addClass('display');
      $('.menuList').removeClass('slideOutRight');
      $('.menuList').toggleClass('slideInRight');
      menuOn = true;
    } else{
      $('.menuList').toggleClass('slideInRight');
      $('.menuList').toggleClass('slideOutRight');
      menuOn = false;
    }
  });

  //Highlight clicked nav link
  $('nav li a').on('click',function(){
    $('nav li a').removeClass('selectedNav');
    $(this).toggleClass('selectedNav');
  })

  //ANIMATION
  var $animation_elements = $('.animated');
  var $window = $(window);

  function animate_on_scroll(){

    var windowh = $window.height();
    var windowt = $window.scrollTop();
    var windowb= (windowt + windowh);

    $.each($animation_elements, function(){
      var $element = $(this);
      var elementh = $element.outerHeight();
      var elementt= $element.offset().top;
      var elementb= (elementt + elementh);

      if( (elementt <= windowb)){
        $element.addClass('in-view');
      } else {
        $element.removeClass('in-view');
      }
    });
  }

  $window.on('scroll', animate_on_scroll);

});
