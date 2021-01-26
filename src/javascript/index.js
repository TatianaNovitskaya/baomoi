
$ (document).ready (function () {
    var topMenu = $ (".header__menu"),
        topMenuHeight = $ ('.header').outerHeight (),
        menuItems = $('.js__scroll__to');

    menuItems.on ('click',function (e) {
        e.preventDefault ();

        var $this = $ (this);
        var dataHref = $this.attr ("data-header");
        var offsetTop = $ ('.' + dataHref).offset ().top;
        $ ('html, body').stop ().animate ({

            scrollTop: offsetTop
        }, 900);

    });


});

