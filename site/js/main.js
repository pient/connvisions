
if (!Array.indexOf) {
    Array.prototype.indexOf = function (obj) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == obj) {
                return i;
            }
        }
        return -1;
    }
}

/*
 * image zoom plugin
 */
(function ($) {

    $.imageZoom = function (el, options) {
        var opt = $.extend({}, $.imageZoom.defaults, options),
            ele = $(el),
            container = $(opt.container),
            originImage = ele.find('img'),
            originSize = { w: originImage.width(), h: originImage.height() },
            originPosition = originImage.position(),
            maxWidth = container.width(),
            maxHeight = container.height(),
            src = originImage.attr('src');

        ele.hover(
            function (e) {
                if (ele.find('.img_s_zoom').length == 0) {
                    ele.append('<div class="img_s_zoom"><img src="' + src + '" alt="" /></div>');
                }

                ele.css({
                    opacity: 1
                }).find('.img_s_zoom').css({
                    top: originPosition.top,
                    left: originPosition.left
                }).animate({
                    left: Math.min((maxWidth - opt.zoomWidth), Math.max(0, (originPosition.left - (opt.zoomWidth - originSize.w) / 2))),
                    top: Math.min((maxHeight - opt.zoomHeight), Math.max(0, (originPosition.top - (opt.zoomHeight - originSize.h) / 2))),
                    height: opt.zoomHeight,
                    width: opt.zoomWidth
                });
            },
            function (e) {
                ele.css({
                    opacity: 0.4
                }).find('.img_s_zoom').remove();
            }
        );
    };

    $.imageZoom.defaults = {
        zoomWidth: 180,
        zoomHeight: 180,
        container: "#top_photo"
    };

    $.fn.imageZoom = function (options) {
        options = options || {};
        $.each(this, function () {
            new $.imageZoom(this, options);
        });
    };

})(jQuery);

/*
 * tab switch
 */
(function ($) {



    $.tabSwitch = function (el, options) {
        this.opt = $.extend({}, $.tabSwitch.defaults, options);

        var ele = $(el),
            navLine = $('#' + this.opt.navLineID).find('span'),
            clickTargets = ele.find('[data-target]'),
            links = [];

        var opt = this.opt;

        $.each(clickTargets, function (i, item) {
            links.push($(this).attr('data-target'));

            $(item).bind('click', function () {
                if (!$(this).hasClass('active')) {

                    var prevID = clickTargets.filter('.active').attr('data-target');

                    var nextPage = $("#" + $(this).attr('data-target')),
                        prevPage = $("#" + prevID);

                    var nextIndex = i,
                        prevIndex = links.indexOf(prevID),
                        isLeft = nextIndex < prevIndex;

                    clickTargets.removeClass('active');
                    $(this).addClass('active');

                    navLine.animate({ left: opt.navLefts[i] });

                    nextPage.css({ left: isLeft ? "-100%" : "100%" }).show();

                    prevPage.css({ left: isLeft ? "100%" : "-100%" }).hide();

                    nextPage.animate({ left: 0 }, 500);
                }
            });
        });


    };

    $.tabSwitch.defaults = {
        attr: "data-target",
        navLefts: [],
        navLineID: ""
    };

    $.fn.tabSwitch = function (options) {
        options = options || {};
        $.each(this, function () {
            new $.tabSwitch(this, options);
        });
    };

})(jQuery);

var goToMain = function () {
    $('#Home').animate({ top: "-100%" });
    $('#MainPage').show().animate({ top: "0" }, 600, function () {
        //$('.wrapper').width(980);
    });
};

$(function () {
    $('.img_s').imageZoom();

    $('.lang_en a').click(function () {
        goToMain();
    });

    $('.lang_cn a').click(function () {
        location.href = "./index_cn.html"
    });

    $('#pageNav').tabSwitch({
        navLefts: ["10%", "29%", "48%", "67%", "86%"],
        navLineID: "pageNavLine"
    });

    $('#serviceNav').tabSwitch({
        navLefts: ["0", "33.3%", "66.5%"],
        navLineID: "serviceNavLine"
    });
});

var submitCV = function(){
    var _fld_name = $(".job_form input[name=name]");
    var _fld_email = $(".job_form input[name=email]");
    var _fld_message = $(".job_form textarea[name=message]");

    if(!_fld_name.val()){
        alert("Please let us know your name.");
        _fld_name.focus();
        return false;
    }

    if(!_fld_email.val()){
        alert("Please let us know your email.");
        _fld_email.focus();
        return false;
    }

    if(!_fld_message.val()){
        alert("Please send us some message.");
        _fld_message.focus();
        return false;
    }


}

var resetForm = function(){
    $('.job_form')[0].reset();
}