$(document).ready(function(){
  $('#menu').on('click',function(){
    $('.menuList').toggleClass('display');
  });


  $('.menuList').on('click',function(){
    $('.menuList').toggleClass('display');
  });

  $('nav li a').on('click',function(){
    $('nav li a').removeClass('selectedNav');
    $(this).toggleClass('selectedNav');
  })


})
