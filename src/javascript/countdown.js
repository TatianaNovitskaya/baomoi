$ (document).ready (function () {

    var z = setInterval(function() {

        var soquay = Math.floor(Math.random() * (1 - 4000)) + 10000;

        var currentMembersElement = document.querySelector(".currentMembers");
        currentMembersElement.innerHTML = "<p>" + soquay + " người</p>";
    }, 1000);






  //countdown
    Date.prototype.getMonthNameShort = function (lang) {
        lang = lang && (lang in Date.locale) ? lang : 'en';
        return Date.locale[lang].month_names_short[this.getMonth ()];
    };
    Date.locale = {
        en: {
            month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
    };

    var currentDay = new Date ();
    var currentMothWithName = new Date ().getMonthNameShort ();
    var currentDayNumber = currentDay.getDate ();
    var currentFullYear = currentDay.getFullYear ();
    var stringYear = String (currentMothWithName + " " + currentDayNumber + ", " + currentFullYear + " " + "23:59:59");
    var setCurrentDay = new Date (stringYear);
    var countDownDate = setCurrentDay.getTime ();
    var x = setInterval (function () {
        var now = new Date ().getTime ();
        var distance = countDownDate - now;
        // var days = Math.floor (distance / (1000 * 60 * 60 * 24));
        // var hours = Math.floor ((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor ((distance % (1000 * 60 * 30)) / (1000 * 60));
        var seconds = Math.floor ((distance % (1000 * 60)) / 1000);
        generateTemplate (minutes,seconds);

        if (distance < 0) {
            clearInterval (x);
        }
    }, 1000);

    function generateTemplate (minutes,seconds) {
        var result = '';
        var resultObj = {};
        var elementsTimeArray = document.querySelectorAll ('.countdown-item');
        // for (var item in obj) {
        //     if (obj[item] < 10) {
        //         resultObj[item] = '0' + obj[item];
        //     } else {
        //         resultObj[item] = obj[item];
        //     }
        // }
        if (minutes < 10) {
            minutes = '0'+minutes
        }
        if (seconds < 10) {
            seconds = '0'+seconds
        }
        var elementTypeMin = document.querySelector('[data-item-type="minute"]');
        var elementTypeSec = document.querySelector('[data-item-type="seconds"]');
        elementTypeMin.innerHTML = minutes
        elementTypeSec.innerHTML = seconds
    }
});
