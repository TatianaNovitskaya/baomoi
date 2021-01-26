window.addEventListener('DOMContentLoaded', function () {
    // anime({
    //     targets: '.drum__wrap',
    //     translateX: {
    //         value: 1000,
    //         duration: 800
    //     },
    //     delay: 250 // All properties except 'scale' inherit 250ms delay
    // });
    setTimeout(function () {
        animateDrum.init()
    }, 100)

});


var animateDrum = {
    objectAppend: [
        {
            value: 20,
            color: 'yellow'
        },
        {
            value: 60,
            color: 'green'
        },
        {
            value: 50,
            color: 'blue'
        },
        {
            value: 70,
            color: 'green'
        },
        {
            value: 30,
            color: 'yellow'
        },
        {
            value: 80,
            color: 'green'
        },
        {
            value: 40,
            color: 'blue'
        },
        {
            value: 20,
            color: 'yellow'
        },
        {
            value: 60,
            color: 'green'
        },
        {
            value: 50,
            color: 'blue'
        },
        {
            value: 30,
            color: 'yellow'
        },
        {
            value: 80,
            color: 'green'
        },
        {
            value: 40,
            color: 'blue'
        }
    ],
    parentElement: document.querySelector('.drum__wrap'),
    parentElementSize: document.querySelector('.drum__wrap').getBoundingClientRect(),
    widthOneElement: null,
    speedChange: 3000,
    timeFraction: null,
    allWidth: null,
    currentState: false,
    sectionElementsToHide: document.querySelectorAll('.js__sectionHide'),
    buttonStartAnimate: document.querySelector('.js__playDrum'),
    parentContentLeft: document.querySelector('.drum__content').getBoundingClientRect().left,
    animateEnd: function () {
        localStorage.setItem('animateShowed', 'true');
        this.showText();
        // console.log('end');
        this.toggleSectionHide(false);
        var offsetTop = $ ('.product').offset ().top;

        $ ('html, body').stop ().animate ({
            scrollTop: offsetTop
        }, 900);
    },
    showText: function () {
        var currentElement = document.querySelector('.js__title-percent');
        currentElement.classList.add('show')
    },
    init: function () {
        this.createElemtns();
        if (localStorage.getItem('animateShowed') !== 'true') {
            this.toggleSectionHide(true)
        } else {
            this.showText();
            this.toggleSectionHide(false)
        }
        this.clickStartAnimate();
    },
    createElemtns: function (item) {
        var self = this;
        this.objectAppend.forEach(function (item) {
            var divEl = document.createElement('div');
            var pEl = document.createElement('p');
            divEl.className = 'sale__item border_neon-' + item.color;

            pEl.innerHTML = item.value + '%';
            divEl.appendChild(pEl);
            self.parentElement.appendChild(divEl);
            self.widthOneElement = Math.ceil(divEl.getBoundingClientRect().width);
            item['el'] = divEl;
            var style = window.getComputedStyle(divEl);
            var marginLeft = style.getPropertyValue('margin-left');
            var sumMargin = parseInt(marginLeft);
            self.allWidth += self.widthOneElement + sumMargin;
        });

        self.allWidth -= Math.abs(this.parentContentLeft)*3;

        if(localStorage.getItem('animateShowed') === 'true'){
            self.findCurrentPersent(70);
        }
        // console.log(self.allWidth - this.parentElementSize.width);
    },
    findCurrentPersent: function (num) {
        var self = this;
        return this.objectAppend.forEach(function (item) {
            if (item.value === num) {
                self.currentState = true;
            }else{
                item['el'].classList.add('opacity-03')
            }
        })
    },
    translateWrapper: function (percent) {
        var self = this;
        this.parentElement.style.transform = 'translate3d(-' + percent + 'px,0,0)';
        // setTimeout(function () {
        //     self.stopAnimate()
        // }, 3000)
    },
    stopAnimate: function () {
        this.timeFraction = 1
    },
    quad: function (timeFraction) {
        return timeFraction
    },
    animateValue: function (start, end, duration) {
        var range = end - start;
        // no timer shorter than 50ms (not really visible any way)
        // var minTimer = 50;
        // calc step time to show all interediate values
        var stepTime = Math.abs(Math.floor(duration / range));
        var value = 0;
        // never go below minTimer
        // stepTime = Math.max(stepTime, minTimer);

        // get current time and calculate desired end time
        var startTime = new Date().getTime();
        var endTime = startTime + duration;
        var timer;

        function run() {
            var now = new Date().getTime();
            var remaining = Math.max((endTime - now) / duration, 0);
            value = Math.round(end - (remaining * range));
            if (value == end) {
                clearInterval(timer);
            }
            return value
        }

        timer = setInterval(run, stepTime);
    },
    animate: function (timing) {
        var self = this;
        var start = performance.now();
        var counter = 0;

        requestAnimationFrame(function animate(time) {
            self.timeFraction = (time - start) / self.speedChange;
            if (self.timeFraction > 1) self.timeFraction = 1;
            // вычисление текущего состояния анимации
            var progress = timing(self.timeFraction);
            // var translateX = progress * self.speedChange;

            if (progress < 0.2) {
                counter += 50;
            } else if (progress > 0.2 && progress < 0.8) {
                counter += 30;
            } else {
                counter += 10;
                self.findCurrentPersent(70);
            }

            if (self.currentState) {
                counter = 0;
                self.translateWrapper(counter);
                self.animateEnd();
                self.timeFraction = 1;
            }
            if (counter >= self.allWidth - self.parentElementSize.width) {
                counter = 0;
            }

            if (self.timeFraction < 1) {
                self.translateWrapper(counter);
                requestAnimationFrame(animate);
            }

        });
    },
    closeElements: function () {
        var counter = 0;
        var countRepeat = Math.round(this.objectAppend.length + (window.innerWidth / this.widthOneElement));
        console.log(this.objectAppend.length);
        console.log(window.innerWidth, this.widthOneElement);
        console.log(countRepeat);
        // for (var i = 0; i < countRepeat; i++) {
        //     counter++;
        //     if(countRepeat >= this.objectAppend.length ){
        //         counter = 0
        //     }
        //     // var currentElement = this.objectAppend[counter];
        //     console.log(counter);
        //     // this.createElemtns(currentElement)
        // }
    },
    toggleSectionHide: function (state) {
        this.sectionElementsToHide.forEach(function (item) {
            if (state) {
                item.style.display = 'none'
                item.classList.add('display-none')
            } else {
                item.style.display = ''
                item.classList.remove('display-none')
            }
        })
    },
    clickStartAnimate: function () {
        var self = this;
        this.buttonStartAnimate.addEventListener('click', function (e) {
            e.preventDefault();
            if (localStorage.getItem('animateShowed') !== 'true') {
                self.animate(self.quad)
            } else {

            }
        })

    }
};



