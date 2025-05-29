$(document).ready(function () {
    //#region Servis ve Ücretiz Süresini Saat Cinsinden Yazdırma
    var SERVICETIME = $("#SERVICETIME").attr("data-id");
    var FREESERVICETIME = $("#FREESERVICETIME").attr("data-id");
    if (SERVICETIME == 60 || SERVICETIME > 60) {
        var obj = secondsToTime(Math.round(SERVICETIME));
        if (obj.m > 0)
        {
            $(".toplamServisSuresi #serviceTimeFont").text( " " + obj.h + " saat" + " " + obj.m + " dakika");
        }
        else
        {
            $(".toplamServisSuresi #serviceTimeFont").text( " " + obj.h + " saat" );
        }   
    }
    else {
        if (SERVICETIME > 0)
        {
            $(".toplamServisSuresi #serviceTimeFont").text( " " + (SERVICETIME) + " " + "dakika");
        }  
    }
    if (FREESERVICETIME == 60 || FREESERVICETIME > 60) {
        var obj = secondsToTime(Math.round(FREESERVICETIME));
        if (obj.m > 0) {
            $(".toplamUcretsizServisSuresi #freeserviceTimeFont").text( " " + obj.h + " saat" + " " + obj.m + " dakika");
        }
        else {
            $(".toplamUcretsizServisSuresi #freeserviceTimeFont").text(" "+ obj.h + " saat");
        }       
    }
    else {
        if (FREESERVICETIME > 0) {
            $(".toplamUcretsizServisSuresi #freeserviceTimeFont").text(" " + (FREESERVICETIME) + " " + "dakika");
        }      
    }
    $("span").removeAttr("hidden");
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
    //#endregion

});