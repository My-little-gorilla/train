var button = document.querySelector('.header__button');
var buttonPic = document.querySelector('.header__button-svg');
var firstList = document.querySelector('.header__navigation-list');
var closedCross = document.querySelector('.header__button-svg__cross')
console.log(closedCross);
button.addEventListener('click', function() {
  if (firstList.classList.contains('header__navigation-list--closed')) {
    firstList.classList.remove('header__navigation-list--closed');
    buttonPic.classList.remove('header__button-svg--closed');
    closedCross.classList.remove('header__button-svg__cross--opened');
  } else {
    firstList.classList.add('header__navigation-list--closed');
    buttonPic.classList.add('header__button-svg--closed');
    closedCross.classList.add('header__button-svg__cross--opened');

  }
})
