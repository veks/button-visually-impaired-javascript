/*!
 * Button visually impaired v1.0.7
 */
jQuery(document).ready(function($){
    $("#bvi_settings_save").submit(function(e){
        e.preventDefault();
        var dataForm = $('#bvi_settings_save').serialize();
        $.ajax({
            url: bvi.ajaxurl,
            method: "POST",
            data: dataForm,
            dataType: 'json',
            success: function(data) {
                $.notify({
                        message: data.msg
                    },
                    {
                        type: data.type,
                        placement: {
                            from: "top",
                            align: "center",
                            newest_on_top: true,
                            allow_dismiss: true
                        },
                        offset:{
                            x: 20,
                            y: 50
                        },
                        animate: {
                            enter: 'animated fadeIn',
                            exit: 'animated flipOutX'
                        },
                        template: '<div data-notify="container" class="col-5 alert alert-{0}" role="alert" style="text-align: center">' +
                        '<span data-notify="message">{2}</span>' +
                        '</div>'
                    });
                setTimeout(function() {
                    document.location.reload(true);
                },1500);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
        return false;
    });
    $("#bvi_settings_reset").submit(function(e){
        e.preventDefault();
        var dataForm = $('#bvi_settings_reset').serialize();
        $.ajax({
            url: bvi.ajaxurl,
            method: "POST",
            data: dataForm,
            dataType: 'json',
            success: function(data) {
                $.notify({
                        message: data.msg
                    },
                    {
                        type: data.type,
                        placement: {
                            from: "top",
                            align: "center",
                            newest_on_top: true,
                            allow_dismiss: true
                        },
                        offset:{
                            x: 20,
                            y: 50
                        },
                        animate: {
                            enter: 'animated fadeIn',
                            exit: 'animated flipOutX'
                        },
                        template: '<div data-notify="container" class="col-5 alert alert-{0}" role="alert" style="text-align: center">' +
                        '<span data-notify="message">{2}</span>' +
                        '</div>'
                    });
                setTimeout(function() {
                    document.location.reload(true);
                },1000);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
        return false;
    });
    $('.bvi-color-picker-bvi-link-bg').wpColorPicker({defaultColor:'#e53935'});
    $('.bvi-color-picker-bvi-link-color').wpColorPicker({defaultColor:'#ffffff'});
});
