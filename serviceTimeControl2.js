$(document).ready(function () {

    window.ServiceTimeControl = function ()
    {
        var STATE = $("input[name=YAZILIMCICHECK]").prop("checked");
        var HAFTASONUCHECKSTATE = $("input[name=HAFTASONUCHECK]").prop("checked");

        
       


        var HAFTAICICHECKSTATE = $("input[name=HAFTAICICHECK]").prop("checked");

        var allDAYCHECKSTATE = $("input[name=allDAY]").prop("checked");
        var FREESERVICETIME = $("#SELECTMANDAYFREEID").val() == '' ? 0 : parseInt($(" #SELECTMANDAYFREEID").val());//Ücretsiz Servis Süresi

        var STARTDATE;
        var ENDDATE;
        var DATESTART = [];
        var DATEEND = [];


        if (allDAYCHECKSTATE == true) {
            $("#SELECTMANDAYFREEID").val(0);
            var SERVICETIME = $("#SELECTMANDAYID").val();
            calculationService = SERVICETIME - FREESERVICETIME;//Ücretsiz Servis Süresi girildiğinde Servis Süresinden Çıkarır
            $("#SELECTMANDAYID").val(parseInt(calculationService));
            $("#SELECTMANDAYFREEID").val(parseInt(FREESERVICETIME));

            STARTDATE = $('input#SELECTSTARTDATE').val();
            ENDDATE = $('input#SELECTENDDATE').val();
            DATESTART = STARTDATE.split('T')[0];
            DATEEND = ENDDATE.split('T')[0];
            $('input#SELECTSTARTDATE').val(DATESTART + 'T09:00');
            $('input#SELECTENDDATE').val(DATEEND + 'T18:00');

            const timeDifference = new Date(ENDDATE) - new Date(STARTDATE);

            var dayDifference = timeDifference / (1000 * 60 * 60 * 24);
            var dayDifferenceParsed = parseInt(dayDifference) + 1;

            $("#SELECTMANDAYID").val(360 * dayDifferenceParsed);


            $('.toplamServisSuresiInfo').attr('hidden', false);
            $('.toplamServisSuresiInfo').text('* Servis süresi 360(dk) x ' + dayDifferenceParsed + '(gün) = ' + 360 * dayDifferenceParsed + '(dk) olarak hesaplanmıştır.');
        }
        else if (allDAYCHECKSTATE == false) {
            var BaslangicZamani = Date.parse($("input#SELECTSTARTDATE").val());//value start
            var BitisZamani = Date.parse($("input#SELECTENDDATE").val());//value end
            $(".toplamServisSuresi").text("");
            $(".toplamUcretsizServisSuresi").text("");
            let zamanFarki = BitisZamani - BaslangicZamani; //Seçilen Başlangıç ve Bitiş Zamanına Göre "Servis Süresini" hesaplar
            let toplamServisSuresi = Math.floor(zamanFarki / 1000 / 60); //Servis Süresini "Dakika" Cinsinden Verir
            calculationService = toplamServisSuresi - FREESERVICETIME;//Ücretsiz Servis Süresi girildiğinde Servis Süresinden Çıkarır
            $("#SELECTMANDAYID").val(parseInt(calculationService));
            $("#SELECTMANDAYFREEID").val(parseInt(FREESERVICETIME));


            $('.toplamServisSuresiInfo').attr('hidden', true);
            $('.toplamServisSuresiInfo').text('');
        }
        /*******************************************/
        if ($("#SELECTMANDAYID").val() == 60 || $("#SELECTMANDAYID").val() > 60) {
            var obj = secondsToTime2(Math.round($("#SELECTMANDAYID").val()));
            if (obj.m > 0) {
                $(".toplamServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
            }
            else {
                $(".toplamServisSuresi").text("( " + obj.h + " sa" + ")");
            }
        }
        else {
            if ($("#SELECTMANDAYID").val() > 0) {
                $(".toplamServisSuresi").text("( " + ($("#SELECTMANDAYID").val()) + " " + " dk" + " )");
            }
        }
        if ($("#SELECTMANDAYFREEID").val() == 60 || $("#SELECTMANDAYFREEID").val() > 60) {
            var obj = secondsToTime2(Math.round($("#SELECTMANDAYFREEID").val()));

            if (obj.m > 0) {
                $(".toplamUcretsizServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
            }
            else {
                $(".toplamUcretsizServisSuresi").text("( " + obj.h + " sa" + " )");
            }
        }
        else {
            if ($("#SELECTMANDAYFREEID").val() > 0) {
                $(".toplamUcretsizServisSuresi").text("( " + ($("#SELECTMANDAYFREEID").val()) + " " + " dk" + " )");
            }
        }
        $("span").removeAttr("hidden");
        if (STATE == true) {
            ProgrammerCheck();
        }
        if (HAFTASONUCHECKSTATE == true) {
            WeekendCheck();
        }
        if (HAFTAICICHECKSTATE == true) {
            WeekdayCheck();
        }
    }
    //Dakikayı saate ve dakikaya çeviren fonksiyon(1)
    /*function secondsToTime(secs) {
        debugger;
        var STATE = $("input[name=YAZILIMCICHECK]").prop("checked");
        var HAFTASONUCHECKSTATE = $("input[name=HAFTASONUCHECK]").prop("checked");
        var HAFTAICICHECKSTATE = $("input[name=HAFTAICICHECK]").prop("checked");
        if (STATE == true || HAFTASONUCHECKSTATE == true) {
            var STATE = $("input[name=YAZILIMCICHECK]").prop("checked", false)
            var HAFTASONUCHECKSTATE = $("input[name=HAFTASONUCHECK]").prop("checked", false)
            var HAFTAICICHECKSTATE = $("input[name=HAFTAICICHECK]").prop("checked", false)
        }
        var divisor_for_minutes = secs % (60 * 60);
        var hours = Math.floor(divisor_for_minutes / 60);
        var divisor_for_seconds = divisor_for_minutes % 60;
        var minutes = Math.ceil(divisor_for_seconds);
        var obj = {
            "h": hours,
            "m": minutes
        };
        return obj;
    }*/
    function secondsToTime2(secs) {
        debugger;
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

    window.ProgrammerCheck = function () {

        var STATE = $("input[name=YAZILIMCICHECK]").prop("checked");
        var HAFTASONUCHECKSTATE = $("input[name=HAFTASONUCHECK]").prop("checked");

        $(".toplamServisSuresi").text("");
        $(".toplamUcretsizServisSuresi").text("");
        var sonucService;
        var sonucUService;

        if (STATE == true && (HAFTASONUCHECKSTATE == true || HAFTASONUCHECKSTATE == false)) {
            swal({
                title: "Bilgilendirme Mesajı",
                text: "Dikkat ! 'Servis Süresi' ve 'Ücretsiz Servis Süresi' 1.5 ile çarpılacaktır.",
                button: "Tamam",
            });
            sonucService = ($("#SELECTMANDAYID").val() * 1.5);
            sonucUService = ($("#SELECTMANDAYFREEID").val() * 1.5);
        }
        else if (STATE == false && HAFTASONUCHECKSTATE == true || HAFTASONUCHECKSTATE == false) {
            sonucService = ($("#SELECTMANDAYID").val() / 1.5);
            sonucUService = ($("#SELECTMANDAYFREEID").val() / 1.5);
        }

        $("#SELECTMANDAYID").val(sonucService);
        $("#SELECTMANDAYFREEID").val(sonucUService);

    /*******************************************/
        if ($("#SELECTMANDAYID").val() == 60 || $("#SELECTMANDAYID").val() > 60) {
            var obj = secondsToTime2(Math.round($("#SELECTMANDAYID").val()));
            if (obj.m > 0) {
                $(".toplamServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
            }
            else {
                $(".toplamServisSuresi").text("( " + obj.h + " sa" + ")");
            }
        }
        else {
            if ($("#SELECTMANDAYID").val() > 0) {
                $(".toplamServisSuresi").text("( " + ($("#SELECTMANDAYID").val()) + " " + " dk" + " )");
            }
        }
        if ($("#SELECTMANDAYFREEID").val() == 60 || $("#SELECTMANDAYFREEID").val() > 60) {
            var obj = secondsToTime2(Math.round($("#SELECTMANDAYFREEID").val()));

            if (obj.m > 0) {
                $(".toplamUcretsizServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
            }
            else {
                $(".toplamUcretsizServisSuresi").text("( " + obj.h + " sa" + " )");
            }
        }
        else {
            if ($("#SELECTMANDAYFREEID").val() > 0) {
                $(".toplamUcretsizServisSuresi").text("( " + ($("#SELECTMANDAYFREEID").val()) + " " + " dk" + " )");
            }
        }
        $("span").removeAttr("hidden");
    }
    

    window.WeekendCheck = function () {
        debugger;
        var YAZILIMCICHECKSTATE = $("input[name=YAZILIMCICHECK]").prop("checked");
        var STATE = $("input[name=HAFTASONUCHECK]").prop("checked");
        var STATE2 = $("input[name=HAFTAICICHECK]").prop("checked");
        $(".toplamServisSuresi").text("");
        $(".toplamUcretsizServisSuresi").text("");
        var sonucService;
        var sonucUService;
        if (STATE == true && (YAZILIMCICHECKSTATE == true || YAZILIMCICHECKSTATE == false) && STATE2 == false) {
            swal({
                title: "Bilgilendirme Mesajı",
                text: "Dikkat ! 'Servis Süresi' ve 'Ücretsiz Servis Süresi' 1.5 ile çarpılacaktır.",
                button: "Tamam",
            });
            sonucService = ($("#SELECTMANDAYID").val() * 1.5);
            sonucUService = ($("#SELECTMANDAYFREEID").val() * 1.5);
        }
        else if (STATE == false && (YAZILIMCICHECKSTATE == true || YAZILIMCICHECKSTATE == false)) {
            sonucService = ($("#SELECTMANDAYID").val() / 1.5);
            sonucUService = ($("#SELECTMANDAYFREEID").val() / 1.5);
        }


        $("#SELECTMANDAYID").val(sonucService);
        $("#SELECTMANDAYFREEID").val(sonucUService);

        /*******************************************/
        if ($("#SELECTMANDAYID").val() == 60 || $("#SELECTMANDAYID").val() > 60) {
            var obj = secondsToTime2(Math.round($("#SELECTMANDAYID").val()));
            if (obj.m > 0) {
                $(".toplamServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
            }
            else {
                $(".toplamServisSuresi").text("( " + obj.h + " sa" + ")");
            }
        }
        else {
            if ($("#SELECTMANDAYID").val() > 0) {
                $(".toplamServisSuresi").text("( " + ($("#SELECTMANDAYID").val()) + " " + " dk" + " )");
            }
        }
        if ($("#SELECTMANDAYFREEID").val() == 60 || $("#SELECTMANDAYFREEID").val() > 60) {
            var obj = secondsToTime2(Math.round($("#SELECTMANDAYFREEID").val()));

            if (obj.m > 0) {
                $(".toplamUcretsizServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
            }
            else {
                $(".toplamUcretsizServisSuresi").text("( " + obj.h + " sa" + " )");
            }
        }
        else {
            if ($("#SELECTMANDAYFREEID").val() > 0) {
                $(".toplamUcretsizServisSuresi").text("( " + ($("#SELECTMANDAYFREEID").val()) + " " + " dk" + " )");
            }
        }
        $("span").removeAttr("hidden");

    }
    window.WeekdayCheck = function () {
        debugger;
        var STATE = $("input[name=HAFTAICICHECK]").prop("checked");
        var STATE2 = $("input[name=HAFTASONUCHECK]").prop("checked");
        var YAZILIMCICHECKSTATE = $("input[name=YAZILIMCICHECK]").prop("checked");


        if (STATE == true && (YAZILIMCICHECKSTATE == true || YAZILIMCICHECKSTATE == false) && STATE2 == false) {
            swal({
                title: "Bilgilendirme Mesajı",
                text: "Dikkat ! 'Servis Süresi' ve 'Ücretsiz Servis Süresi' 1.5 ile çarpılacaktır.",
                button: "Tamam",
            });
            sonucService = ($("#SELECTMANDAYID").val() * 1.5);
            sonucUService = ($("#SELECTMANDAYFREEID").val() * 1.5);
        }
        else if (STATE == false && (YAZILIMCICHECKSTATE == true || YAZILIMCICHECKSTATE == false)) {
            sonucService = ($("#SELECTMANDAYID").val() / 1.5);
            sonucUService = ($("#SELECTMANDAYFREEID").val() / 1.5);
        }

        $("#SELECTMANDAYID").val(sonucService);
        $("#SELECTMANDAYFREEID").val(sonucUService);
        /*******************************************/
        if ($("#SELECTMANDAYID").val() == 60 || $("#SELECTMANDAYID").val() > 60) {
            var obj = secondsToTime2(Math.round($("#SELECTMANDAYID").val()));
            if (obj.m > 0) {
                $(".toplamServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
            }
            else {
                $(".toplamServisSuresi").text("( " + obj.h + " sa" + ")");
            }
        }
        else {
            if ($("#SELECTMANDAYID").val() > 0) {
                $(".toplamServisSuresi").text("( " + ($("#SELECTMANDAYID").val()) + " " + " dk" + " )");
            }
        }
        if ($("#SELECTMANDAYFREEID").val() == 60 || $("#SELECTMANDAYFREEID").val() > 60) {
            var obj = secondsToTime2(Math.round($("#SELECTMANDAYFREEID").val()));

            if (obj.m > 0) {
                $(".toplamUcretsizServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
            }
            else {
                $(".toplamUcretsizServisSuresi").text("( " + obj.h + " sa" + " )");
            }
        }
        else {
            if ($("#SELECTMANDAYFREEID").val() > 0) {
                $(".toplamUcretsizServisSuresi").text("( " + ($("#SELECTMANDAYFREEID").val()) + " " + " dk" + " )");
            }
        }
        $("span").removeAttr("hidden");

    }
});

