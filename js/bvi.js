/*!
 * Button visually impaired v1.0.3
 */
(function($) {
    var method = {
        Init: function(setting) {
            console.log(bvi.ver);
            var selector = $(this).selector;
            var setting = $.extend({
                BviPanel: 1,
                BviPanelBg: "white",
                BviPanelFontFamily: "arial",
                BviPanelFontSize: "18",
                BviPanelLetterSpacing: "normal",
                BviPanelLineHeight: "normal",
                BviPanelImg: 1,
                BviPanelImgXY: 1,
                BviPanelReload: 0,
                BviPanelTemplateButtonDefault: null,
                BviPanelText: 'Версия для слабовидящих',
                BviPanelCloseText: "Обычная версия сайта",
                BviCloseClassAndId: '',
                BviFixPanel: 1,
                BviPlay: 1
            }, setting);
            if (Cookies.get("bvi-panel") == "1") {
                $(setting.BviCloseClassAndId).hide();
                $('*').each(function(){
                    if (!$(this).attr('data-bvi-original'))
                        $(this).attr('data-bvi-original',$(this).attr('style'));
                    $('svg').hide();
                });
                $('object').hide();
                method.Panel(setting.BviCloseClassAndId,setting.BviFixPanel);
                method.Link(setting);
                $(selector).hide();
                $('.bvi-panel-open-menu').hide();
                $('.bvi-panel-open-menu').after($('<li id="'+$('.bvi-panel-open-menu').attr("id")+'"class="bvi-panel-close-"><a href="#" id="bvi-panel-close" title="'+setting.BviPanelCloseText+'">'+setting.BviPanelCloseText+'</a></li>'));
                $(selector).after($('<div class="bvi-panel-close-"><a href="#" id="bvi-panel-close" title="'+setting.BviPanelCloseText+'"><span class="bvi-eye"></span> '+setting.BviPanelCloseText+'</a></div>'));
                method.BviPanelBgColor();
                method.BviPanelImg();
                method.BviPanelFontSize();
                method.BviPanelLetterSpacing();
                method.BviPanelLineHeight();
                method.BviPanelFontFamily();
                method.BviEyeColor();
                //if(Cookies.get("bvi-panel-play") == '1') {
                    method.BviPlayIcon();
                //}
            } else {
                $(".bvi-panel-close-,.eye-disabled,#bvi-panel-close, .bvi-panel-close").remove();
                $(selector).show();
                $('object').show();
                $(setting.BviCloseClassAndId).show();
            }
            $(selector+',.bvi-panel-open-menu').click(function() {
                $(setting.BviCloseClassAndId).hide();
                $('*').each(function(){
                    if (!$(this).attr('data-bvi-original'))$(this).attr('data-bvi-original',$(this).attr('style'));
                    $('svg').hide();
                });
                $('object').hide();
                Cookies.set("bvi-panel", setting.BviPanel, {
                    path: "/"
                });
                Cookies.set("bvi-panel-bg", setting.BviPanelBg, {
                    path: "/"
                });
                Cookies.set("bvi-panel-font-family", setting.BviPanelFontFamily, {
                    path: "/"
                });
                Cookies.set("bvi-panel-font-size", setting.BviPanelFontSize, {
                    path: "/"
                });
                Cookies.set("bvi-panel-letter-spacing", setting.BviPanelLetterSpacing, {
                    path: "/"
                });
                Cookies.set("bvi-panel-line-height", setting.BviPanelLineHeight, {
                    path: "/"
                });
                Cookies.set("bvi-panel-img", setting.BviPanelImg, {
                    path: "/"
                });
                Cookies.set("bvi-panel-img-X-Y", setting.BviPanelImgXY, {
                    path: "/"
                });
                Cookies.set("bvi-panel-reload", setting.BviPanelReload, {
                    path: "/"
                });
                Cookies.set("bvi-panel-play", setting.BviPlay, {
                    path: "/"
                });
                if(Cookies.get("bvi-panel-play") == '1') {
                    method.BviPlay();
                }
                method.Panel(setting.BviCloseClassAndId,setting.BviFixPanel);
                method.Link(setting);
                $(selector).hide();
                $('.bvi-panel-open-menu').hide();
                $('.bvi-panel-open-menu').after($('<li id="'+$('.bvi-panel-open-menu').attr("id")+'"class="bvi-panel-close-"><a href="#" id="bvi-panel-close" title="'+setting.BviPanelCloseText+'">'+setting.BviPanelCloseText+'</a></li>'));
                $(selector).after($('<div class="bvi-panel-close-"><a href="#" id="bvi-panel-close" title="'+setting.BviPanelCloseText+'"><span class="bvi-eye"></span> '+setting.BviPanelCloseText+'</a></div>'));
                method.BviPanelBgColor();
                method.BviPanelImg();
                method.BviPanelFontSize();
                method.BviPanelLetterSpacing();
                method.BviPanelLineHeight();
                method.BviPanelFontFamily();
                method.BviEyeColor();
                //if(Cookies.get("bvi-panel-play") == '1') {
                    method.BviPlayIcon();
                //}
                $('#bvi-panel-close, .bvi-panel-close').click(function(){
                    Cookies.set("bvi-panel", "0", {
                        path: "/"
                    });
                    $(".bvi-panel-close-,.eye-disabled,#bvi-panel-close, .bvi-panel-close").remove();
                    $(".bvi-panel-menu").remove();
                    $(".bvi-panel-img-not").remove();
                    $(".bvi-grayscale").remove();
                    $('*').each(function(){
                        $('svg').show();
                    });
                    $('object').show();
                    method.Panel(setting.BviCloseClassAndId,setting.BviFixPanel);
                    method.BviEyeColor();
                    return false;
                });
                return false;
            });
            $('#bvi-panel-close, .bvi-panel-close').click(function(){
                Cookies.set("bvi-panel", "0", {
                    path: "/"
                });
                $(".bvi-panel-close-,.eye-disabled,#bvi-panel-close, .bvi-panel-close").remove();
                $(".bvi-panel-menu").remove();
                $(".bvi-panel-img-not").remove();
                $(".bvi-grayscale").remove();
                $('*').each(function(){
                    $('svg').show();
                });
                method.Panel(setting.BviCloseClassAndId,setting.BviFixPanel);
                method.BviEyeColor();
                return false;
            });
        },
        BviMobile: function () {
            return $.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
        },
        BviEyeColor: function() {
            if(Cookies.get('bvi-panel-bg') == 'white'){
                $('.bvi-eye').addClass('eye-disabled-black');
            } else {
                $('.bvi-eye').removeClass('eye-disabled-black');
                $('.bvi-color').removeClass('eye-disabled-black');
            }
            if(Cookies.get('bvi-panel-bg') == 'black'){
                $('.bvi-eye').addClass('eye-disabled-white');
            } else {
                $('.bvi-eye').removeClass('eye-disabled-white');
                $('.bvi-color').removeClass('eye-disabled-white');
            }
            if(Cookies.get('bvi-panel-bg') == 'blue'){
                $('.bvi-eye').addClass('eye-disabled-blue');
            } else {
                $('.bvi-eye').removeClass('eye-disabled-blue');
                $('.bvi-color').removeClass('eye-disabled-blue');
            }
            if(Cookies.get('bvi-panel-bg') == 'brown'){
                $('.bvi-eye').addClass('eye-disabled-brown');
            } else {
                $('.bvi-eye').removeClass('eye-disabled-brown');
                $('.bvi-color').removeClass('eye-disabled-brown');
            }
            if(Cookies.get('bvi-panel-bg') == 'green'){
                $('.bvi-eye').addClass('eye-disabled-green');
            } else {
                $('.bvi-eye').removeClass('eye-disabled-green');
                $('.bvi-color').removeClass('eye-disabled-green');
            }
        },
        BviPanelFontFamily: function() {
            if (Cookies.get("bvi-panel-font-family") == "arial") {
                $("#bvi-panel-font-family-arial").addClass("active");
                method.ReturnSet({
                    fontfamily: "Arial, sans-serif"
                })
            } else {
                $("#bvi-panel-font-family-arial").removeClass("active")
            }
            if (Cookies.get("bvi-panel-font-family") == "times") {
                $("#bvi-panel-font-family-times-new-roman").addClass("active");
                method.ReturnSet({
                    fontfamily: '"Times New roman", serif'
                })
            } else {
                $("#bvi-panel-font-family-times-new-roman").removeClass("active")
            }
        },
        BviPanelLetterSpacing: function() {
            if (Cookies.get("bvi-panel-letter-spacing") === "normal") {
                $("#bvi-panel-letter-spacing-normal").addClass("active");
                method.ReturnSet({
                    letterspacing: "0px"
                })
            } else {
                $("#bvi-panel-letter-spacing-normal").removeClass("active")
            }
            if (Cookies.get("bvi-panel-letter-spacing") === "average") {
                $("#bvi-panel-letter-spacing-average").addClass("active");
                method.ReturnSet({
                    letterspacing: "2px"
                })
            } else {
                $("#bvi-panel-letter-spacing-average").removeClass("active")
            }
            if (Cookies.get("bvi-panel-letter-spacing") === "big") {
                $("#bvi-panel-letter-spacing-big").addClass("active");
                method.ReturnSet({
                    letterspacing: "5px"
                })
            } else {
                $("#bvi-panel-letter-spacing-big").removeClass("active")
            }
        },
        BviPanelLineHeight: function() {
            if (Cookies.get("bvi-panel-line-height") === "normal") {
                $("#bvi-panel-line-height-normal").addClass("active");
                method.ReturnSet({
                    lineheight: "normal"
                })
            } else {
                $("#bvi-panel-line-height-normal").removeClass("active")
            }
            if (Cookies.get("bvi-panel-line-height") === "average") {
                $("#bvi-panel-line-height-average").addClass("active");
                method.ReturnSet({
                    lineheight: "2"
                })
            } else {
                $("#bvi-panel-line-height-average").removeClass("active")
            }
            if (Cookies.get("bvi-panel-line-height") === "big") {
                $("#bvi-panel-line-height-big").addClass("active");
                method.ReturnSet({
                    lineheight: "3"
                })
            } else {
                $("#bvi-panel-line-height-big").removeClass("active")
            }
        },
        BviPanelFontSize: function() {
            if (Cookies.get("bvi-panel-font-size") == "14") {
                $("#bvi-panel-font-size-14").addClass("active");
                method.ReturnSet({
                    fontsize: "14px"
                });
            } else {
                $("#bvi-panel-font-size-14").removeClass("active")
            }
            if (Cookies.get("bvi-panel-font-size") == "16") {
                $("#bvi-panel-font-size-16").addClass("active");
                method.ReturnSet({
                    fontsize: "16px"
                })
            } else {
                $("#bvi-panel-font-size-16").removeClass("active")
            }
            if (Cookies.get("bvi-panel-font-size") == "18") {
                $("#bvi-panel-font-size-18").addClass("active");
                method.ReturnSet({
                    fontsize: "18px"
                })
            } else {
                $("#bvi-panel-font-size-18").removeClass("active")
            }
            if (Cookies.get("bvi-panel-font-size") == "20") {
                $("#bvi-panel-font-size-20").addClass("active");
                method.ReturnSet({
                    fontsize: "20px"
                })
            } else {
                $("#bvi-panel-font-size-20").removeClass("active")
            }
            if (Cookies.get("bvi-panel-font-size") == "23") {
                $("#bvi-panel-font-size-23").addClass("active");
                method.ReturnSet({
                    fontsize: "23px"
                })
            } else {
                $("#bvi-panel-font-size-23").removeClass("active")
            }
        },
        BviPanelBgColor: function() {
            if (Cookies.get("bvi-panel-bg") == "white") {
                $("#bvi-panel-bg-white").addClass("active");
                method.ReturnSet({
                    backgroundcolor: "#ffffff",
                    color: "#000000"
                });
            } else {
                $("#bvi-panel-bg-white").removeClass("active");
            }
            if (Cookies.get("bvi-panel-bg") == "black") {
                $("#bvi-panel-bg-black").addClass("active");
                method.ReturnSet({
                    backgroundcolor: "#000000",
                    color: "#ffffff"
                });
            } else {
                $("#bvi-panel-bg-black").removeClass("active");
            }
            if (Cookies.get("bvi-panel-bg") == "blue") {
                $("#bvi-panel-bg-blue").addClass("active");
                method.ReturnSet({
                    backgroundcolor: "#9DD1FF",
                    color: "#063462"
                });
            } else {
                $("#bvi-panel-bg-blue").removeClass("active");
            }
            if (Cookies.get("bvi-panel-bg") == "brown") {
                $("#bvi-panel-bg-brown").addClass("active");
                method.ReturnSet({
                    backgroundcolor: "#f7f3d6",
                    color: "#4d4b43"
                });
            } else {
                $("#bvi-panel-bg-brown").removeClass("active");
            }
            if (Cookies.get("bvi-panel-bg") == "green") {
                $("#bvi-panel-bg-green").addClass("active");
                method.ReturnSet({
                    backgroundcolor: "#3B2716",
                    color: "#A9E44D"
                });
            } else {
                $("#bvi-panel-bg-green").removeClass("active");
            }
        },
        BviPanelImg: function() {
            $(".bvi-panel-img-not").remove();
            if (Cookies.get("bvi-panel-img") == 1) {
                $("img").each(function() {
                    $(".bvi-grayscale").remove();
                    $(".bvi-panel-img-not").remove();
                    $(this).show();
                });
                $("#bvi-panel-img-grayScale").removeClass('active');
                $("#bvi-panel-img-off").removeClass('active');
                $("#bvi-panel-img-on").addClass('active');
                $(".bvi-grayscale").remove();
                $(".bvi-panel-img-not").remove();
            } else {
                $(".bvi-grayscale").remove();
                if (Cookies.get("bvi-panel-img") == 'grayScale') {
                    $("img").each(function() {
                        var alt = this.alt || "нет описания к изображению";
                        var src = this.src;
                        var imgClass = $(this).attr("class") || 'bvi-class';
                        var imgId = $(this).attr("id") || 'bvi-panel-img-not';
                        $(this).hide();
                        $(this).after($('<img src="'+src+'" alt="'+alt+'" id="'+imgId+'" class="bvi-grayscale '+imgClass+'">'));
                        $(".bvi-grayscale").css({
                            filter:'progid:DXImageTransform.Microsoft.BasicImage(grayScale=1)',
                            MsFilter:'progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)'
                        });
                    });
                    $("#bvi-panel-img-grayScale").addClass('active');
                    $("#bvi-panel-img-off").removeClass('active');
                    $("#bvi-panel-img-on").removeClass('active');
                    $('.coin-slider').show();
                    //
                } else {
                    $(".bvi-grayscale").remove();
                    $("img").each(function() {
                        var alt = this.alt || "нет описания к изображению";
                        var imgClass = $(this).attr("class") || 'bvi-class';
                        var imgId = $(this).attr("id") || 'bvi-panel-img-not';
                        $(this).hide();
                        if (Cookies.get("bvi-panel-img-X-Y") == 1) {
                            $(this).after($('<div class="bvi-panel-img-not '+imgClass+'" id="'+imgId+'" style="width: ' + $(this).width() + "px; height: " + $(this).height() + 'px">').html("Изображение : " + alt))
                        } else {
                            $(this).after($('<div class="bvi-panel-img-not">').text("Изображение : " + alt))
                        }
                    });
                    $("#bvi-panel-img-grayScale").removeClass('active');
                    $("#bvi-panel-img-off").addClass('active');
                    $("#bvi-panel-img-on").removeClass('active');
                }
            }
        },
        BviPlay : function () {
            if(Cookies.get("bvi-panel-play") == '1') {
                responsiveVoice.speak("Версия сайта для слабовидящих", "Russian Female");
            } else {
                responsiveVoice.speak("Обычная версия сайта", "Russian Female");
            }
        },
        BviPlayIcon : function () {
            if(Cookies.get("bvi-panel-play") == '1') {
                $('#bvi-panel-play-on').addClass('bvi-panel-menu-hidden');
                $('#bvi-panel-play-off').removeClass('bvi-panel-menu-hidden');
            } else {
                $('#bvi-panel-play-off').addClass('bvi-panel-menu-hidden');
                $('#bvi-panel-play-on').removeClass('bvi-panel-menu-hidden');
            }
        },
        Link: function(setting) {
            /*
            $("#bvi-panel-close, .bvi-panel-close").click(function() {
                Cookies.set("bvi-panel", "0", {
                    path: "/"
                });
                $(".bvi-panel").remove();
                $("#bvi-panel-close, .bvi-panel-close").remove();
                $(".bvi-panel-img-not").remove();
                console.log('3');
                //$("*").each(function() {
                //    $(this).removeAttr("style");
                //    $(this).attr("style",$(this).attr('data-bvi-original'));
                //});
                method.Panel();
                return false;
            });
            */
            $("#bvi-panel-play-on").click(function() {
                Cookies.set("bvi-panel-play", "1", {
                    path: "/"
                });
                if (Cookies.get("bvi-panel-play") == '1') {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Синтез речи включен", "Russian Female");
                    }
                }
                method.BviPlayIcon();
                return false;
            });
            $("#bvi-panel-play-off").click(function() {
                Cookies.set("bvi-panel-play", "0", {
                    path: "/"
                });
                if (Cookies.get("bvi-panel-play") == '0') {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Синтез речи выключен", "Russian Female");
                    }
                }
                method.BviPlayIcon();
                return false;
            });
            $("#bvi-panel-img-on").click(function() {
                Cookies.set("bvi-panel-img", "1", {
                    path: "/"
                });
                if(Cookies.get("bvi-panel-play") == 1 ) {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Изображения включены", "Russian Female");
                    }
                }
                method.BviPanelImg();
                return false;
            });
            $("#bvi-panel-img-off").click(function() {
                Cookies.set("bvi-panel-img", "0", {
                    path: "/"
                });
                if(Cookies.get("bvi-panel-play") == 1 ) {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Изображения выключены ", "Russian Female");
                    }
                }
                method.BviPanelImg();
                return false;
            });
            $("#bvi-panel-img-grayScale").click(function() {
                Cookies.set("bvi-panel-img", "grayScale", {
                    path: "/"
                });
                if(Cookies.get("bvi-panel-play") == 1 ) {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Изображения черно-белые", "Russian Female");
                    }
                }
                method.BviPanelImg();
                return false;
            });
            $("#bvi-panel-bg-white").click(function() {
                Cookies.set("bvi-panel-bg", "white", {
                    path: "/"
                });
                if(Cookies.get("bvi-panel-play") == 1 ) {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Цвет сайта: Черным по белому", "Russian Female");
                    }
                }
                method.BviPanelBgColor();
                return false;
            });
            $("#bvi-panel-bg-black").click(function() {
                Cookies.set("bvi-panel-bg", "black", {
                    path: "/"
                });
                if(Cookies.get("bvi-panel-play") == 1 ) {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Цвет сайта: Белым по черному", "Russian Female");
                    }
                }
                method.BviPanelBgColor();
                return false;
            });
            $("#bvi-panel-bg-blue").click(function() {
                Cookies.set("bvi-panel-bg", "blue", {
                    path: "/"
                });
                if(Cookies.get("bvi-panel-play") == 1 ) {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Цвет сайта: Темно-синим по голубому", "Russian Female");
                    }
                }
                method.BviPanelBgColor();
                return false;
            });
            $("#bvi-panel-bg-brown").click(function() {
                Cookies.set("bvi-panel-bg", "brown", {
                    path: "/"
                });
                if(Cookies.get("bvi-panel-play") == 1 ) {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Цвет сайта: Коричневым по бежевому", "Russian Female");
                    }
                }
                method.BviPanelBgColor();
                return false;
            });
            $("#bvi-panel-bg-green").click(function() {
                Cookies.set("bvi-panel-bg", "green", {
                    path: "/"
                });
                if(Cookies.get("bvi-panel-play") == 1 ) {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Цвет сайта: Зеленым по темно-коричневому", "Russian Female");
                    }
                }
                method.BviPanelBgColor();
                return false;
            });
            $("#bvi-panel-font-size-14").click(function() {
                Cookies.set("bvi-panel-font-size", "14", {
                    path: "/"
                });
                if(Cookies.get("bvi-panel-play") == 1 ) {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Размер шрифта 14 пикселей", "Russian Female");
                    }
                }
                method.BviPanelFontSize();
                return false;
            });
            $("#bvi-panel-font-size-16").click(function() {
                Cookies.set("bvi-panel-font-size", "16", {
                    path: "/"
                });
                if(Cookies.get("bvi-panel-play") == 1 ) {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Размер шрифта 16 пикселей", "Russian Female");
                    }
                }
                method.BviPanelFontSize();
                return false;
            });
            $("#bvi-panel-font-size-18").click(function() {
                Cookies.set("bvi-panel-font-size", "18", {
                    path: "/"
                });
                if(Cookies.get("bvi-panel-play") == 1 ) {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Размер шрифта 18 пикселей", "Russian Female");
                    }
                }
                method.BviPanelFontSize();
                return false;
            });
            $("#bvi-panel-font-size-20").click(function() {
                Cookies.set("bvi-panel-font-size", "20", {
                    path: "/"
                });
                if(Cookies.get("bvi-panel-play") == 1 ) {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Размер шрифта 20 пикселей", "Russian Female");
                    }
                }
                method.BviPanelFontSize();
                return false;
            });
            $("#bvi-panel-font-size-23").click(function() {
                Cookies.set("bvi-panel-font-size", "23", {
                    path: "/"
                });
                if(Cookies.get("bvi-panel-play") == 1 ) {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Размер шрифта 23 пикселя", "Russian Female");
                    }
                }
                method.BviPanelFontSize();
                return false;
            });
            $("#bvi-panel-settings,.bvi-panel-settings-close").click(function() {
                $(".bvi-panel-settings").slideToggle("slow");
                $('#bvi-panel-settings').toggleClass('active');
                return false;
            });
            $("#bvi-panel-font-family-arial").click(function() {
                Cookies.set("bvi-panel-font-family", "arial", {
                    path: "/"
                });
                if(Cookies.get("bvi-panel-play") == 1 ) {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Гарнитура без засечек", "Russian Female");
                    }
                }
                method.BviPanelFontFamily();
                return false;
            });
            $("#bvi-panel-font-family-times-new-roman").click(function() {
                Cookies.set("bvi-panel-font-family", "times", {
                    path: "/"
                });
                if(Cookies.get("bvi-panel-play") == 1 ) {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Гарнитура с засечками", "Russian Female");
                    }
                }
                method.BviPanelFontFamily();
                return false;
            });
            $("#bvi-panel-letter-spacing-normal").click(function() {
                Cookies.set("bvi-panel-letter-spacing", "normal", {
                    path: "/"
                });
                if(Cookies.get("bvi-panel-play") == 1 ) {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Кернинг стандартный", "Russian Female");
                    }
                }
                method.BviPanelLetterSpacing();
                return false;
            });
            $("#bvi-panel-letter-spacing-average").click(function() {
                Cookies.set("bvi-panel-letter-spacing", "average", {
                    path: "/"
                });
                if(Cookies.get("bvi-panel-play") == 1 ) {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Кернинг средний", "Russian Female");
                    }
                }
                method.BviPanelLetterSpacing();
                return false;
            });
            $("#bvi-panel-letter-spacing-big").click(function() {
                Cookies.set("bvi-panel-letter-spacing", "big", {
                    path: "/"
                });
                if(Cookies.get("bvi-panel-play") == 1 ) {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Кернинг большой", "Russian Female");
                    }
                }
                method.BviPanelLetterSpacing();
                return false;
            });
            $("#bvi-panel-line-height-normal").click(function() {
                Cookies.set("bvi-panel-line-height", "normal", {
                    path: "/"
                });
                if(Cookies.get("bvi-panel-play") == 1 ) {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Интервал стандартный", "Russian Female");
                    }
                }
                method.BviPanelLineHeight();
                return false;
            });
            $("#bvi-panel-line-height-average").click(function() {
                Cookies.set("bvi-panel-line-height", "average", {
                    path: "/"
                });
                if(Cookies.get("bvi-panel-play") == 1 ) {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Интервал средний", "Russian Female");
                    }
                }
                method.BviPanelLineHeight();
                return false;
            });
            $("#bvi-panel-line-height-big").click(function() {
                Cookies.set("bvi-panel-line-height", "big", {
                    path: "/"
                });
                if(Cookies.get("bvi-panel-play") == 1 ) {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Интервал большой", "Russian Female");
                    }
                }
                method.BviPanelLineHeight();
                return false;
            });
            $(".bvi-panel-settings-default").click(function() {
                Cookies.set("bvi-panel", setting.BviPanel, {
                    path: "/"
                });
                Cookies.set("bvi-panel-bg", setting.BviPanelBg, {
                    path: "/"
                });
                Cookies.set("bvi-panel-font-family", setting.BviPanelFontFamily, {
                    path: "/"
                });
                Cookies.set("bvi-panel-font-size", setting.BviPanelFontSize, {
                    path: "/"
                });
                Cookies.set("bvi-panel-letter-spacing", setting.BviPanelLetterSpacing, {
                    path: "/"
                });
                Cookies.set("bvi-panel-line-height", setting.BviPanelLineHeight, {
                    path: "/"
                });
                Cookies.set("bvi-panel-img", setting.BviPanelImg, {
                    path: "/"
                });
                Cookies.set("bvi-panel-img-X-Y", setting.BviPanelImgXY, {
                    path: "/"
                });
                Cookies.set("bvi-panel-reload", setting.BviPanelReload, {
                    path: "/"
                });
                Cookies.set("bvi-panel-play", setting.BviPlay, {
                    path: "/"
                });
                method.BviPanelImg();
                method.BviPanelBgColor();
                method.BviPanelFontSize();
                method.BviPanelLetterSpacing();
                method.BviPanelLineHeight();
                method.BviPanelFontFamily();
                if(Cookies.get("bvi-panel-play") == 1 ) {
                    if(responsiveVoice.voiceSupport() == true) {
                        responsiveVoice.speak("Настройки по умолчанию сброшены", "Russian Female");
                    }
                }
                return false;
            })
        },
        ReturnSet: function(setting) {
            $("*").not(".bvi-panel-menu,.bvi-panel-menu *, .fa, .glyphicon, .dashicons").each(function() {
                $(this).css({
                    "font-family": setting.fontfamily,
                    "background-color": setting.backgroundcolor,
                    "background-image": "none",
                    "color": setting.color,
                    "font-size": setting.fontsize,
                    "box-shadow": "none",
                    "text-shadow": "none",
                    "letter-spacing": setting.letterspacing,
                    "border-color": setting.color,
                    "line-height": setting.lineheight
                });
            })
        },
        Panel: function(BviCloseClassAndId,BviFixPanel) {
            if (Cookies.get("bvi-panel") == "1") {
                $('<div class="bvi-panel-menu"></div>').prependTo("body");
                $(".bvi-panel-menu").addClass("bvi-panel-animated bvi-panel-fadeInDown");
                var scroll = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                if (BviFixPanel == '1') {
                    if (scroll > 99) {
                        $(".bvi-panel-menu").addClass("bvi-panel-fixed");
                    }
                    $(window).scroll(function() {
                        if ($(this).scrollTop() >= 99) {
                            $(".bvi-panel-menu").addClass("bvi-panel-fixed");
                            $(".bvi-panel-menu").css({
                                "left": "0",
                                "margin-bottom": "20px",
                                "margin-left": "auto",
                                "margin-right": "auto",
                                "position": "fixed",
                                "right": 0,
                                "z-index": 99999
                            });
                        } else {
                            $(".bvi-panel-menu").removeClass("bvi-panel-fixed");
                            $(".bvi-panel-menu").removeAttr("style");
                        }
                    });
                }
                $('<div class="bvi-panel-container">'+
                    '<div class="bvi-panel-row">'+
                    '<div class="bvi-panel-col-xs-12 bvi-panel-col-sm-12 bvi-panel-col-md-12 bvi-panel-col-lg-12">'+
                    '<div class="bvi-panel-menu-bg">'+
                    '<div class="bvi-panel-row">'+
                    '<div class="bvi-panel-col-xs-12 bvi-panel-col-sm-6 bvi-panel-col-md-3 bvi-panel-col-lg-3">'+
                    '<div class="bvi-panel-menu-block">'+
                    '<div class="bvi-panel-title">Размер шрифта</div>'+
                    '<div class="bvi-panel-btn-group" role="group" aria-label="Размер шрифта">'+
                    '<a href="#" id="bvi-panel-font-size-14" class="bvi-panel-btn bvi-panel-btn-default bvi-panel-font-size-14" title="Размер шрифта 14 пикселей">А</a>'+
                    '<a href="#" id="bvi-panel-font-size-16" class="bvi-panel-btn bvi-panel-btn-default bvi-panel-font-size-16" title="Размер шрифта 16 пикселей">А</a>'+
                    '<a href="#" id="bvi-panel-font-size-18" class="bvi-panel-btn bvi-panel-btn-default bvi-panel-font-size-18" title="Размер шрифта 18 пикселей">А</a>'+
                    '<a href="#" id="bvi-panel-font-size-20" class="bvi-panel-btn bvi-panel-btn-default bvi-panel-font-size-20" title="Размер шрифта 20 пикселей">А</a>'+
                    '<a href="#" id="bvi-panel-font-size-23" class="bvi-panel-btn bvi-panel-btn-default bvi-panel-font-size-23" title="Размер шрифта 23 пикселя">А</a>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="bvi-panel-col-xs-12 bvi-panel-col-sm-6 bvi-panel-col-md-3 bvi-panel-col-lg-3">'+
                    '<div class="bvi-panel-menu-block">'+
                    '<div class="bvi-panel-title">Цвета сайта</div>'+
                    '<div class="bvi-panel-btn-group" role="group" aria-label="Цвета сайта">'+
                    '<a href="#" id="bvi-panel-bg-white" class="bvi-panel-btn bvi-panel-btn-black-white" title="Цвет сайта: Черным по белому">Ц</a>'+
                    '<a href="#" id="bvi-panel-bg-black" class="bvi-panel-btn bvi-panel-btn-white-black" title="Цвет сайта: Белым по черному">Ц</a>'+
                    '<a href="#" id="bvi-panel-bg-blue" class="bvi-panel-btn bvi-panel-btn bvi-panel-btn-blue" title="Цвет сайта: Темно-синим по голубому">Ц</a>'+
                    '<a href="#" id="bvi-panel-bg-brown" class="bvi-panel-btn bvi-panel-btn-brown" title="Цвет сайта: Коричневым по бежевому">Ц</a>'+
                    '<a href="#" id="bvi-panel-bg-green" class="bvi-panel-btn bvi-panel-btn-green" title="Цвет сайта: Зеленым по темно-коричневому">Ц</a>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="bvi-panel-col-xs-12 bvi-panel-col-sm-6 bvi-panel-col-md-3 bvi-panel-col-lg-3">'+
                    '<div class="bvi-panel-menu-block">'+
                    '<div class="bvi-panel-title">Изображения</div>'+
                    '<div class="bvi-panel-btn-group" role="group" aria-label="Изображения">'+
                    '<a href="#" id="bvi-panel-img-grayScale" class="bvi-panel-btn bvi-panel-btn-default"><i class="bvi-panel-glyphicon bvi-panel-glyphicon-picture" style="color: grey;"></i> Ч/Б</a>'+
                    '<a href="#" id="bvi-panel-img-on" class="bvi-panel-btn bvi-panel-btn-default"><i class="bvi-panel-glyphicon bvi-panel-glyphicon-ok-circle" style="color: green;"></i> Вкл.</a>'+
                    '<a href="#" id="bvi-panel-img-off" class="bvi-panel-btn bvi-panel-btn-default"><i class="bvi-panel-glyphicon bvi-panel-glyphicon-remove-circle" style="color: red;"></i> Выкл.</a>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="bvi-panel-col-xs-12 bvi-panel-col-sm-6 bvi-panel-col-md-3 bvi-panel-col-lg-3">'+
                    '<div class="bvi-panel-menu-block">'+
                    '<div class="bvi-panel-title">Дополнительно</div>'+
                    '<div class="bvi-panel-btn-toolbar" role="toolbar" aria-label="...">' +
                    '<a href="#" id="bvi-panel-play-off" class="bvi-panel-btn bvi-panel-btn-default" title="Выключить синтез речи"><span class="bvi-panel-glyphicon bvi-panel-glyphicon-volume-off"></span></a>'+
                    '<a href="#" id="bvi-panel-play-on" class="bvi-panel-btn bvi-panel-btn-default" title="Вклчить синтез речи"><span class="bvi-panel-glyphicon bvi-panel-glyphicon-volume-up"></span></a>' +
                    '</div>'+
                    '<div class="bvi-panel-btn-group" role="group" aria-label="Дополнительно">'+
                    '<a href="#" id="bvi-panel-settings" class="bvi-panel-btn bvi-panel-btn-default" title="Настройки"><span class="bvi-panel-glyphicon bvi-panel-glyphicon-cog"></span> Настройки</a>'+
                    '<a href="#" id="bvi-panel-close" class="bvi-panel-btn bvi-panel-btn-default" title="Обычная версия сайта"><i class="bvi-panel-glyphicon bvi-panel-glyphicon-eye-close"></i></a>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="bvi-panel-row">'+
                    '<div class="bvi-panel-col-xs-12 bvi-panel-col-sm-12 bvi-panel-col-md-12 bvi-panel-col-lg-12">'+
                    '<div class="bvi-panel-row">'+
                    '<div class="bvi-panel-settings">'+
                    '<hr>'+
                    '<div class="bvi-panel-col-xs-12 bvi-panel-col-sm-6 bvi-panel-col-md-4 bvi-panel-col-lg-4">'+
                    '<div class="bvi-panel-title">Кернинг </div>'+
                    '<div class="bvi-panel-btn-group" role="group" aria-label="Кернинг">'+
                    '<a href="#" id="bvi-panel-letter-spacing-normal" class="bvi-panel-btn bvi-panel-btn-default">Стандартный</a>'+
                    '<a href="#" id="bvi-panel-letter-spacing-average" class="bvi-panel-btn bvi-panel-btn-default">Средний</a>'+
                    '<a href="#" id="bvi-panel-letter-spacing-big" class="bvi-panel-btn bvi-panel-btn-default">Большой</a>'+
                    '</div>'+
                    '</div>'+
                    '<div class="bvi-panel-col-xs-12 bvi-panel-col-sm-6 bvi-panel-col-md-4 bvi-panel-col-lg-4">'+
                    '<div class="bvi-panel-title">Интервал </div>'+
                    '<div class="bvi-panel-btn-group" role="group" aria-label="Интервал">'+
                    '<a href="#" id="bvi-panel-line-height-normal" class="bvi-panel-btn bvi-panel-btn-default">Стандартный</a>'+
                    '<a href="#" id="bvi-panel-line-height-average" class="bvi-panel-btn bvi-panel-btn-default">Средний</a>'+
                    '<a href="#" id="bvi-panel-line-height-big" class="bvi-panel-btn bvi-panel-btn-default">Большой</a>'+
                    '</div>'+
                    '</div>'+
                    '<div class="bvi-panel-col-xs-12 bvi-panel-col-sm-12s bvi-panel-col-md-4 bvi-panel-col-lg-4">'+
                    '<div class="bvi-panel-title">Гарнитура </div>'+
                    '<div class="bvi-panel-btn-group" role="group" aria-label="Гарнитура">'+
                    '<a href="#" id="bvi-panel-font-family-arial" class="bvi-panel-btn bvi-panel-btn-default">Без засечек</a>'+
                    '<a href="#" id="bvi-panel-font-family-times-new-roman" class="bvi-panel-btn bvi-panel-btn-default">С засечками</a>'+
                    '</div>'+
                    '</div>'+
                    '<div class="bvi-panel-col-xs-12 bvi-panel-col-sm-12 bvi-panel-col-md-4 bvi-panel-col-lg-4" style="margin-top: 15px;">'+
                    '<a href="#" id="bvi-panel-settings-default" class="bvi-panel-btn bvi-panel-btn-default bvi-panel-settings-default bvi-panel-btn-block"><i class="bvi-panel-glyphicon bvi-panel-glyphicon-refresh"></i> Вернуть стандартные настройки</a>'+
                    '</div>'+
                    '<div class="bvi-panel-col-xs-12 bvi-panel-col-sm-12 bvi-panel-col-md-4 bvi-panel-col-lg-4" style="margin-top: 15px;">'+
                    '<a href="#" id="bvi-panel-close" class="bvi-panel-btn bvi-panel-btn-default bvi-panel-settings-close bvi-panel-btn-block" title="Обычная версия сайта"><i class="bvi-panel-glyphicon bvi-panel-glyphicon-eye-close"></i> Обычная версия сайта</a>'+
                    '</div>'+
                    '<div class="bvi-panel-col-xs-12 bvi-panel-col-sm-12 bvi-panel-col-md-4 bvi-panel-col-lg-4" style="margin-top: 15px;">'+
                    '<a href="#" id="bvi-panel-settings" class="bvi-panel-btn bvi-panel-btn-default bvi-panel-settings-close bvi-panel-btn-block" title="Закрыть"><i class="bvi-panel-glyphicon bvi-panel-glyphicon-remove"></i> Закрыть</a>'+
                    '</div>'+
                    '<div class="bvi-panel-col-xs-12 bvi-panel-col-sm-12 bvi-panel-col-md-12 bvi-panel-col-lg-12" style="margin-top: 15px;">'+
                    '<a href="http://bvi.isvek.ru/" target="_blank" class="bvi-panel-team">bvi.isvek.ru: Версия для слабовидящих</a>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'
                ).appendTo(".bvi-panel-menu");
            } else {
                $("#bvi-panel-close, .bvi-panel-close").remove();
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
                    $('svg').show();
                });
                $(BviCloseClassAndId).show();
                if (Cookies.get("bvi-panel-reload") == "1") {
                    document.location.reload(true)
                }
                Cookies.remove("bvi-panel", {
                    path: "/"
                });
                Cookies.remove("bvi-panel-bg", {
                    path: "/"
                });
                Cookies.remove("bvi-panel-font-family", {
                    path: "/"
                });
                Cookies.remove("bvi-panel-font-size", {
                    path: "/"
                });
                Cookies.remove("bvi-panel-letter-spacing", {
                    path: "/"
                });
                Cookies.remove("bvi-panel-line-height", {
                    path: "/"
                });
                Cookies.remove("bvi-panel-img", {
                    path: "/"
                });
                Cookies.remove("bvi-panel-img-X-Y", {
                    path: "/"
                });
                Cookies.remove("bvi-panel-reload", {
                    path: "/"
                });
                Cookies.remove("bvi-panel-play", {
                    path: "/"
                });
                method.BviPlay();
            }
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