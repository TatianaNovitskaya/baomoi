$(document).ready(function () {

    imagesObjects.init()

});

var imagesObjects = {
    green: {
        thumb:[
            {
                img: 'images/Phone/Green/1.png',
                type: 'img'
            },
            {
                img: 'images/Phone/Green/2.png',
                type: 'img'
            },
            {
                img: 'images/Phone/Green/3.png',
                type: 'img'
            },
            {
                img: 'images/Phone/Green/4.png',
                type: 'img'
            },
            {
                img: 'images/Phone/Green/5.png',
                type: 'img'
            },
            {
                img: 'images/video-img.png',
                type: 'img'
            }
        ],
        big:[
            {
                img: 'images/Phone/Green/1.png',
                type: 'img'
            },
            {
                img: 'images/Phone/Green/2.png',
                type: 'img'
            },
            {
                img: 'images/Phone/Green/3.png',
                type: 'img'
            },
            {
                img: 'images/Phone/Green/4.png',
                type: 'img'
            },
            {
                img: 'images/Phone/Green/5.png',
                type: 'img'
            },
            {
                src: 'https://www.youtube.com/embed/sbQZ0Mrpp80',
                type: 'video'
            }
        ]
    },
    black: {
        thumb:[
            {
                img: 'images/Phone/Black/1.png',
                type: 'img'
            },
            {
                img: 'images/Phone/Black/2.png',
                type: 'img'
            },
            {
                img: 'images/Phone/Black/3.png',
                type: 'img'
            },
            {
                img: 'images/Phone/Black/4.png',
                type: 'img'
            },
            {
                img: 'images/Phone/Black/5.png',
                type: 'img'
            },
            {
                img: 'images/video-img.png',
                type: 'img'
            }
        ],
        big:[
            {
                img: 'images/Phone/Black/1.png',
                type: 'img'
            },
            {
                img: 'images/Phone/Black/2.png',
                type: 'img'
            },
            {
                img: 'images/Phone/Black/3.png',
                type: 'img'
            },
            {
                img: 'images/Phone/Black/4.png',
                type: 'img'
            },
            {
                img: 'images/Phone/Black/5.png',
                type: 'img'
            },
            {
                src: 'https://www.youtube.com/embed/sbQZ0Mrpp80',
                type: 'video'
            }
        ]
    },
    white: {
        thumb:[
            {
                img: 'images/Phone/White/1.png',
                type: 'img'
            },
            {
                img: 'images/Phone/White/2.png',
                type: 'img'
            },
            {
                img: 'images/Phone/White/3.png',
                type: 'img'
            },
            {
                img: 'images/Phone/White/4.png',
                type: 'img'
            },
            {
                img: 'images/Phone/White/5.png',
                type: 'img'
            },
            {
                img: 'images/video-img.png',
                type: 'img'
            }
        ],
        big:[
            {
                img: 'images/Phone/White/1.png',
                type: 'img'
            },
            {
                img: 'images/Phone/White/2.png',
                type: 'img'
            },
            {
                img: 'images/Phone/White/3.png',
                type: 'img'
            },
            {
                img: 'images/Phone/White/4.png',
                type: 'img'
            },
            {
                img: 'images/Phone/White/5.png',
                type: 'img'
            },
            {
                src: 'https://www.youtube.com/embed/sbQZ0Mrpp80',
                type: 'video'
            }
        ]
    },
    smallSliderWrapperEl: document.querySelector('.js__smallSliderWrapper'),
    bigSliderWrapperEl: document.querySelector('.js__bigSliderWrapper'),
    chooseElements: document.querySelectorAll('.js__choice'),
    init: function () {
        this.createImg('black');
        this.changeSlider()
    },
    createImg: function (currentValue) {
        var self = this;
        var currentArray = this[currentValue];
        this.smallSliderWrapperEl.innerHTML = '';
        this.bigSliderWrapperEl.innerHTML = '';

        currentArray.thumb.forEach(function (item) {
            self.createSmallSlider(item);
            sliderInit.sliderInitSmall();
        });

        currentArray.big.forEach(function (item) {
            self.createBigSlider(item,currentValue);
            sliderInit.sliderInitBig();
        });

    },
    createSmallSlider: function (item) {
        var createSliderItem = document.createElement('div');
        createSliderItem.classList.add('swiper-slide');

        if (this.checkType(item['type'])) {
            createSliderItem.style.backgroundImage = 'url(' + item['img'] + ')';
        }
        this.smallSliderWrapperEl.appendChild(createSliderItem);
         // console.log(  this.smallSliderWrapperEl );
    },
    createBigSlider: function (item,currentValue) {

        var createSliderItem = document.createElement('div');
        createSliderItem.classList.add('swiper-slide');

        var createLinkItem = document.createElement('a');
        createLinkItem.setAttribute('data-fancybox',"product-"+currentValue);
        if (this.checkType(item['type'])) {
            createLinkItem.style.backgroundImage = 'url(' + item['img'] + ')';
            createLinkItem.setAttribute('href',item['img']);
        }else{
            createLinkItem.setAttribute('href',item['src']);
            createLinkItem.appendChild(this.createVideoFrame(item['src']));
        }
        createSliderItem.appendChild(createLinkItem);
        this.bigSliderWrapperEl.appendChild(createSliderItem);
    },
    createVideoFrame: function(currentUrl){

        var createVideoItem = document.createElement('iframe');
        createVideoItem.setAttribute('allowfullscreen','allowfullscreen');
        createVideoItem.setAttribute('frameborder','0');
        createVideoItem.setAttribute('src', currentUrl);
        return createVideoItem
    },
    checkType: function (type) {
        if (type === 'img') {
            return true
        } else {
            return false
        }
    },

    changeSlider: function () {
        var self = this;
        this.chooseElements.forEach( function (item) {
          item.addEventListener('change', function () {
                var currentValue = this.value;
                self.createImg(currentValue)
            })
        })
    }
};