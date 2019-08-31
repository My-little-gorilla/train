(function() {
var buttonLeft = document.querySelector(".slaider__button--left");
var buttonRight = document.querySelector(".slaider__button--right");
var slides = document.querySelectorAll(".slaider__item");
var slider = document.querySelector(".slaider__list");
var rect = slider.getBoundingClientRect();
var f = 0;


 var startPosition = function () {
   for (var i = 0; i < slides.length; i++) {
     slides[i].style.transform = 'translateX(' + (i + '00') + '%' + ')';
   }
 }()


var slideTranslate = function(singh) {
  slider.style.transform += 'translateX(' + singh + rect.width + 'px' + ')';
}


buttonRight.addEventListener('click', function() {
  slideTranslate('-');
  f++;
  if (f >= slides.length) {
    f = 0;
    slider.style.transform = 'translateX(0)';
  }

});

buttonLeft.addEventListener('click', function() {
  slideTranslate('');
  f--;
  if (f < 0) {
    f = 0;
    slider.style.transform = 'translateX(0)';
  }

});
})()
