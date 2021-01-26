$(document).ready(function () {


    // sliderInit.init();
});


var sliderInit = {
    mainSlider: '',
    changeActiveClass: function (parentElem, currentClass, elementToAdd) {
        var parrentElementToFind = document.querySelector(parentElem);
        var elementsClass = parrentElementToFind.querySelectorAll(currentClass);
        for (var i = 0; i < elementsClass.length; i++) {
            var currentElement = elementsClass[i];
            currentElement.classList.remove('swiper-slide-active')
        }
        elementToAdd.classList.add('swiper-slide-active')
    },
    // changeActiveClass: function (parentElem, currentClass, elementToAdd) {
    //     var parrentElementToFind = document.querySelector(parentElem);
    //     var elementsClass = parrentElementToFind.querySelectorAll(currentClass);
    //     for (var i = 0; i < elementsClass.length; i++) {
    //         var currentElement = elementsClass[i];
    //         currentElement.classList.remove('active')
    //     }
    //     elementToAdd.classList.add('active')
    // },
    productSmallSlider: null,
    productBigSlider: null,
    sliderInitSmall: function(){
        var self = this;
        this.productSmallSlider = new Swiper('.product__slider-small .swiper-container', {
            speed: 400,
            spaceBetween: 0,
            // loop: true,
            slidesPerView: 'auto',
            // autoplay: {
            //     delay: 5000,
            // },
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            touchRatio: 0,
            on: {
                click: function (e) {
                    // console.log(productBigSlider);
                    self.productBigSlider.slideToLoop(this.clickedIndex, 400, false);
                    self.changeActiveClass('.js__parent-blue', '.swiper-slide', e.target)
                }
            }
        });
    },
    sliderInitBig: function(){
        var self = this;
        this.productBigSlider = new Swiper('.product__slider-big .swiper-container', {
            speed: 400,
            spaceBetween: 5,
            loop: true,
            slidesPerView: 'auto',
            on: {
                slideChange: function () {
                    self.addActiveSlideClass('.js__parent-blue', this.realIndex)
                    // productSmallSlider.slideTo(this.activeIndex, 0, false);
                }
            }


        });

    },
    init: function () {


    },
    addActiveSlideClass:  function (parrentClass, index) {
        var slideElements = document.querySelector(parrentClass);
        var currentSlideElements = slideElements.querySelectorAll('.swiper-slide');
        for (var i = 0; i < currentSlideElements.length; i++) {
            var currentSlideElement = currentSlideElements[i];
            currentSlideElement.classList.remove('active');

        }
        currentSlideElements[index].classList.add('active')

    }
};