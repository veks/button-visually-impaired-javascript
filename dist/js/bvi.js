/*!
 * Button visually impaired v1.0.8
 */
(function($){
    $.bvi = function(options) {
        var default_setting = $.extend({
            'bvi_target': '.bvi-open',
            'bvi_theme': 'white',
            'bvi_font': 'arial',
            'bvi_font_size': 16,
            'bvi_letter_spacing': 'normal',
            'bvi_line_height': 'normal',
            'bvi_images': true,
            'bvi_reload': false,
            'bvi_fixed': true,
            'bvi_voice': true,
            'bvi_flash_iframe': true,
            'bvi_hide': false
        }, options);

        console.log('Button visually impaired v1.0.8');

        var versionIE = detectIE();
        var selector = default_setting.bvi_target;
        var check_bvi_theme,
            check_bvi_font,
            check_bvi_letter_spacing,
            check_bvi_line_height,
            check_bvi_font_size,
            check_bvi_images,
            check_bvi_fixed,
            check_bvi_voice,
            check_bvi_flash_iframe,
            check_bvi_hide,
            checkError;

        function detectIE() {
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf('MSIE ');
            if (msie > 0) {
                return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }

            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                var rv = ua.indexOf('rv:');
                return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }

            var edge = ua.indexOf('Edge/');
            if (edge > 0) {
                return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            }

            return false;
        }

        function bvi_voice_check() {
            if(Cookies.get('bvi-voice') === 'true'){
                $('.bvi-link').show();
            } else {
                $('.bvi-link').hide();
            }
        }

        function bvi_panel_voice(text) {
            if(Cookies.get('bvi-voice') === 'true'){
                if(responsiveVoice.voiceSupport()) {
                    responsiveVoice.setDefaultVoice("Russian Female");
                    responsiveVoice.cancel();
                    responsiveVoice.speak(text);
                }
            } else {
                responsiveVoice.cancel();
            }
        }

        function bvi_voice() {
            if(responsiveVoice.voiceSupport() || versionIE >= 11 || versionIE >= 10 || versionIE >= 9) {
                responsiveVoice.setDefaultVoice("Russian Female");
                var bvi_voice = $(".bvi-voice");
                bvi_voice.each(function(index){
                    var bvi_voice_text_id = 'bvi-voice-text-id-' + index;
                    $(this).wrapInner('<div class="bvi-voice-text ' + bvi_voice_text_id + '"></div>');
                    $(this).prepend('<div class="bvi bvi-link" data-bvi-voice-class=".'+ bvi_voice_text_id +'"><div class="bvi-btn-group">' +
                        '<a href="#" class="bvi-play bvi-btn bvi-btn-outline-dark bvi-btn-sm">Воспроизвести</a>' +
                        '<a href="#" class="bvi-stop bvi-btn bvi-btn-outline-dark bvi-btn-sm">Стоп</i></a>' +
                        '</div></div>');
                });
                $('.bvi-play').click(function() {
                    var bvi_voice_class = $(this).parent().parent().data('bvi-voice-class');
                    var bvi_voice_text = $(bvi_voice_class).text();
                    if(bvi_voice_class) {
                        if(Cookies.get('bvi-voice') === 'true'){
                            responsiveVoice.speak(bvi_voice_text);
                        }
                    } else {
                        responsiveVoice.cancel();
                    }
                    return false;
                });
                $('.bvi-stop').click(function () {
                    responsiveVoice.cancel();
                    return false;
                });
            } else {
                $('.bvi-btn-voice').hide();
                set('data-bvi-voice', 'bvi-voice', false);
                console.log('Ваш браузер не поддерживает синтез речи.')
            }
        }

        function bvi_click() {
            $("#bvi-panel-close, .bvi-panel-close").click(function() {
                if (Cookies.get("bvi-reload") === 'true') {
                    document.location.reload(true);
                }
                $('.bvi-img-off').remove();
                $("img").each(function() {
                    $(this).show();
                    $(this).removeClass('grayscale');
                });
                Cookies.remove("bvi-panel-active", {path: "/"});
                Cookies.remove("bvi-font-size", {path: "/" });
                Cookies.remove("bvi-theme", {path: "/"});
                Cookies.remove("bvi-images", {path: "/"});
                Cookies.remove("bvi-line-height", {path: "/"});
                Cookies.remove("bvi-letter-spacing", {path: "/"});
                Cookies.remove("bvi-voice", {path: "/"});
                Cookies.remove("bvi-font-family", {path: "/"});
                Cookies.remove("bvi-panel-hide", {path: "/"});
                Cookies.remove("bvi-flash-iframe", {path: "/"});
                Cookies.remove("bvi-reload", {path: "/"});
                if(responsiveVoice.voiceSupport()) {
                        responsiveVoice.cancel();
                }
                active();
                bvi_panel_voice('Обычная версия сайта');
                return false;
            });

            $('#bvi-panel-hide').click(function() {
                $('.bvi-panel').toggle(0);
                $('.bvi-eye-link').toggle(0);
                set('data-bvi-panel-hide', 'bvi-panel-hide', true);
                bvi_panel_voice('Панель скрыта');
                return false;
            });

            $('#bvi-panel-show').click(function() {
                $('.bvi-panel').toggle(0);
                $('.bvi-eye-link').toggle(0);
                set('data-bvi-panel-hide', 'bvi-panel-hide', false);
                bvi_panel_voice('Панель открыта');
                return false;
            });

            $('#bvi-setting').click(function() {
                $('.bvi-setting-menu').toggle(0);
                $(this).toggleClass("active");
                bvi_panel_voice('Дополнительные настройки');
                return false;
            });

            $('#bvi-setting-close').click(function() {
                $('.bvi-setting-menu').toggle(0);
                $('#bvi-setting').toggleClass("active");
                bvi_panel_voice('Дополнительные настройки закрыты');
                return false;
            });

            $('#bvi-font-size-less').click(function () {
                size = parseFloat(Cookies.get("bvi-font-size")) - 1;
                $(this).addClass('active').siblings().removeClass('active');
                if (size != 0) {
                    set('data-bvi-size', 'bvi-font-size', size);
                    bvi_panel_voice('Размер шрифта уменьшен');
                }
                return false;
            });

            $('#bvi-font-size-more').click(function () {
                size = parseFloat(Cookies.get("bvi-font-size")) + 1;
                $(this).addClass('active').siblings().removeClass('active');
                if (size != 40) {
                    set('data-bvi-size', 'bvi-font-size', size);
                    bvi_panel_voice('Размер шрифта увеличен');
                }
                return false;
            });

            $("#bvi-theme-white").click(function() {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-theme', 'bvi-theme', 'white');
                bvi_panel_voice('Цвет сайта черным по белому');
                return false;
            });

            $("#bvi-theme-black").click(function() {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-theme', 'bvi-theme', 'black');
                bvi_panel_voice('Цвет сайта белым по черному');
                return false;
            });

            $("#bvi-theme-blue").click(function() {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-theme', 'bvi-theme', 'blue');
                bvi_panel_voice('Цвет сайта тёмно-синим по голубому');
                return false;
            });

            $("#bvi-theme-brown").click(function() {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-theme', 'bvi-theme', 'brown');
                bvi_panel_voice('Цвет сайта коричневым по бежевому');
                return false;
            });

            $("#bvi-theme-green").click(function() {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-theme', 'bvi-theme', 'green');
                bvi_panel_voice('Цвет сайта зеленым по тёмно-коричневому');
                return false;
            });

            $('#bvi-images-true').click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-images', 'bvi-images', true);
                bvi_panel_voice('Изображения включены');
                return false;
            });

            $('#bvi-images-false').click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-images', 'bvi-images', false);
                bvi_panel_voice('Изображения выключены');
                return false;
            });

            $('#bvi-images-grayscale').click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-images', 'bvi-images', 'grayscale');
                bvi_panel_voice('Изображения чёрно-белые');
                return false;
            });

            $("#bvi-line-height-normal").click(function() {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-line-height', 'bvi-line-height', 'normal');
                bvi_panel_voice('Междустрочный интервал cтандартный');
                return false;
            });

            $("#bvi-line-height-average").click(function() {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-line-height', 'bvi-line-height', 'average');
                bvi_panel_voice('Междустрочный интервал средний');
                return false;
            });

            $("#bvi-line-height-big").click(function() {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-line-height', 'bvi-line-height', 'big');
                bvi_panel_voice('Междустрочный интервал большой');
                return false;
            });

            $("#bvi-letter-spacing-normal").click(function() {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-letter-spacing', 'bvi-letter-spacing', 'normal');
                bvi_panel_voice('Межбуквенный интервал одинарный');
                return false;
            });

            $("#bvi-letter-spacing-average").click(function() {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-letter-spacing', 'bvi-letter-spacing', 'average');
                bvi_panel_voice('Межбуквенный интервал полуторный');
                return false;
            });

            $("#bvi-letter-spacing-big").click(function() {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-letter-spacing', 'bvi-letter-spacing', 'big');
                bvi_panel_voice('Межбуквенный интервал двойной');
                return false;
            });

            $("#bvi-font-family-arial").click(function() {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-font-family', 'bvi-font-family', 'arial');
                bvi_panel_voice('Шрифт без засечек');
                return false;
            });

            $("#bvi-font-family-times").click(function() {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-font-family', 'bvi-font-family', 'times');
                bvi_panel_voice('Шрифт с засечками');
                return false;
            });

            $("#bvi-flash-iframe-true").click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-flash-iframe', 'bvi-flash-iframe', true);
                bvi_panel_voice('Включить фрейм');
                return false;
            });

            $("#bvi-flash-iframe-false").click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-flash-iframe', 'bvi-flash-iframe', false);
                bvi_panel_voice('Выключить фрейм');
                return false;
            });

            $("#bvi-voice-true").click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-voice', 'bvi-voice', true);
                bvi_panel_voice('Синтез речи включён');
                bvi_voice_check();
                return false;
            });

            $("#bvi-voice-false").click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-voice', 'bvi-voice', false);
                bvi_panel_voice('Синтез речи выключён');
                bvi_voice_check();
                return false;
            });

            $("#bvi-settings-default").click(function() {
                $('#bvi-theme-' + Cookies.get("bvi-theme")).removeClass('active');
                $('#bvi-images-' + Cookies.get("bvi-images")).removeClass('active');
                $('#bvi-line-height-' + Cookies.get("bvi-line-height")).removeClass('active');
                $('#bvi-letter-spacing-' + Cookies.get("bvi-letter-spacing")).removeClass('active');
                $('#bvi-font-family-' + Cookies.get("bvi-font-family")).removeClass('active');
                $('#bvi-flash-iframe-' + Cookies.get("bvi-flash-iframe")).removeClass('active');
                $('#bvi-voice-' + Cookies.get("bvi-voice")).removeClass('active');

                $('#bvi-theme-' + default_setting.bvi_theme).addClass('active');
                $('#bvi-images-' + default_setting.bvi_images).addClass('active');
                $('#bvi-line-height-' + default_setting.bvi_line_height).addClass('active');
                $('#bvi-letter-spacing-' + default_setting.bvi_letter_spacing).addClass('active');
                $('#bvi-font-family-' + default_setting.bvi_font).addClass('active');
                $('#bvi-flash-iframe-' + default_setting.bvi_flash_iframe).addClass('active');
                $('#bvi-voice-' + default_setting.bvi_voice).addClass('active');

                set('data-bvi-size', 'bvi-font-size', default_setting.bvi_font_size);
                set('data-bvi-theme', 'bvi-theme', default_setting.bvi_theme);
                set('data-bvi-images', 'bvi-images', default_setting.bvi_images);
                set('data-bvi-line-height', 'bvi-line-height', default_setting.bvi_line_height);
                set('data-bvi-letter-spacing', 'bvi-letter-spacing', default_setting.bvi_letter_spacing);
                set('data-bvi-font-family', 'bvi-font-family', default_setting.bvi_font);
                set('data-bvi-flash-iframe', 'bvi-flash-iframe', default_setting.bvi_flash_iframe);
                set('data-bvi-voice', 'bvi-voice', default_setting.bvi_voice);
                bvi_panel_voice('Настройки по умолчанию');
                return false;
            });
        }

        function set(data, set_cookies, set_cookies_data) {
            Cookies.set(set_cookies, set_cookies_data, {path: "/", expires: 1});
            $(".bvi-body").attr(data, Cookies.get(set_cookies));
            get_image();
        }

        function set_active_link() {
            $('#bvi-theme-' + Cookies.get("bvi-theme")).addClass('active');
            $('#bvi-images-' + Cookies.get("bvi-images")).addClass('active');
            $('#bvi-line-height-' + Cookies.get("bvi-line-height")).addClass('active');
            $('#bvi-letter-spacing-' + Cookies.get("bvi-letter-spacing")).addClass('active');
            $('#bvi-font-family-' + Cookies.get("bvi-font-family")).addClass('active');
            $('#bvi-flash-iframe-' + Cookies.get("bvi-flash-iframe")).addClass('active');
            $('#bvi-voice-' + Cookies.get("bvi-voice")).addClass('active');
        }

        function get() {
            if (typeof Cookies.get("bvi-font-size") === 'undefined'
                || typeof Cookies.get("bvi-theme") === 'undefined'
                || typeof Cookies.get("bvi-images") === 'undefined'
                || typeof Cookies.get("bvi-line-height") === 'undefined'
                || typeof Cookies.get("bvi-letter-spacing") === 'undefined'
                || typeof Cookies.get("bvi-voice") === 'undefined'
                || typeof Cookies.get("bvi-font-family") === 'undefined'
                || typeof Cookies.get("bvi-panel-hide") === 'undefined'
                || typeof Cookies.get("bvi-flash-iframe") === 'undefined'
                || typeof Cookies.get("bvi-reload") === 'undefined'
                || typeof Cookies.get("bvi-fixed") === 'undefined'
            ){
                Cookies.set("bvi-font-size", default_setting.bvi_font_size, {path: "/", expires: 1});
                Cookies.set("bvi-theme", default_setting.bvi_theme, {path: "/", expires: 1});
                Cookies.set("bvi-images", default_setting.bvi_images, {path: "/", expires: 1});
                Cookies.set("bvi-line-height", default_setting.bvi_line_height, {path: "/", expires: 1});
                Cookies.set("bvi-letter-spacing", default_setting.bvi_letter_spacing, {path: "/", expires: 1});
                Cookies.set("bvi-voice", default_setting.bvi_voice, {path: "/", expires: 1});
                Cookies.set("bvi-font-family", default_setting.bvi_font, {path: "/", expires: 1});
                Cookies.set("bvi-panel-hide", default_setting.bvi_hide, {path: "/", expires: 1});
                Cookies.set("bvi-flash-iframe", default_setting.bvi_flash_iframe, {path: "/", expires: 1});
                Cookies.set("bvi-reload", default_setting.bvi_reload, {path: "/", expires: 1});
                Cookies.set("bvi-fixed", default_setting.bvi_fixed, {path: "/", expires: 1});
            }

            $('.bvi-body').attr({
                'data-bvi-panel-hide' : Cookies.get("bvi-panel-hide"),
                'data-bvi-size' : Cookies.get("bvi-font-size"),
                'data-bvi-theme' : Cookies.get("bvi-theme"),
                'data-bvi-images' : Cookies.get("bvi-images"),
                'data-bvi-line-height' : Cookies.get("bvi-line-height"),
                'data-bvi-letter-spacing' : Cookies.get("bvi-letter-spacing"),
                'data-bvi-font-family' : Cookies.get("bvi-font-family"),
                'data-bvi-flash-iframe' : Cookies.get("bvi-flash-iframe"),
                'data-bvi-reload' : Cookies.get("bvi-reload"),
                'data-bvi-voice' : Cookies.get("bvi-voice"),
                'data-bvi-fixed' : Cookies.get("bvi-fixed")

            });

            var bvi_panel = Cookies.get("bvi-panel-hide");
            
            if(bvi_panel === 'false' || typeof bvi_panel === 'undefined') {
                $('.bvi-panel').show();
                $('.bvi-eye-link').hide();
            } else {
                $('.bvi-panel').hide();
                $('.bvi-eye-link').show("slow");
            }
        }

        function get_image() {
            var bvi_images;
            bvi_images = Cookies.get("bvi-images");

            if (bvi_images === 'true') {
                $("img").each(function() {
                    $(this).removeClass('grayscale');
                    $(this).show();
                    $('.bvi-img-off').remove();
                    if(versionIE == 11 || versionIE == 10 || versionIE == 9) {
                        var databviimgorign = $(this).attr('data-bvi-img-orign') || this.src;
                        this.src = databviimgorign;
                    }
                });
            }

            if (bvi_images === 'false') {
                $(".bvi-img-off").remove();
                $("img").each(function() {
                    $(this).removeClass('grayscale');
                    $(this).hide();
                    var alt = this.alt || 'Нет описания к изображению';
                    var imgClass = $(this).attr("class") || '';
                    var imgId = $(this).attr("id") || '';
                    $(this).after($('<div class="bvi-img-off '+imgClass+'" id="'+imgId+'" style="width: ' + $(this).width() + "px; height: " + $(this).height() + 'px">').html(alt));
                });
            }

            if (bvi_images === 'grayscale') {
                $("img").each(function() {
                    $(this).show();
                    $(this).addClass('grayscale');
                    $('.bvi-img-off').remove();
                    if(versionIE == 11 || versionIE == 10 || versionIE == 9) {
                        $(this).attr('data-bvi-img-orign', this.src);
                        var src = grayscale(this.src);
                        this.src = src;
                    }
                });
            }
        }

        function grayscale(src){
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var imgObj = new Image();
            //imgObj.crossOrigin = 'anonymous';
            imgObj.src = src;
            canvas.width = imgObj.width;
            canvas.height = imgObj.height;
            ctx.drawImage(imgObj, 0, 0);
            var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for(var y = 0; y < imgPixels.height; y++){
                for(var x = 0; x < imgPixels.width; x++){
                    var i = (y * 4) * imgPixels.width + x * 4;
                    var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                    imgPixels.data[i] = avg;
                    imgPixels.data[i + 1] = avg;
                    imgPixels.data[i + 2] = avg;
                }
            }
            ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);

            return canvas.toDataURL();
        }

        function active() {
            if(versionIE == 8 || versionIE == 7 || versionIE == 6 || versionIE == 5) {
                console.log('Браузер не поддерживается.');
            } else {
                if (Cookies.get('bvi-panel-active') === 'true') {
                    $(selector).hide().after($('<a href="#" class="bvi-panel-close" title="Обычная версия сайта">Обычная версия сайта</a>'));
                    panel();
                    bvi_voice();
                    bvi_voice_check();
                    bvi_click();
                    set_active_link();
                } else {
                    bvi_voice();
                    $(selector).show();
                    $('.bvi-panel-close').remove();
                    $(".bvi").remove();
                    $('body > .bvi-body').contents().unwrap();
                    $('.bvi-voice-text').contents().unwrap();
                }
            }
        }

        function panel() {
            $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">');
            $('body').wrapInner('<div class="bvi-body"></div>');
            $('body').prepend('<div class="bvi bvi-panel">\n' +
                '    <div class="bvi-container bvi-my-auto">\n' +
                '        <div class="bvi-row">\n' +
                '            <div class="bvi-col-sm-3 bvi-col-md-6 bvi-col-lg-2 bvi-p-0">\n' +
                '                <div class="bvi-text-center">\n' +
                '                    <div class="bvi-title bvi-mb-2">Размер шрифта</div>\n' +
                '                    <div class="bvi-btn-group">\n' +
                '                        <a href="#" id="bvi-font-size-less" class="bvi-btn bvi-btn-outline-dark bg" title="Уменьшить размер шрифта"><i class="bvi-icon bvi-font"></i><i class="bvi-icon bvi-minus"></i></a>\n' +
                '                        <a href="#" id="bvi-font-size-more" class="bvi-btn bvi-btn-outline-dark" title="Увеличить размер шрифта"><i class="bvi-icon bvi-font"></i><i class="bvi-icon bvi-plus"></i></a>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '            <div class="bvi-col-sm-5 bvi-col-md-6 bvi-col-lg-3 bvi-p-0">\n' +
                '                <div class="bvi-text-center">\n' +
                '                    <div class="bvi-title bvi-mb-2">Цвета сайта</div>\n' +
                '                    <div class="bvi-btn-group">\n' +
                '                        <a href="#" id="bvi-theme-white" class="bvi-btn bvi-btn-link bvi-border bvi-border-dark" title="Черным по белому" style="color: black; background-color: white !important;"><i class="bvi-icon bvi-font"></i></a>\n' +
                '                        <a href="#" id="bvi-theme-black" class="bvi-btn bvi-btn-link" title="Белым по черному" style="color: white !important; background-color: black !important;"><i class="bvi-icon bvi-font"></i></a>\n' +
                '                        <a href="#" id="bvi-theme-blue" class="bvi-btn bvi-btn-link bvi-border bvi-border-dark" title="Темно-синим по голубому" style="color: #063462 !important; background-color: #9DD1FF !important;"><i class="bvi-icon bvi-font"></i></a>\n' +
                '                        <a href="#" id="bvi-theme-brown" class="bvi-btn bvi-btn-dark bvi-border bvi-border-dark" title="Коричневым по бежевому" style="color: #4D4B43 !important; background-color: #F7F3D6 !important;"><i class="bvi-icon bvi-font"></i></a>\n' +
                '                        <a href="#" id="bvi-theme-green" class="bvi-btn bvi-btn-dark bvi-border bvi-border-dark" title="Зеленым по темно-коричневому" style="color: #A9E44D !important; background-color: #3B2716 !important;"><i class="bvi-icon bvi-font"></i></a>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '            <div class="bvi-col-sm-4 bvi-col-md-6 bvi-col-lg-2 bvi-p-0">\n' +
                '                <div class="bvi-text-center">\n' +
                '                    <div class="bvi-title bvi-mb-2">Изображения</div>\n' +
                '                    <div class="bvi-btn-group">\n' +
                '                        <a href="#" id="bvi-images-true" class="bvi-btn bvi-btn-outline-dark" title="Изображения включены"><i class="bvi-icon bvi-circle"></i></a>\n' +
                '                        <a href="#" id="bvi-images-false" class="bvi-btn bvi-btn-outline-dark" title="Изображения выключены"><i class="bvi-icon bvi-circle-notch"></i></a>\n' +
                '                        <a href="#" id="bvi-images-grayscale" class="bvi-btn bvi-btn-outline-dark" title="Изображения черно-белые"><i class="bvi-icon bvi-adjust"></i></a>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '            <div class="bvi-col-sm-12 bvi-col-md-6 bvi-col-lg-5 bvi-p-0">\n' +
                '                <div class="bvi-text-center">\n' +
                '                    <div class="bvi-title bvi-mb-2">Дополнительно</div>\n' +
                '                    <div class="bvi-btn-group bvi-btn-voice">\n' +
                '                        <a href="#" id="bvi-voice-true" class="bvi-btn bvi-btn-outline-dark" title=""><i class="bvi-icon bvi-volume-up"></i></a>\n' +
                '                        <a href="#" id="bvi-voice-false" class="bvi-btn bvi-btn-outline-dark"><i class="bvi-icon bvi-volume-off"></i></a>\n' +
                '                    </div>\n' +
                '                    <div class="bvi-btn-group">\n' +
                '                        <a href="#" id="bvi-setting" class="bvi-btn bvi-btn-outline-dark" title="Настройки"><i class="bvi-icon bvi-cogs bvi-mr-1"></i> Настройки</a>\n' +
                '                        <a href="#" id="bvi-panel-close" class="bvi-btn bvi-btn-outline-dark" title="Обычная версия сайта"><i class="bvi-icon bvi-low-vision"></i></a>\n' +
                '                        <a href="#" id="bvi-panel-hide" class="bvi-btn bvi-btn-outline-dark" title="Скрыть панель"><i class="bvi-icon bvi-chevron-circle-up"></i></a>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '        <div class="bvi-row bvi-setting-menu">\n' +
                '            <div class="bvi-col">\n' +
                '                <hr class="bvi-hr mt-1">\n' +
                '                <div class="bvi-row">\n' +
                '                    <div class="bvi-col bvi-p-0">\n' +
                '                        <div class="bvi-text-center">\n' +
                '                            <div class="bvi-title bvi-mb-2">Междустрочный интервал</div>\n' +
                '                            <div class="bvi-btn-group">\n' +
                '                                <a href="#" id="bvi-line-height-normal" class="bvi-btn bvi-btn-outline-dark" title="Междустрочный интервал стандартный">Стандартный</a>\n' +
                '                                <a href="#" id="bvi-line-height-average" class="bvi-btn bvi-btn-outline-dark" title="Междустрочный интервал средний">Средний</a>\n' +
                '                                <a href="#" id="bvi-line-height-big" class="bvi-btn bvi-btn-outline-dark" title="Междустрочный интервал большой">Большой</a>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                    <div class="bvi-col bvi-p-0">\n' +
                '                        <div class="bvi-text-center">\n' +
                '                            <div class="bvi-title bvi-mb-2">Межбуквенный интервал</div>\n' +
                '                            <div class="bvi-btn-group">\n' +
                '                                <a href="#" id="bvi-letter-spacing-normal" class="bvi-btn bvi-btn-outline-dark" title="Межбуквенный интервал одинарный">Одинарный</a>\n' +
                '                                <a href="#" id="bvi-letter-spacing-average" class="bvi-btn bvi-btn-outline-dark" title="Межбуквенный интервал полуторный">Полуторный</a>\n' +
                '                                <a href="#" id="bvi-letter-spacing-big" class="bvi-btn bvi-btn-outline-dark" title="Межбуквенный интервал двойной">Двойной</a>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                    <div class="bvi-col bvi-p-0">\n' +
                '                        <div class="bvi-text-center">\n' +
                '                            <div class="bvi-title bvi-mb-2">Шрифт</div>\n' +
                '                            <div class="bvi-btn-group">\n' +
                '                                <a href="#" id="bvi-font-family-arial" class="bvi-btn bvi-btn-outline-dark" title="Шрифт без засечек">Без засечек</a>\n' +
                '                                <a href="#" id="bvi-font-family-times" class="bvi-btn bvi-btn-outline-dark" title="Шрифт с засечками">С засечками</a>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div class="bvi-row">\n' +
                '                    <div class="bvi-col bvi-p-0">\n' +
                '                        <div class="bvi-text-left bvi-mt-3">\n' +
                '                            <div class="bvi-btn-group">\n' +
                '                                <a href="#" id="bvi-flash-iframe-true" class="bvi-btn bvi-btn-outline-dark bvi-btn-sm" title="Включить Фрейм"><i class="bvi-icon bvi-bolt"></i> Включить Фрейм</a>\n' +
                '                                <a href="#" id="bvi-flash-iframe-false" class="bvi-btn bvi-btn-outline-dark bvi-btn-sm" title="Включить Фрейм"><i class="bvi-icon bvi-bolt"></i> Выключить Фрейм</a>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                    <div class="bvi-col bvi-p-0">\n' +
                '                        <div class="bvi-text-right bvi-mt-3">\n' +
                '                            <a href="#" id="bvi-settings-default" class="bvi-btn bvi-btn-outline-dark bvi-btn-sm" title="Вернуть стандартные настройки"><i class="bvi-icon bvi-sync-alt"></i> Настройки по умолчанию</a>\n' +
                '                            <a href="#" id="bvi-setting-close" class="bvi-btn bvi-btn-dark bvi-btn-sm" title="Закрыть панель">Закрыть <i class="bvi-icon bvi-times-circle"></i> </a>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div class="bvi-row">\n' +
                '                    <div class="bvi-col bvi-p-0">\n' +
                '                        <div class="bvi-text-center bvi-copy bvi-mt-2">\n' +
                '                            <a href="http://bvi.isvek.ru/" target="_blank" title="bvi.isvek.ru v1.0.7">bvi.isvek.ru</a>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="bvi">\n' +
                '    <a href="#" id="bvi-panel-show" class="bvi-btn bvi-btn-danger shadow-sm bvi-eye-link" style="display: none"><i class="bvi-icon bvi-eye bvi-2x"></i></a>\n' +
                '</div>');

            var scroll = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

            if (scroll > 99) {
                if (Cookies.get("bvi-fixed") == 'true') {
                    $(".bvi-panel").addClass("bvi-fixed-top");
                }
            }
                $(window).scroll(function () {
                    if ($(this).scrollTop() >= 99) {
                        if (Cookies.get("bvi-fixed") == 'true') {
                            $(".bvi-panel").addClass('bvi-fixed-top');
                        }
                    } else {
                        $(".bvi-panel").removeClass("bvi-fixed-top");
                    }
                });

            get();
            get_image();
        }

        if (default_setting.bvi_theme == 'white' ||
            default_setting.bvi_theme == 'black' ||
            default_setting.bvi_theme == 'blue' ||
            default_setting.bvi_theme == 'brown' ||
            default_setting.bvi_theme == 'green') {
            check_bvi_theme = true;
        } else {
            check_bvi_theme = false;
            checkError = ['bvi_theme'];
        }

        if (default_setting.bvi_font == 'times' || default_setting.bvi_font == 'arial'){
            check_bvi_font = true;
        } else {
            check_bvi_font = false;
            checkError = ['bvi_font'];
        }

        if (default_setting.bvi_letter_spacing == 'normal' || default_setting.bvi_letter_spacing == 'average' || default_setting.bvi_letter_spacing == 'big'){
            check_bvi_letter_spacing = true;
        } else {
            check_bvi_letter_spacing = false;
            checkError = ['bvi_letter_spacing'];
        }

        if (default_setting.bvi_line_height == 'normal' || default_setting.bvi_line_height == 'average' || default_setting.bvi_line_height == 'big'){
            check_bvi_line_height = true;
        } else {
            check_bvi_line_height = false;
            checkError = ['bvi_line_height'];
        }

        if (default_setting.bvi_font_size == 0) {
            check_bvi_font_size = false;
            checkError = ['bvi_font_size'];
        } else if(default_setting.bvi_font_size <= 40){
            check_bvi_font_size = true;
        } else {
            check_bvi_font_size = false;
            checkError = ['bvi_font_size'];
        }

        if(default_setting.bvi_images === false || default_setting.bvi_images === true || default_setting.bvi_images === 'grayscale') {
            check_bvi_images = true;
        } else {
            check_bvi_images = false;
            checkError = ['bvi_images'];
        }

        if(default_setting.bvi_fixed === false || default_setting.bvi_fixed === true ) {
            check_bvi_fixed = true;
        } else {
            check_bvi_fixed = false;
            checkError = ['bvi_fixed'];
        }

        if(default_setting.bvi_voice === false || default_setting.bvi_voice === true ) {
            check_bvi_voice = true;
        } else {
            check_bvi_voice = false;
            checkError = ['bvi_voice'];
        }

        if(default_setting.bvi_flash_iframe === false || default_setting.bvi_flash_iframe === true ) {
            check_bvi_flash_iframe = true;
        } else {
            check_bvi_flash_iframe = false;
            checkError = ['bvi_flash_iframe'];
        }

        if(default_setting.bvi_hide === false || default_setting.bvi_hide === true ) {
            check_bvi_hide = true;
        } else {
            check_bvi_hide = false;
            checkError = ['bvi_hide'];
        }

        if(check_bvi_theme === true &&
            check_bvi_font === true &&
            check_bvi_letter_spacing === true &&
            check_bvi_line_height === true &&
            check_bvi_font_size === true &&
            check_bvi_images === true &&
            check_bvi_fixed === true &&
            check_bvi_flash_iframe === true &&
            check_bvi_voice === true &&
            check_bvi_hide === true){
            if ($(selector).length) {
                $(selector).click(function () {
                    Cookies.set('bvi-panel-active', true, {path: "/", expires: 1});
                    active();
                    bvi_panel_voice('Версия сайта для слабовидящих');
                    return false;
                });
            } else {
                console.log('Неправильный параметр: bvi_target');
            }
            active();
        } else {
            console.log('ERROR BVI v1.0.7 - Неправильный параметр: ' + checkError);
        }
    };
})(jQuery);