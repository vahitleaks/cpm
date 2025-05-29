$(document).ready(function () {
    debugger;
    window.ManuelServiceTimeControl = function (ServiceTime)
    {
        ////        var STATE = $("input[name=YAZILIMCICHECK]").prop("checked");
////        var HAFTASONUCHECKSTATE = $("input[name=HAFTASONUCHECK]").prop("checked");
        doneTyping();
        function doneTyping() {
            $("#ServiceFormModal #ServiceTime").val(parseInt(ServiceTime));
        }
        if ($("#ServiceFormModal #ServiceTime").val() == 60 || $("#ServiceFormModal #ServiceTime").val() > 60) {
            var obj = secondsToTime(Math.round($("#ServiceFormModal #ServiceTime").val()));
            if (obj.m > 0) {
                $(".toplamServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
            }
            else {
                $(".toplamServisSuresi").text("( " + obj.h + " sa" + ")");
            }
        }
        else {
            if ($("#ServiceFormModal #ServiceTime").val() > 0) {
                $(".toplamServisSuresi").text("( " + ($("#ServiceFormModal #ServiceTime").val()) + " " + " dk" + " )");
            }
        }
        $("span").removeAttr("hidden");

    }
    //Dakikayı saate ve dakikaya çeviren fonksiyon(1)
    function secondsToTime(secs) {
        var divisor_for_minutes = secs % (60 * 60);
        var hours = Math.floor(divisor_for_minutes / 60);
        var divisor_for_seconds = divisor_for_minutes % 60;
        var minutes = Math.ceil(divisor_for_seconds);
        var obj = {
            "h": hours,
            "m": minutes
        };
        return obj;
    }
});

