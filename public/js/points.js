$(document).ready(function () {
    var initPoints = new PointsColor('.js__point', {
        squareWidth: 10,
        squareHeight: 10
    });
});

(function () {

    function PointsColor(el, options) {
        console.log(this.selectElement(el));
        this.widh = window.innerWidth;
        this.height = window.innerHeight;
        this.el = this.selectElement(el);
        this.elHeight = this.selectElement(el).getBoundingClientRect().height;
        this.elWidth = this.selectElement(el).getBoundingClientRect().width;
        this.defaultOptions = {
            squareWidth: 10,
            squareHeight: 10
        };
        this.counters=function(){
            console.log('asdasd');
        };
        console.log(this.widh, this.height, 'asdsa');
        this.init();
    }



    function optionsSet() {

    }

    PointsColor.prototype = {
        selectElement(el){
            return document.querySelector(el)
        },
        init: function () {
            // this.generatePoints();
            console.log( this.counters);
        },
        generatePoints: function () {
            for (var i = 0; i < arguments.length; i++) {
                var argument = arguments[i];
                
            }
        }
    };
    window.PointsColor = PointsColor;

}());