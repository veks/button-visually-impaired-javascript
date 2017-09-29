/*!
 * Button visually impaired v1.0.6
 */
(function($) {
    var method = {
        BviConsoleLog: function (setting, fun, param) {
            if (setting == 1 ) {
                $.each(param, function (id, value) {
                    console.log('console.log.bvi - ' + fun + ' | [' + id + ' - (' + value + ')]');
                });

            } else {
                console.log('Bvi [console.log.bvi - off]');
            }
        },
        Init: function(setting) {
            var selector = $(this).selector;
            var setting = $.extend({
                BviPanel: 1,
                BviPanelActive: 0,
                BviPanelBg: "white",
                BviPanelFontFamily: "default",
                BviPanelFontSize: "12",
                BviPanelLetterSpacing: "normal",
                BviPanelLineHeight: "normal",
                BviPanelImg: 1,
                BviPanelImgXY: 1,
                BviPanelReload: 0,
                BviPanelText: 'Версия для слабовидящих',
                BviPanelCloseText: 'Обычная версия сайта',
                BviCloseClassAndId: '',
                BviFixPanel: 1,
                BviPlay: 0,
                BviFlash: 0,
                BviConsoleLog: 1,
                BviPanelHide: 0
            }, setting);

            console.log('Button visually impaired v1.0.6');

            function BviOn() {

                if (Cookies.get("bvi-panel") == '1') {
                    $('*').each(function () {
                        if (!$(this).attr('data-bvi-original')) $(this).attr('data-bvi-original', $(this).attr('style'));
                    });
                    BviPanel();
                    method.Bvi(setting);
                }
            }

            BviOn();

            function BviPanel() {
                $(selector).addClass('bvi-hide');
                $('.bvi-panel-open-menu').addClass('bvi-hide');
                $(selector).after($('<a href="#" class="bvi-panel-close" title="'+setting.BviPanelCloseText+'"><i class="bvi-glyphicon bvi-glyphicon-eye-close"></i> '+setting.BviPanelCloseText+'</a>'));
                $('.bvi-panel-open-menu').after($('<li class="bvi-panel-close"><a href="#" class="bvi-panel-close" title="'+setting.BviPanelCloseText+'"> '+setting.BviPanelCloseText+'</a></li>'));
                $(setting.BviCloseClassAndId).hide();
                $('body').wrapInner('<div class="bvi-body"></div>');//wrapInner
                $('<div class="bvi-panel"></div>').prependTo("body");
                var scroll = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                if (setting.BviFixPanel == '1') {
                    if (scroll > 99) {
                        $(".bvi-panel").addClass("bvi-panel-fixed");
                    }

                    $(window).scroll(function () {
                        if ($(this).scrollTop() >= 99) {
                            $(".bvi-panel").addClass("bvi-panel-fixed");
                            $(".bvi-panel").css({
                                "left": 0,
                                "top": 0,
                                "right": 0,
                                "margin-left": "auto",
                                "margin-right": "auto",
                                "position": "fixed",
                                "z-index": 999999,
                                "margin-bottom": "20px"
                            });
                            $('.bvi-title').hide();
                            $('#bvi-color-text').hide();
                            $('#bvi-img-text').hide();
                            $('#bvi-size-text').hide();
                            $('#bvi-size-number').hide();
                        } else {
                            $(".bvi-panel").removeClass("bvi-panel-fixed");
                            $(".bvi-panel").removeAttr("style");
                            $('.bvi-title').show();
                            $('#bvi-color-text').show();
                            $('#bvi-img-text').show();
                            $('#bvi-size-text').show();
                            $('#bvi-size-number').show();
                        }
                    });
                }

                $('<div class="bvi-container">'+
                    '<div class="bvi-row">'+
                    '<div class="bvi-panel-menu">'+
                    '<div class="bvi-col-xs-12 bvi-col-sm-12 bvi-col-md-12 bvi-col-lg-12 bvi-bg bvi-animated bvi-slideInDown">'+
                    '<div class="bvi-row">'+
                    '<div class="bvi-col-xs-6 bvi-col-sm-6 bvi-col-md-2 bvi-col-lg-2 bvi-vertical">'+
                    '<div class="bvi-rows">'+
                    '<div class="bvi-title-header">Размер шрифта</div>'+
                    '<div class="bvi-btn-group">'+
                    '<a href="#" id="bvi-font-size-minus" class="bvi-btn bvi-btn-default" title="Уменьшить шрифт"><i class="bvi-glyphicon bvi-glyphicon-font"></i><b>-</b></a>'+
                    '<a href="#" id="bvi-font-size-plus" class="bvi-btn bvi-btn-default" title="Увеличить шрифт"><i class="bvi-glyphicon bvi-glyphicon-font"></i><b>+</b></a>'+
                    '</div>'+
                    '<div class="bvi-title-text"><span id="bvi-size-number"></span> <span id="bvi-size-text"></span></div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="bvi-col-xs-6 bvi-col-sm-6 bvi-col-md-4 bvi-col-lg-3 bvi-vertical">'+
                    '<div class="bvi-rows">'+
                    '<div class="bvi-title-header">Цвета сайта</div>'+
                    '<div class="bvi-btn-group">'+
                    '<a href="#" id="bvi-color-white" class="bvi-btn bvi-btn-white" title="Цвет сайта: Черным по белому"><i class="bvi-glyphicon bvi-glyphicon-font"></i></a>'+
                    '<a href="#" id="bvi-color-black" class="bvi-btn bvi-btn-black" title="Цвет сайта: Белым по черному"><i class="bvi-glyphicon bvi-glyphicon-font"></i></a>'+
                    '<a href="#" id="bvi-color-blue" class="bvi-btn bvi-btn-blue" title="Цвет сайта: Темно-синим по голубому"><i class="bvi-glyphicon bvi-glyphicon-font"></i></a>'+
                    '<a href="#" id="bvi-color-brown" class="bvi-btn bvi-btn-brown" title="Цвет сайта: Коричневым по бежевому"><i class="bvi-glyphicon bvi-glyphicon-font"></i></a>'+
                    '<a href="#" id="bvi-color-green" class="bvi-btn bvi-btn-green" title="Цвет сайта: Зеленым по темно-коричневому"><i class="bvi-glyphicon bvi-glyphicon-font"></i></a>'+
                    '</div>'+
                    '<div class="bvi-title-text"><span id="bvi-color-text"></span></div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="bvi-col-xs-6 bvi-col-sm-6 bvi-col-md-3 bvi-col-lg-3 bvi-vertical">'+
                    '<div class="bvi-rows">'+
                    '<div class="bvi-title-header">Изображения</div>'+
                    '<div class="bvi-btn-group">'+
                    '<a href="#" id="bvi-img-on" class="bvi-btn bvi-btn-default" title="Включить" style="color: green"><i class="bvi-glyphicon bvi-glyphicon-picture"></i></a>'+
                    '<a href="#" id="bvi-img-off" class="bvi-btn bvi-btn-default" title="Выключить" style="color: red"><i class="bvi-glyphicon bvi-glyphicon-picture"></i></a>'+
                    '<a href="#" id="bvi-img-grayscale" class="bvi-btn bvi-btn-default" title="Черно-белые"><i class="bvi-glyphicon bvi-glyphicon-adjust"></i></a>'+
                    '</div>'+
                    '<div class="bvi-title-text"><span id="bvi-img-text"></span></div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="bvi-col-xs-6 bvi-col-sm-6 bvi-col-md-4 bvi-col-lg-4">'+
                    '<div class="bvi-rows">'+
                    '<div class="bvi-title-header">Дополнительно</div>'+
                    '<div class="bvi-btn-group">'+
                    //'<div class="bvi-btn-toolbar">'+
                    '<a href="#" id="bvi-voice-off" class="bvi-btn bvi-btn-default" title="Синтез речи"><i class="bvi-glyphicon bvi-glyphicon-volume-off"></i></a>'+
                    '<a href="#" id="bvi-voice-on" class="bvi-btn bvi-btn-default" title="Синтез речи"><i class="bvi-glyphicon bvi-glyphicon-volume-up"></i></a>'+
                    ///'</div>'+
                    '<a href="#" id="bvi-settings" class="bvi-btn bvi-btn-default" title="Настройки"><i class="bvi-glyphicon bvi-glyphicon-cog"></i> Настройки</a>'+
                    '<a href="#" id="bvi-close" class="bvi-btn bvi-btn-default" title="Обычная версия сайта"><i class="bvi-glyphicon bvi-glyphicon-eye-close"></i></a>'+
                    '<a href="#" id="bvi-panel-hide" class="bvi-btn bvi-btn-default" title="Свернуть панель для слабовидящих"><i class="bvi-glyphicon bvi-glyphicon-arrow-up"></i></a>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="bvi-row">'+
                    '<div class="bvi-col-xs-12 bvi-col-sm-12 bvi-col-md-12 bvi-col-lg-12">'+
                    '<div class="bvi-settings">'+
                    '<hr>'+
                    '<div class="bvi-col-xs-12 bvi-col-sm-12 bvi-col-md-12 bvi-col-lg-4">'+
                    '<div class="bvi-rows">'+
                    '<div class="bvi-title-header">Кернинг</div>'+
                    '<div class="bvi-btn-group">'+
                    '<a href="#" id="bvi-letter-spacing-normal" class="bvi-btn bvi-btn-default" title="Стандартный">Стандартный</a>'+
                    '<a href="#" id="bvi-letter-spacing-average" class="bvi-btn bvi-btn-default" title="Средний">Средний</a>'+
                    '<a href="#" id="bvi-letter-spacing-big" class="bvi-btn bvi-btn-default" title="Большой">Большой</a>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="bvi-col-xs-12 bvi-col-sm-12 bvi-col-md-12 bvi-col-lg-4">'+
                    '<div class="bvi-rows">'+
                    '<div class="bvi-title-header">Интервал</div>'+
                    '<div class="bvi-btn-group">'+
                    '<a href="#" id="bvi-line-height-normal" class="bvi-btn bvi-btn-default" title="Одинарный">Одинарный</a>'+
                    '<a href="#" id="bvi-line-height-average" class="bvi-btn bvi-btn-default" title="Полуторный">Полуторный</a>'+
                    '<a href="#" id="bvi-line-height-big" class="bvi-btn bvi-btn-default" title="Двойной">Двойной</a>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="bvi-col-xs-12 bvi-col-sm-12 bvi-col-md-12 bvi-col-lg-4">'+
                    '<div class="bvi-rows">'+
                    '<div class="bvi-title-header">Гарнитура</div>'+
                    '<div class="bvi-btn-group">'+
                    '<a href="#" id="bvi-font-family-default" class="bvi-btn bvi-btn-default" title="Без засечек">Без засечек</a>'+
                    //'<a href="#" id="bvi-font-family-arial" class="bvi-btn bvi-btn-default" title="Без засечек">Без засечек</a>'+
                    '<a href="#" id="bvi-font-family-times-new-roman" class="bvi-btn bvi-btn-default" title="С засечками">С засечками</a>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="bvi-col-xs-12 bvi-col-sm-12 bvi-col-md-12 bvi-col-lg-12">'+
                    '<div class="bvi-rows">'+
                    '<div class="bvi-btn-toolbar bvi-left">'+
                    '<a href="#" id="bvi-flash-on" class="bvi-btn bvi-btn-default" title="Включить Фрейм"><i class="bvi-glyphicon bvi-glyphicon-flash"></i> Включить Фрейм</a>'+
                    '<a href="#" id="bvi-flash-off" class="bvi-btn bvi-btn-default" title="Отключить Фрейм"><i class="bvi-glyphicon bvi-glyphicon-flash"></i> Выключить Фрейм</a>'+
                    '<a href="#" id="bvi-settings-default" class="bvi-btn bvi-btn-default" title="Вернуть стандартные настройки"><i class="bvi-glyphicon bvi-glyphicon-refresh"></i> Вернуть стандартные настройки</a>'+
                    '<a href="#" id="bvi-close" class="bvi-btn bvi-btn-default" title="Обычная версия сайта"><i class="bvi-glyphicon bvi-glyphicon-eye-close"></i> Обычная версия сайта</a>'+
                    '</div>'+
                    '<div class="bvi-btn-toolbar bvi-right">'+
                    '<a href="#" id="bvi-settings-close" class="bvi-btn bvi-btn-default" title="Закрыть"><i class="bvi-glyphicon bvi-glyphicon-remove"></i> Закрыть</a>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="bvi-col-xs-12 bvi-col-sm-12 bvi-col-md-12 bvi-col-lg-12">'+
                    '<div class="bvi-rows">'+
                    '<div class="bvi-copy"><a href="http://bvi.isvek.ru/" target="_blank" title="isvek.ru Версия для слабовидящих">isvek.ru Версия для слабовидящих</a><sup>v1.0.6</sup></div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="bvi-panel-show"><a href="#" id="bvi-panel-show" class="bvi-btn-panel-show" title="Показать панель для слабовидящих"><i class="bvi-glyphicon bvi-glyphicon-eye"></i></a></div>'+
                    '</div>'+
                    '</div>').appendTo(".bvi-panel");
            }

            if (setting.BviPanelActive == 0 ) {
                $('.bvi-panel-open-menu,'+selector).click( function () {
                    Cookies.set("bvi-selector", selector, {
                        path: "/"
                    });
                    Cookies.set("bvi-panel", setting.BviPanel, {
                        path: "/"
                    });
                    Cookies.set("bvi-bgcolor", setting.BviPanelBg, {
                        path: "/"
                    });
                    Cookies.set("bvi-font-size", setting.BviPanelFontSize, {
                        path: "/"
                    });
                    Cookies.set("bvi-letter-spacing", setting.BviPanelLetterSpacing, {
                        path: "/"
                    });
                    Cookies.set("bvi-line-height", setting.BviPanelLineHeight, {
                        path: "/"
                    });
                    Cookies.set("bvi-font-family", setting.BviPanelFontFamily, {
                        path: "/"
                    });
                    Cookies.set("bvi-img", setting.BviPanelImg, {
                        path: "/"
                    });
                    Cookies.set("bvi-reload", setting.BviPanelReload, {
                        path: "/"
                    });
                    Cookies.set("bvi-img-XY", setting.BviPanelImgXY, {
                        path: "/"
                    });
                    Cookies.set("bvi-reload", setting.BviPanelReload, {
                        path: "/"
                    });
                    Cookies.set("bvi-voice", setting.BviPlay, {
                        path: "/"
                    });
                    Cookies.set("bvi-flash", setting.BviFlash, {
                        path: "/"
                    });
                    Cookies.set("bvi-console-log", setting.BviConsoleLog, {
                        path: "/"
                    });
                    Cookies.set("bvi-panel-hide", setting.BviPanelHide, {
                        path: "/"
                    });
                    if (Cookies.get("bvi-voice") == '1') {
                        responsiveVoice.speak("Версия сайта для слабовидящих", "Russian Female");
                    }
                    BviOn();
                    return false;
                });
            }
        },
        Bvi: function (setting) {
            function BviBgColor() {
                if (Cookies.get("bvi-bgcolor") == 'white') {
                    $('.bvi-body').addClass('bvi-color-white');
                    $('.bvi-btn-white').addClass('active');
                    BviReturnSet({
                        backgroundcolor: "#ffffff",
                        color: "#000000"
                    });
                    $('#bvi-color-text').html('Черным по белому');
                } else {
                    $('.bvi-body').removeClass('bvi-color-white');
                    $('.bvi-btn-white').removeClass('active');
                }

                if (Cookies.get("bvi-bgcolor") == 'black') {
                    $('.bvi-body').addClass('bvi-color-black');
                    $('.bvi-btn-black').addClass('active');
                    BviReturnSet({
                        backgroundcolor: "#000000",
                        color: "#ffffff"
                    });
                    $('#bvi-color-text').html('Белым по черному');
                } else {
                    $('.bvi-body').removeClass('bvi-color-black');
                    $('.bvi-btn-black').removeClass('active');
                }

                if (Cookies.get("bvi-bgcolor") == 'blue') {
                    $('.bvi-body').addClass('bvi-color-blue');
                    $('.bvi-btn-blue').addClass('active');
                    BviReturnSet({
                        backgroundcolor: "#9DD1FF",
                        color: "#063462"
                    });
                    $('#bvi-color-text').html('Темно-синим по голубому');
                } else {
                    $('.bvi-body').removeClass('bvi-color-blue');
                    $('.bvi-btn-blue').removeClass('active');
                }

                if (Cookies.get("bvi-bgcolor") == 'brown') {
                    $('.bvi-body').addClass('bvi-color-brown');
                    $('.bvi-btn-brown').addClass('active');
                    BviReturnSet({
                        backgroundcolor: "#f7f3d6",
                        color: "#4d4b43"
                    });
                    $('#bvi-color-text').html('Коричневым по бежевому');
                } else {
                    $('.bvi-body').removeClass('bvi-color-brown');
                    $('.bvi-btn-brown').removeClass('active');
                }

                if (Cookies.get("bvi-bgcolor") == 'green') {
                    $('.bvi-body').addClass('bvi-color-green');
                    $('.bvi-btn-green').addClass('active');
                    BviReturnSet({
                        backgroundcolor: "#3B2716",
                        color: "#A9E44D"
                    });
                    $('#bvi-color-text').html('Зеленым по темно-коричневому');
                } else {
                    $('.bvi-body').removeClass('bvi-color-green');
                    $('.bvi-btn-green').removeClass('active');
                }
            }

            function BviPanelHide() {
                if (Cookies.get("bvi-panel-hide") == '1') {
                    $('.bvi-panel-menu').hide();//slideToggle("slow");
                    $('#bvi-panel-hide').show();
                    $('#bvi-panel-show').show();
                } else {
                    $('.bvi-panel-menu').show();
                    $('#bvi-panel-show').hide();
                }

            }
            function BviFontSize() {
                size = Cookies.get("bvi-font-size");
                if (size <= 100){
                    BviReturnSet({
                        fontsize: size
                    });
                }
            }

            function BviLetterSpacing() {
                if (Cookies.get("bvi-letter-spacing") === "normal") {
                    $("#bvi-letter-spacing-normal").addClass("active");
                    BviReturnSet({
                        letterspacing: "0px"
                    })
                } else {
                    $("#bvi-letter-spacing-normal").removeClass("active")
                }
                if (Cookies.get("bvi-letter-spacing") === "average") {
                    $("#bvi-letter-spacing-average").addClass("active");
                    BviReturnSet({
                        letterspacing: "2px"
                    })
                } else {
                    $("#bvi-letter-spacing-average").removeClass("active")
                }
                if (Cookies.get("bvi-letter-spacing") === "big") {
                    $("#bvi-letter-spacing-big").addClass("active");
                    BviReturnSet({
                        letterspacing: "4px"
                    })
                } else {
                    $("#bvi-letter-spacing-big").removeClass("active")
                }
            }

            function BviLineHeight() {
                if (Cookies.get("bvi-line-height") === "normal") {
                    $("#bvi-line-height-normal").addClass("active");
                    BviReturnSet({
                        lineheight: "1.5"
                    })
                } else {
                    $("#bvi-line-height-normal").removeClass("active")
                }
                if (Cookies.get("bvi-line-height") === "average") {
                    $("#bvi-line-height-average").addClass("active");
                    BviReturnSet({
                        lineheight: "2"
                    })
                } else {
                    $("#bvi-line-height-average").removeClass("active")
                }
                if (Cookies.get("bvi-line-height") === "big") {
                    $("#bvi-line-height-big").addClass("active");
                    BviReturnSet({
                        lineheight: "2.5"
                    })
                } else {
                    $("#bvi-line-height-big").removeClass("active")
                }
            }

            function BviFontFamily() {
                if (Cookies.get("bvi-font-family") == "arial") {
                    $("#bvi-font-family-arial").addClass("active");
                    BviReturnSet({
                        fontfamily: "Arial, sans-serif"
                    })
                } else {
                    $("#bvi-font-family-arial").removeClass("active")
                }
                if (Cookies.get("bvi-font-family") == "times") {
                    $("#bvi-font-family-times-new-roman").addClass("active");
                    BviReturnSet({
                        fontfamily: 'Times New roman'
                    })
                } else {
                    $("#bvi-font-family-times-new-roman").removeClass("active")
                }
                if (Cookies.get("bvi-font-family") == "default") {
                    $("#bvi-font-family-default").addClass("active");
                    BviReturnSet({
                        fontfamily: ''
                    })
                } else {
                    $("#bvi-font-family-default").removeClass("active")
                }
            }

            function BviFlash() {
                if (Cookies.get("bvi-flash") == 1) {
                    $('#bvi-flash-off').show();
                    $('#bvi-flash-on').hide();
                    $('iframe,video').show();
                } else {
                    $('#bvi-flash-on').show();
                    $('#bvi-flash-off').hide();
                    $('iframe,video').hide();
                }
            }

            function BviReturnSet(setting) {
                $("body, body *").not(".bvi-panel, .bvi-panel *, .fa, .glyphicon, .dashicons, .bvi-glyphicon").each(function () {
                    $(this).css({
                        "font-family": setting.fontfamily,
                        "background-color": setting.backgroundcolor,
                        "background-image": "none",
                        "color": setting.color,
                        "font-size": setting.fontsize + 'pt',
                        "box-shadow": "none",
                        "text-shadow": "none",
                        "letter-spacing": setting.letterspacing,
                        "border-color": setting.color,
                        "line-height": setting.lineheight
                    });
                });
                $("body").css({
                    "margin": "0px",
                    "padding": "0px"
                });

                var numbers = String(setting.fontsize);
                var numbers = numbers.charAt(numbers.length-1);
                var numbers = parseInt(numbers, 10);

                if (numbers == 1) {
                    var _numbers = 'пункт';
                } else if ((numbers > 1) && (numbers < 5)) {
                    var _numbers = 'пункта';
                } else {
                    var _numbers = 'пунктов';
                }

                $('#bvi-size-number').text(setting.fontsize);
                $('#bvi-size-text').text(_numbers);

            }
            
            function BviImg() {
                if (Cookies.get("bvi-img") == '1') {

                    $("#bvi-img-on").addClass('active');
                    $("#bvi-img-grayscale").removeClass('active');
                    $("#bvi-img-off").removeClass('active');

                    $(".bvi-img-grayscale").remove();
                    $(".bvi-img-off").remove();
                    $(".bvi-img-on").remove();

                    $("img").each(function() {
                        $(".bvi-img-grayscale").remove();
                        $(".bvi-img-off").remove();
                        $(this).show();
                    });
                    $('#bvi-img-text').html('Включены');
                } else if (Cookies.get("bvi-img") == '0') {

                    $("#bvi-img-off").addClass('active');
                    $("#bvi-img-grayscale").removeClass('active');
                    $("#bvi-img-on").removeClass('active');

                    $(".bvi-img-on").remove();
                    $(".bvi-img-off").remove();
                    $(".bvi-img-grayscale").remove();

                    $("img").each(function() {
                        var alt = this.alt || 'Нет описания к изображению';
                        var imgClass = $(this).attr("class") || '';
                        var imgId = $(this).attr("id") || 'bvi-img-off';
                        $(this).hide();
                        if (Cookies.get("bvi-img-XY") == '1') {
                            $(this).after($('<div class="bvi-img-off '+imgClass+'" id="'+imgId+'" style="width: ' + $(this).width() + "px; height: " + $(this).height() + 'px">').html(alt))
                        } else {
                            $(this).after($('<div class="bvi-img-off">').text(alt))
                        }
                    });
                    $('#bvi-img-text').html('Выключены');
                } else if (Cookies.get("bvi-img") == 'grayScale') {

                    $("#bvi-img-grayscale").addClass('active');
                    $("#bvi-img-off").removeClass('active');
                    $("#bvi-img-on").removeClass('active');

                    $(".bvi-img-on").remove();
                    $(".bvi-img-off").remove();
                    $(".bvi-img-grayscale").remove();

                    $("img").each(function() {
                        var alt = this.alt || 'Нет описания к изображению';
                        var src = this.src;
                        var imgClass = $(this).attr("class") || 'bvi-class';
                        var imgId = $(this).attr("id") || 'bvi-img-off';

                        $(this).hide();
                        $(this).after($('<img src="'+src+'" alt="'+alt+'" id="bvi-img-grayscale '+imgId+'" class="bvi-img-grayscale '+imgClass+'">'));
                    });

                    $('#bvi-img-text').html('Черно-белые');
                } else {
                    $("img").each(function() {
                        $(".bvi-img-grayscale").remove();
                        $(".bvi-img-off").remove();
                        $(this).show();
                    });
                }
            }

            function BviVoice() {
                if (Cookies.get("bvi-voice") === '1') {
                    $('#bvi-voice-on').hide();
                    $('#bvi-voice-off').show();
                    function getSelectionText() {
                        var text = "";
                        if (window.getSelection) {
                            text = window.getSelection().toString();
                        } else if (document.selection && document.selection.type != "Control") {
                            text = document.selection.createRange().text;
                        }
                        return text;
                    }
                    /*
                    $(document).mouseup(function () {
                        setTimeout(function () {
                            responsiveVoice.cancel();
                            responsiveVoice.speak(getSelectionText(), "Russian Female");
                        }, 1);
                        return false;
                    });
                    */
                } else {
                    responsiveVoice.cancel();
                    $('#bvi-voice-on').show();
                    $('#bvi-voice-off').hide();
                }
            }

            $("#bvi-close, .bvi-panel-close").click(function() {
                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Обычная версия сайта", "Russian Female");
                }

                $('.bvi-animated').removeClass('bvi-slideInDown').addClass('bvi-fadeOutUp');

                $('*').each(function(){
                    $(this).removeAttr("style",'font-family');
                    $(this).removeAttr("style",'background-color');
                    $(this).removeAttr("style",'background-image');
                    $(this).removeAttr("style",'color');
                    $(this).removeAttr("style",'font-size');
                    $(this).removeAttr("style",'box-shadow');
                    $(this).removeAttr("style",'text-shadow');
                    $(this).removeAttr("style",'letter-spacing');
                    $(this).removeAttr("style",'border-color');
                    $(this).attr("style",$(this).attr('data-bvi-original'));
                    $(this).removeAttr('data-bvi-original');
                });

                $(setting.BviCloseClassAndId).show();
                $('.bvi-panel-open-menu').removeClass('bvi-hide');
                $(Cookies.get("bvi-selector")).removeClass('bvi-hide');
                $(".bvi-panel, .bvi-panel-close").remove();
                $(".bvi-img-off").remove();
                $(".bvi-img-grayscale").remove();
                $('body > .bvi-body').contents().unwrap();

                if (Cookies.get("bvi-reload") == "1") {
                    document.location.reload(true);
                }

                Cookies.remove("bvi-selector", {
                    path: "/"
                });

                Cookies.remove("bvi-panel", {
                    path: "/"
                });

                Cookies.remove("bvi-bgcolor", {
                    path: "/"
                });

                Cookies.remove("bvi-font-size", {
                    path: "/"
                });

                Cookies.remove("bvi-letter-spacing", {
                    path: "/"
                });

                Cookies.remove("bvi-line-height", {
                    path: "/"
                });

                Cookies.remove("bvi-font-family", {
                    path: "/"
                });

                Cookies.remove("bvi-img", {
                    path: "/"
                });

                Cookies.remove("bvi-img-XY", {
                    path: "/"
                });

                Cookies.remove("bvi-reload", {
                    path: "/"
                });

                Cookies.remove("bvi-voice", {
                    path: "/"
                });

                Cookies.remove("bvi-flash", {
                    path: "/"
                });

                Cookies.remove("bvi-panel-hide", {
                    path: "/"
                });
                BviBgColor();
                BviFontSize();
                BviLetterSpacing();
                BviLineHeight();
                BviFontFamily();
                BviImg();
                BviVoice();
                BviFlash();
                BviPanelHide();
                responsiveVoice.cancel();
                $('iframe,video').show();
                return false;
            });

            $("#bvi-flash-on").click(function() {
                Cookies.set("bvi-flash", "1", {
                    path: "/"
                });
                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Включить фрейм", "Russian Female");
                }
                BviFlash();
                return false;
            });

            $("#bvi-flash-off").click(function() {
                Cookies.set("bvi-flash", "0", {
                    path: "/"
                });
                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Выключить фрейм", "Russian Female");
                }
                BviFlash();
                return false;
            });

            $("#bvi-letter-spacing-normal").click(function() {
                Cookies.set("bvi-letter-spacing", "normal", {
                    path: "/"
                });
                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Кернинг: Стандартный", "Russian Female");
                }
                BviLetterSpacing();
                return false;
            });

            $("#bvi-letter-spacing-average").click(function() {
                Cookies.set("bvi-letter-spacing", "average", {
                    path: "/"
                });
                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Кернинг: Средний", "Russian Female");
                }
                BviLetterSpacing();
                return false;
            });

            $("#bvi-letter-spacing-big").click(function() {
                Cookies.set("bvi-letter-spacing", "big", {
                    path: "/"
                });
                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Кернинг: Большой", "Russian Female");
                }
                BviLetterSpacing();
                return false;
            });

            $("#bvi-font-size-minus").click(function() {
                size = parseFloat(Cookies.get("bvi-font-size")) - 1;
                $(this).addClass('active');
                $('#bvi-font-size-plus').removeClass('active');

                if (size >= 0) {
                    Cookies.set("bvi-font-size", size, {
                        path: "/"
                    });

                    BviFontSize();
                    var numbers = String(size);
                    var numbers = numbers.charAt(numbers.length-1);
                    var numbers = parseInt(numbers, 10);

                    if (numbers == 1) {
                        var _numbers = 'пункт';
                    } else if ((numbers > 1) && (numbers < 5)) {
                        var _numbers = 'пункта';
                    } else {
                        var _numbers = 'пунктов';
                    }

                    method.BviConsoleLog(setting.BviConsoleLog, "click", {"bvi-font-size[]":"Размер шрифта: "+ size +" "+ _numbers});
                    if (Cookies.get("bvi-voice") == '1') {
                        responsiveVoice.speak("Размер шрифта: " + size +" "+ _numbers, "Russian Female");
                    }
                }
                return false;
            });

            $("#bvi-font-size-plus").click(function() {
                $(this).addClass('active');
                $('#bvi-font-size-minus').removeClass('active');
                size = parseFloat(Cookies.get("bvi-font-size")) + 1;

                if (size <= 50) {
                    Cookies.set("bvi-font-size", size, {
                        path: "/"
                    });

                    BviFontSize();
                    var numbers = String(size);
                    var numbers = numbers.charAt(numbers.length-1);
                    var numbers = parseInt(numbers, 10);

                    if (numbers == 1) {
                        var _numbers = 'пункт';
                    } else if ((numbers > 1) && (numbers < 5)) {
                        var _numbers = 'пункта';
                    } else {
                        var _numbers = 'пунктов';
                    }

                    method.BviConsoleLog(setting.BviConsoleLog, "click", {"bvi-font-size[]":"Размер шрифта: "+ size +" "+ _numbers});
                    if (Cookies.get("bvi-voice") == '1') {
                        responsiveVoice.speak("Размер шрифта: " + size +" "+ _numbers, "Russian Female");
                    }
                }
                return false;
            });

            $("#bvi-voice-on").click(function() {
                Cookies.set("bvi-voice", "1", {
                    path: "/"
                });
                method.BviConsoleLog(setting.BviConsoleLog, 'click', {'bvi-voice[1]':'Синтез речи включён'});
                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Синтез речи включён", "Russian Female");
                }
                BviVoice();
                return false;
            });

            $("#bvi-voice-off").click(function() {
                Cookies.set("bvi-voice", "0", {
                    path: "/"
                });
                method.BviConsoleLog(setting.BviConsoleLog, 'click', {'bvi-voice[0]':'Синтез речи выключен'});
                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Синтез речи выключен", "Russian Female");
                }
                BviVoice();
                return false;
            });

            $("#bvi-color-white").click(function() {
                Cookies.set("bvi-bgcolor", "white", {
                    path: "/"
                });
                method.BviConsoleLog(setting.BviConsoleLog, 'click', {'bvi-bgcolor[white]':'Цвет сайта: Черным по белому'});
                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Цвет сайта: Черным по белому", "Russian Female");
                }
                BviBgColor();
                return false;
            });

            $("#bvi-color-black").click(function() {
                Cookies.set("bvi-bgcolor", "black", {
                    path: "/"
                });
                method.BviConsoleLog(setting.BviConsoleLog, 'click', {'bvi-bgcolor[black]':'Цвет сайта: Белым по черному'});
                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Цвет сайта: Белым по черному", "Russian Female");
                }
                BviBgColor();
                return false;
            });

            $("#bvi-color-blue").click(function() {
                Cookies.set("bvi-bgcolor", "blue", {
                    path: "/"
                });
                method.BviConsoleLog(setting.BviConsoleLog, 'click', {'bvi-bgcolor[blue]':'Цвет сайта: Темно-синим по голубому'});
                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Цвет сайта: Темно-синим по голубому", "Russian Female");
                }
                BviBgColor();
                return false;
            });

            $("#bvi-color-brown").click(function() {
                Cookies.set("bvi-bgcolor", "brown", {
                    path: "/"
                });
                method.BviConsoleLog(setting.BviConsoleLog, 'click', {'bvi-bgcolor[brown]':'Цвет сайта: Коричневым по бежевому'});
                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Цвет сайта: Коричневым по бежевому", "Russian Female");
                }
                BviBgColor();
                return false;
            });

            $("#bvi-color-green").click(function() {
                Cookies.set("bvi-bgcolor", "green", {
                    path: "/"
                });
                method.BviConsoleLog(setting.BviConsoleLog, 'click', {'bvi-bgcolor[green]':'Цвет сайта: Зеленым по темно-коричневому'});
                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Цвет сайта: Зеленым по темно-коричневому", "Russian Female");
                }
                BviBgColor();
                return false;
            });

            $("#bvi-img-on").click(function() {
                Cookies.set("bvi-img", "1", {
                    path: "/"
                });
                method.BviConsoleLog(setting.BviConsoleLog, 'click', {'bvi-img[1]':'Изображения включены'});
                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Изображения включены", "Russian Female");
                }
                BviImg();
                return false;
            });

            $("#bvi-img-off").click(function() {
                Cookies.set("bvi-img", "0", {
                    path: "/"
                });
                method.BviConsoleLog(setting.BviConsoleLog, 'click', {'bvi-img[0]':'Изображения выключены'});
                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Изображения выключены", "Russian Female");
                }
                BviImg();
                return false;
            });

            $("#bvi-img-grayscale").click(function() {
                Cookies.set("bvi-img", "grayScale", {
                    path: "/"
                });
                method.BviConsoleLog(setting.BviConsoleLog, 'click', {'bvi-img[grayScale]':'Изображения черно-белые'});
                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Изображения черно-белые", "Russian Female");
                }
                BviImg();
                return false;
            });

            $("#bvi-settings, #bvi-settings-close").click(function() {
                $(".bvi-settings").slideToggle("slow");
                $("#bvi-settings").toggleClass('active');
                return false;
            });

            $("#bvi-line-height-normal").click(function() {
                Cookies.set("bvi-line-height", "normal", {
                    path: "/"
                });
                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Интервал: Одинарный", "Russian Female");
                }
                BviLineHeight();
                return false;
            });

            $("#bvi-line-height-average").click(function() {
                Cookies.set("bvi-line-height", "average", {
                    path: "/"
                });
                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Интервал: Полуторный", "Russian Female");
                }
                BviLineHeight();
                return false;
            });

            $("#bvi-line-height-big").click(function() {
                Cookies.set("bvi-line-height", "big", {
                    path: "/"
                });
                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Интервал: Двойной", "Russian Female");
                }
                BviLineHeight();
                return false;
            });

            $("#bvi-font-family-arial").click(function() {
                Cookies.set("bvi-font-family", "arial", {
                    path: "/"
                });
                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Гарнитура: Без засечек", "Russian Female");
                }
                BviFontFamily();
                return false;
            });

            $("#bvi-font-family-times-new-roman").click(function() {
                Cookies.set("bvi-font-family", "times", {
                    path: "/"
                });
                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Гарнитура: С засечками", "Russian Female");
                }
                BviFontFamily();
                return false;
            });

            $("#bvi-font-family-default").click(function() {
                Cookies.set("bvi-font-family", "default", {
                    path: "/"
                });
                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Гарнитура: Без засечек", "Russian Female");
                }
                BviFontFamily();
                return false;
            });

            $('#bvi-panel-hide').click(function () {
                Cookies.set("bvi-panel-hide", "1", {
                    path: "/"
                });
                BviPanelHide();
                return false;
            });

            $('#bvi-panel-show').click(function () {
                Cookies.set("bvi-panel-hide", "0", {
                    path: "/"
                });
                BviPanelHide();
                return false;
            });

            $("#bvi-settings-default").click(function() {
                Cookies.set("bvi-panel", setting.BviPanel, {
                    path: "/"
                });

                Cookies.set("bvi-bgcolor", setting.BviPanelBg, {
                    path: "/"
                });

                Cookies.set("bvi-font-size", setting.BviPanelFontSize, {
                    path: "/"
                });

                Cookies.set("bvi-letter-spacing", setting.BviPanelLetterSpacing, {
                    path: "/"
                });

                Cookies.set("bvi-line-height", setting.BviPanelLineHeight, {
                    path: "/"
                });
                Cookies.set("bvi-font-family", setting.BviPanelFontFamily, {
                    path: "/"
                });

                Cookies.set("bvi-img", setting.BviPanelImg, {
                    path: "/"
                });

                Cookies.set("bvi-reload", setting.BviPanelReload, {
                    path: "/"
                });

                Cookies.set("bvi-img-XY", setting.BviPanelImgXY, {
                    path: "/"
                });

                Cookies.set("bvi-voice", setting.BviPlay, {
                    path: "/"
                });

                Cookies.set("bvi-flash", setting.BviFlash, {
                    path: "/"
                });

                Cookies.set("bvi-console-log)", setting.BviConsoleLog, {
                    path: "/"
                });

                Cookies.set("bvi-panel-hide)", setting.BviPanelHide, {
                    path: "/"
                });

                if (Cookies.get("bvi-voice") == '1') {
                    responsiveVoice.speak("Стандартные настройки", "Russian Female");
                }
                BviBgColor();
                BviFontSize();
                BviLetterSpacing();
                BviLineHeight();
                BviFontFamily();
                BviImg();
                BviVoice();
                BviFlash();
                BviPanelHide();
                return false;
            });

            BviBgColor();
            BviFontSize();
            BviLetterSpacing();
            BviLineHeight();
            BviFontFamily();
            BviImg();
            BviVoice();
            BviFlash();
            BviPanelHide();
        },
        Active: function (setting) {
            var selector = $(this).selector;
            var setting = $.extend({
                BviPanel: 1,
                BviPanelActive: 0,
                BviPanelBg: "white",
                BviPanelFontFamily: "default",
                BviPanelFontSize: "12",
                BviPanelLetterSpacing: "normal",
                BviPanelLineHeight: "normal",
                BviPanelImg: 1,
                BviPanelImgXY: 1,
                BviPanelReload: 0,
                BviPanelText: 'Версия для слабовидящих',
                BviPanelCloseText: 'Обычная версия сайта',
                BviCloseClassAndId: '',
                BviFixPanel: 1,
                BviPlay: 0,
                BviFlash: 0,
                BviConsoleLog: 1,
                BviPanelHide: 0
            }, setting);

            Cookies.set("bvi-selector", selector, {
                path: "/"
            });
            Cookies.set("bvi-panel", setting.BviPanel, {
                path: "/"
            });
            Cookies.set("bvi-bgcolor", setting.BviPanelBg, {
                path: "/"
            });
            Cookies.set("bvi-font-size", setting.BviPanelFontSize, {
                path: "/"
            });
            Cookies.set("bvi-letter-spacing", setting.BviPanelLetterSpacing, {
                path: "/"
            });
            Cookies.set("bvi-line-height", setting.BviPanelLineHeight, {
                path: "/"
            });
            Cookies.set("bvi-font-family", setting.BviPanelFontFamily, {
                path: "/"
            });
            Cookies.set("bvi-img", setting.BviPanelImg, {
                path: "/"
            });
            Cookies.set("bvi-reload", setting.BviPanelReload, {
                path: "/"
            });
            Cookies.set("bvi-img-XY", setting.BviPanelImgXY, {
                path: "/"
            });
            Cookies.set("bvi-reload", setting.BviPanelReload, {
                path: "/"
            });
            Cookies.set("bvi-voice", setting.BviPlay, {
                path: "/"
            });
            Cookies.set("bvi-flash", setting.BviFlash, {
                path: "/"
            });
            Cookies.set("bvi-flash", setting.BviConsoleLog, {
                path: "/"
            });
            Cookies.set("bvi-panel-hide", setting.BviPanelHide, {
                path: "/"
            });
            method.Init(setting);
            $('#bvi-close,.bvi-panel-open').hide();
        }
    };

    $.fn.bvi = function(setting) {
        if (method[setting]) {
            return method[setting].apply(this, Array.prototype.slice.call(arguments, 1))
        } else {
            if (typeof setting === "object" || !setting) {
                return method.init.apply(this, arguments)
            } else {
                b.error("Метод с именем " + c + " не существует для jQuery.bvi")
            }
        }
    }
})(jQuery);