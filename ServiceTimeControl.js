$(document).ready(function () {

    window.ServiceTimeControl = function () {
        var allDAYCHECKSTATE = $("input[name=allDAY]").prop("checked");
        var STARTDATE;
        var ENDDATE;
        var DATESTART = [];
        var DATEEND = [];
        if (allDAYCHECKSTATE == true) {
            $("#ServiceFormModal #ServiceTime").val(360);
            var SERVICETIME = $("#ServiceFormModal #ServiceTime").val();
            $("#ServiceFormModal #ServiceTime").val(parseInt(SERVICETIME))

            STARTDATE = $('#ServiceFormModal #SELECTSTARTDATE').val();
            ENDDATE = $('#ServiceFormModal #SELECTENDDATE').val();
            DATESTART = STARTDATE.split('T')[0];
            DATEEND = ENDDATE.split('T')[0];
            $('#ServiceFormModal #SELECTSTARTDATE').val(DATESTART + 'T09:00');
            $('#ServiceFormModal #SELECTENDDATE').val(DATEEND + 'T18:00');
        }
        else if (allDAYCHECKSTATE == false)
        {
            $("#ServiceFormModal #ServiceTime").val('');

            var BaslangicZamani = Date.parse($("#ServiceFormModal input#StartDate").val());//value start
            var BitisZamani = Date.parse($("#ServiceFormModal input#EndDate").val());//value end
            $(".toplamServisSuresi").text("");
            let zamanFarki = BitisZamani - BaslangicZamani; //Seçilen Başlangıç ve Bitiş Zamanına Göre "Servis Süresini" hesaplar
            let toplamServisSuresi = Math.floor(zamanFarki / 1000 / 60); //Servis Süresini "Dakika" Cinsinden Verir
            $("#ServiceFormModal #ServiceTime").val(parseInt(toplamServisSuresi));

        }
        /*******************************************/
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

