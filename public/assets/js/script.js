!function()
  {"use strict";
    $(".preloader")
    .delay(100)
    .fadeOut(10),
    window.addEventListener("load",function(){
      Lightense(".content img")
    },!1)
    ,$(window).scroll(function(){
      50<=$(window).scrollTop()?$(".header-nav").addClass("header-sticky-top"):$(".header-nav").removeClass("header-sticky-top")
      }),
      $(document).ready(function(){
        var a;a=0,
        window.onscroll=function(){
          var e=document.documentElement.scrollTop||document.body.scrollTop;350<e&&a<=e?(a=e,$(".header-nav").addClass("header-nav-unpinned")):(a=e,$(".header-nav").removeClass("header-nav-unpinned"))
        },
          $('[data-toggle="search"]').on("click",function(){
            $(".search-block").addClass("is-visible")
            ,setTimeout(function(){
              var e=$('[aria-label="search-query"]').val();$('[aria-label="search-query"]').focus().val("").val(e)},250)
            })
            ,$('[data-toggle="search-close"]').on("click",function(){
              $(".search-block").removeClass("is-visible")})
              ,$(".navbar-toggler").on("click",function(){
                $("i").toggleClass("d-inline d-none")
              })
            })
          }();
