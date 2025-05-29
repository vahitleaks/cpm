
$(document).ready(function () {


    var manuelEnteredBaseTime = 0;
    var baseTime = 0;
    var weekDayCofficient = 1;
    var weekEndCofficient = 1;
    var programmerCofficient = 1;
    var selectedtCofficientCounter = 1;
    var manuelCofficient = 1; // todo
    var freeServiceTime = 0;
    var calculatedServiceTime = 0;
    var totalCofficient = 1;

    // INFO SPAN
    var dayDifference = 0;
    var minuteDifference = 0;

    window.isSavedForm = false;
    var savedBaseTime = 0;

    var isTimesValid = true;
    var isCreateToCpmParticipantChecked = false;

    function getBaseTime() {

        var manuelServiceTimeEntryIsChecked = $('input[name=manuelSetting]').prop('checked');
        if (manuelServiceTimeEntryIsChecked) {
            return manuelEnteredBaseTime;
        }

        var allDayIsChecked = $('input[name=allDAY]').prop('checked');

        var STARTDATE = $('input#SELECTSTARTDATE').val();
        var ENDDATE = $('input#SELECTENDDATE').val() == '' ? $('input#SELECTSTARTDATE').val() : $('input#SELECTENDDATE').val();


        if (allDayIsChecked) {
            var timeDifference = new Date(ENDDATE) - new Date(STARTDATE);
            dayDifference = parseInt(timeDifference / (1000 * 60 * 60 * 24)) + 1;

            $('input#SELECTSTARTDATE').val(STARTDATE.split('T')[0] + 'T09:00');
            $('input#SELECTENDDATE').val(ENDDATE.split('T')[0] + 'T18:00');

            if (timeDifference <= 0) {
                $('input#SELECTENDDATE').val(STARTDATE.split('T')[0] + 'T18:00');
                dayDifference = 1;
                return 360;
            }


            return dayDifference * 360;
        }

        minuteDifference = (new Date(ENDDATE).getTime() - new Date(STARTDATE).getTime()) / (1000 * 60);


        return minuteDifference;
    }

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

    function hoursAndMinutesInfoShow() {
        if (baseTime == 60 || baseTime > 60) {
            var obj = secondsToTime(baseTime);
            if (obj.m > 0) {
                $(".baseServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
            }
            else {
                $(".baseServisSuresi").text("( " + obj.h + " sa" + ")");
            }
        }
        else {
            if (baseTime >= 0) {
                $(".baseServisSuresi").text("( " + (baseTime) + " " + " dk" + " )");
            }
            else if (baseTime < 0) {
                $(".baseServisSuresi").text("( " + 0 + " " + " dk" + " )");
            }
        }
        if (freeServiceTime == 60 || freeServiceTime > 60) {
            var obj = secondsToTime(freeServiceTime);

            if (obj.m > 0) {
                $(".toplamUcretsizServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
            }
            else {
                $(".toplamUcretsizServisSuresi").text("( " + obj.h + " sa" + " )");
            }
        }
        else {
            if (freeServiceTime >= 0) {
                $(".toplamUcretsizServisSuresi").text("( " + (freeServiceTime) + " " + " dk" + " )");
            }
            else if (freeServiceTime < 0) {
                $(".toplamUcretsizServisSuresi").text("( " + 0 + " " + " dk" + " )");
            }
        }
        if (calculatedServiceTime == 60 || calculatedServiceTime > 60) {
            var obj = secondsToTime(calculatedServiceTime);
            if (obj.m > 0) {
                $(".toplamServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
            }
            else {
                $(".toplamServisSuresi").text("( " + obj.h + " sa" + ")");
            }
        }
        else {
            if (calculatedServiceTime >= 0) {
                $(".toplamServisSuresi").text("( " + (calculatedServiceTime) + " " + " dk" + " )");
            }
            else if (calculatedServiceTime < 0) {
                $(".toplamServisSuresi").text("( " + 0 + " " + " dk" + " )");
            }
        }
        $('.baseServisSuresi').removeAttr('hidden');
        $('.toplamServisSuresi').removeAttr('hidden');
        $('.toplamUcretsizServisSuresi').removeAttr('hidden');

    }

    window.setSavedFormParticipatorCount = function (numOfParrticipator) {
        savedFormParticipatorCount = numOfParrticipator;
    }

    function validateTimes() {
        if (baseTime < 0) {
            baseTime = 0;
            swalInfoShow('Servis Süresi Negatif Değer Olamaz!');
            isTimesValid = false;
        }
        else if (calculatedFreeServiceTime < 0) {
            calculatedFreeServiceTime = 0;
            freeServiceTime = 0;
            swalInfoShow('Ücretsiz Servis Süresi Negatif Değer Olamaz!');
            isTimesValid = false;
        }
        else if (baseTime < calculatedFreeServiceTime) {
            calculatedFreeServiceTime = 0;
            freeServiceTime = 0;
            swalInfoShow('Ücretsiz Servis Süresi Servis Süresinden Büyük Olamaz!');
            isTimesValid = false;
        }
        else {
            isTimesValid = true;
        }
    }

    window.calculateServiceTimeOnFocusout = function () {
        calculateServiceTime();
    }

    function calculateServiceTime() {
        if (!isSavedForm) {
            baseTime = getBaseTime();
            calculatedFreeServiceTime = freeServiceTime;
        }
        else {
            savedBaseTime = Math.floor(savedBaseTime);
            baseTime = savedBaseTime;
            calculatedFreeServiceTime = savedFreeServiceTime;
        }

        validateTimes();

        calculatedServiceTime = baseTime;

        calculatedServiceTime = calculatedServiceTime * weekDayCofficient;
        calculatedServiceTime = calculatedServiceTime * weekEndCofficient;
        calculatedServiceTime = calculatedServiceTime * programmerCofficient;
        calculatedServiceTime = calculatedServiceTime * manuelCofficient;

        calculatedFreeServiceTime = calculatedFreeServiceTime * weekDayCofficient;
        calculatedFreeServiceTime = calculatedFreeServiceTime * weekEndCofficient;
        calculatedFreeServiceTime = calculatedFreeServiceTime * programmerCofficient;
        calculatedFreeServiceTime = calculatedFreeServiceTime * manuelCofficient;

        calculatedServiceTime = calculatedServiceTime - calculatedFreeServiceTime;

        calculatedFreeServiceTime = Math.floor(calculatedFreeServiceTime);

        calculatedServiceTime = Math.floor(calculatedServiceTime);

        $('#BASESERVICETIME').val(baseTime <= 0 ? '' : baseTime);
        $('#BASEFREESERVICETIME').val(freeServiceTime <= 0 ? '' : freeServiceTime);
        $('#SELECTMANDAYFREEID').val(calculatedFreeServiceTime <= 0 ? '' : calculatedFreeServiceTime);
        $('#SELECTMANDAYID').val(calculatedServiceTime <= 0 ? '' : calculatedServiceTime);

        hoursAndMinutesInfoShow();
        checkBoxInfoMessage();
        totalServiceTimeInfoShow();
    }

    window.DatePickerChange = function () {
        if (isSavedForm) {
            isSavedForm = false;
            freeServiceTime = savedFreeServiceTime;
        }

        calculateServiceTime();
    }

    window.AllDayStateChange = function () {
        if (isSavedForm) {
            isSavedForm = false;
            freeServiceTime = savedFreeServiceTime;
        }

        calculateServiceTime();
    }

    window.ManuelServiceTimeEntry = function (time) {
        if (isSavedForm) {
            isSavedForm = false;
            freeServiceTime = savedFreeServiceTime;
        }

        manuelEnteredBaseTime = time;
        freeServiceTime = 0;
        calculateServiceTime();
    }

    window.ProgrammerCheck = function () {
        var isProgrammerCheckClick = $("input[name=YAZILIMCICHECK]").prop("checked");

        programmerCofficient = isProgrammerCheckClick ? 1.5 : 1;

        if (isProgrammerCheckClick) {
            swalInfoShow("Dikkat ! 'Servis Süresi' ve 'Ücretsiz Servis Süresi' 1.5 ile çarpılacaktır.");
            selectedtCofficientCounter++;
        } else {
            selectedtCofficientCounter--;
        }

        calculateServiceTime();
    }

    window.WeekEndAndWeekDayCheck = function () {
        var weekEndCheckCliked = $("input[name=HAFTASONUCHECK]").prop("checked");
        var weekDayCheckCliked = $("input[name=HAFTAICICHECK]").prop("checked");

        weekEndCofficient = weekEndCheckCliked ? 1.5 : 1;
        weekDayCofficient = weekDayCheckCliked ? 1.5 : 1;

        if (weekEndCheckCliked || weekDayCheckCliked) {
            swalInfoShow("Dikkat ! 'Servis Süresi' ve 'Ücretsiz Servis Süresi' 1.5 ile çarpılacaktır.");
            selectedtCofficientCounter++;
        } else {
            selectedtCofficientCounter--;
        }

        calculateServiceTime();
    }

    window.setParticipationCounter = function (counter) {
        participationCounter = counter;
        isCreateToCpmParticipantChecked = $('input[name=CreateFormToCpmPerson]').prop('checked');

        calculateServiceTime();
        //bilgi satırı ekle
    }

    window.setCofficients = function () {
        weekEndCofficient = $("input[name=HAFTASONUCHECK]").prop("checked") ? 1.5 : 1;

        if (weekEndCofficient > 1) {
            selectedtCofficientCounter++;
        }

        weekDayCofficient = $("input[name=HAFTAICICHECK]").prop("checked") ? 1.5 : 1;

        if (weekDayCofficient > 1) {
            selectedtCofficientCounter++;
        }

        programmerCofficient = $("input[name=YAZILIMCICHECK]").prop("checked") ? 1.5 : 1;

        if (programmerCofficient > 1) {
            selectedtCofficientCounter++;
        }
    }

    window.setSavedFormServiceTime = function (time) {
        savedBaseTime = time;

        savedBaseTime = savedBaseTime / weekDayCofficient;
        savedBaseTime = savedBaseTime / weekEndCofficient;
        savedBaseTime = savedBaseTime / programmerCofficient;
        savedBaseTime = savedBaseTime / manuelCofficient;

        savedBaseTime = Math.ceil(savedBaseTime);

        savedBaseTime = savedBaseTime + savedFreeServiceTime;
        baseTime = savedBaseTime;

        calculateServiceTime();
    }

    window.setSavedFormFreeServiceTime = function (time) {
        savedFreeServiceTime = time;

        savedFreeServiceTime = savedFreeServiceTime / weekDayCofficient;
        savedFreeServiceTime = savedFreeServiceTime / weekEndCofficient;
        savedFreeServiceTime = savedFreeServiceTime / programmerCofficient;
        savedFreeServiceTime = savedFreeServiceTime / manuelCofficient;

        savedFreeServiceTime = Math.ceil(savedFreeServiceTime);
        freeServiceTime = savedFreeServiceTime;
    }

    window.calculateFreeServiceTime = function (time) {
        if (isSavedForm) {
            savedFreeServiceTime = time;
            freeServiceTime = savedFreeServiceTime;
        } else {
            freeServiceTime = time;
        }

        calculateServiceTime();
    }

    $('#CreateToCpmParticipant').on('change', function () {
        participationCounter = 1;

        $("#CreateToCpmParticipant :selected").map(function (i, el) {
            participationCounter++;
        }).get();
        //calculateServiceTime();
    });

    function checkBoxInfoMessage() {
        if (selectedtCofficientCounter > 1 && isCreateToCpmParticipantChecked) {
            $('.checkboxInfo').removeAttr('hidden');
            $('.checkboxInfo').text('* Seçili tüm katılımcılar için servis süresi katsayılarla çarpılmaktadır!');
        }
        else {
            $('.checkboxInfo').attr('hidden', true);
        }

        if (isCreateToCpmParticipantChecked) {
            $('.selectParticipatorInfo').removeAttr('hidden');
            $('.selectParticipatorInfo').text('* Firmaya yansıtılacak servis süresi seçili katılımcı sayısı ile çarpılacaktır.');
        }
        else {
            $('.selectParticipatorInfo').attr('hidden', true);
        }
    }

    function totalServiceTimeInfoShow() {
        if ((calculatedServiceTime > 0 && isTimesValid) && (calculatedServiceTime != getBaseTime() || selectedtCofficientCounter > 1)) {
            $('.toplamServisSuresiInfo').removeAttr('hidden');

            var allDayIsChecked = $('input[name=allDAY]').prop('checked');
            var manuelServiceTimeEntryIsChecked = $('input[name=manuelSetting]').prop('checked');

            var YAZILIMCICHECKSTATE = $("input[name=YAZILIMCICHECK]").prop("checked");
            var HAFTASONUCHECKSTATE = $("input[name=HAFTASONUCHECK]").prop("checked");
            var HAFTAICICHECKSTATE = $("input[name=HAFTAICICHECK]").prop("checked");

            totalCofficient = weekEndCofficient * weekDayCofficient * programmerCofficient * manuelCofficient;

            var selectedCheckBoxCounter = 0;
            selectedCheckBoxCounter += (YAZILIMCICHECKSTATE ? 1 : 0);
            selectedCheckBoxCounter += (HAFTASONUCHECKSTATE ? 1 : 0);
            selectedCheckBoxCounter += (HAFTAICICHECKSTATE ? 1 : 0);

            if (allDayIsChecked && !isSavedForm) {
                totalServiceTimeInfoLabelText(selectedCheckBoxCounter, (freeServiceTime != 0 ? '( ' : '') + '( 360(dk) x ' + dayDifference + '(gün) ) ' + (freeServiceTime != 0 ? ('-' + freeServiceTime + '(dk) )') : ''), calculatedServiceTime);
            }
            else if (manuelServiceTimeEntryIsChecked && !isSavedForm) {
                totalServiceTimeInfoLabelText(selectedCheckBoxCounter, manuelEnteredBaseTime + (freeServiceTime != 0 ? ('-' + freeServiceTime) : '') + '(dk) ', calculatedServiceTime);
            }
            else if (isSavedForm) {
                totalServiceTimeInfoLabelText(selectedCheckBoxCounter, savedBaseTime + (savedFreeServiceTime != 0 ? ('-' + savedFreeServiceTime) : '') + '(dk)', calculatedServiceTime);
            }
            else {
                totalServiceTimeInfoLabelText(selectedCheckBoxCounter, minuteDifference + (freeServiceTime != 0 ? ('-' + freeServiceTime) : '') + '(dk) ', calculatedServiceTime);

            }
        }
        else {
            $('.toplamServisSuresiInfo').attr('hidden', true);
        }
    }

    function totalServiceTimeInfoLabelText(scbCounter, minute, time) {
        if ((scbCounter == 0 && calculatedServiceTime == 0) || (totalCofficient == 1 && baseTime == calculatedServiceTime) || calculatedServiceTime == 0) {
            $('.toplamServisSuresiInfo').attr('hidden', true);
        }
        else if (totalCofficient > 1) {
            $('.toplamServisSuresiInfo').text('* Servis süresi  ( ' + minute + ' ) x ' + totalCofficient + ' (katsayı) = ' + time + '(dk) olarak hesaplanmıştır.');
        }
        else {
            $('.toplamServisSuresiInfo').text('* Servis süresi ' + minute + ' = ' + time + '(dk) olarak hesaplanmıştır.');
        }
    }


    //var selectedPersonCounter = 1;
    //var selectedCheckBoxCounter = 0;

    //var STARTDATE;
    //var ENDDATE;
    //var DATESTART = [];
    //var DATEEND = [];

    //var timeDifference;
    //var minuteDifference;

    //var totalServiceTime;
    //var dayDifferenceParsed;


    //var allDAYCHECKSTATE;

    //function calculateServiceTime() {

    //    selectedCheckBoxCounter = 0;

    //    STARTDATE = $('input#SELECTSTARTDATE').val();
    //    ENDDATE = $('input#SELECTENDDATE').val();
    //    DATESTART = STARTDATE.split('T')[0];
    //    DATEEND = ENDDATE.split('T')[0];

    //    $('.toplamServisSuresiInfo').attr('hidden', false);

    //    allDAYCHECKSTATE = $("input[name=allDAY]").prop("checked");

    //    if (allDAYCHECKSTATE == true) {
    //        timeDifference = new Date(ENDDATE) - new Date(STARTDATE);

    //        var dayDifference = timeDifference / (1000 * 60 * 60 * 24);
    //        dayDifferenceParsed = parseInt(dayDifference) + 1;
    //        totalServiceTime = 360 * dayDifferenceParsed * selectedPersonCounter;

    //        $('.toplamServisSuresiInfo').text('* Servis süresi 360(dk) x ' + dayDifferenceParsed + '(gün) x ' + selectedPersonCounter + '(kişi) = ' + totalServiceTime + '(dk) olarak hesaplanmıştır.');


    //    } else {

    //        minuteDifference = (new Date(ENDDATE).getTime() - new Date(STARTDATE).getTime()) / (1000 * 60);
    //        totalServiceTime = minuteDifference * selectedPersonCounter;

    //        $('.toplamServisSuresiInfo').text('* Servis süresi ' + minuteDifference + '(dk) x ' + selectedPersonCounter + '(kişi) = ' + totalServiceTime + '(dk) olarak hesaplanmıştır.');



    //    }

    //    checkBoxInfoMessage();

    //    $("#SELECTMANDAYID").val(totalServiceTime);
    //}

    //function checkBoxInfoMessage() {
    //    if (selectedPersonCounter > 1) {
    //        $('.checkboxInfo').removeAttr('hidden');
    //        $('.checkboxInfo').text('* Seçili tüm kullanıcılar için servis süresi katsayılarla çarpılmaktadır!');
    //    }
    //    else {
    //        $('.checkboxInfo').attr('hidden', true);
    //    }

    //    var YAZILIMCICHECKSTATE = $("input[name=YAZILIMCICHECK]").prop("checked");
    //    var HAFTASONUCHECKSTATE = $("input[name=HAFTASONUCHECK]").prop("checked");
    //    var HAFTAICICHECKSTATE = $("input[name=HAFTAICICHECK]").prop("checked");

    //    selectedCheckBoxCounter += (YAZILIMCICHECKSTATE ? 1 : 0);
    //    selectedCheckBoxCounter += (HAFTASONUCHECKSTATE ? 1 : 0);
    //    selectedCheckBoxCounter += (HAFTAICICHECKSTATE ? 1 : 0);

    //    if (allDAYCHECKSTATE == true) {
    //        if (selectedCheckBoxCounter == 0) {
    //            $('.toplamServisSuresiInfo').text('* Servis süresi 360(dk) x ' + dayDifferenceParsed + '(gün) x ' + selectedPersonCounter + '(kişi) = ' + totalServiceTime + '(dk) olarak hesaplanmıştır.');
    //        }
    //        else if (selectedCheckBoxCounter == 1) {
    //            $('.toplamServisSuresiInfo').text('* Servis süresi ( 360(dk) x ' + dayDifferenceParsed + '(gün) x ' + selectedPersonCounter + '(kişi) ) x 1,5(katsayı) = ' + totalServiceTime * 1.5 + '(dk) olarak hesaplanmıştır.');
    //        }
    //        else {
    //            $('.toplamServisSuresiInfo').text('* Servis süresi ( 360(dk) x ' + dayDifferenceParsed + '(gün) x ' + selectedPersonCounter + '(kişi) ) x 2,25(katsayı) = ' + totalServiceTime * 2.25 + '(dk) olarak hesaplanmıştır.');
    //        }
    //    }
    //    else {
    //        if (selectedCheckBoxCounter == 0) {
    //            $('.toplamServisSuresiInfo').text('* Servis süresi ' + minuteDifference + '(dk) x ' + selectedPersonCounter + '(kişi) = ' + totalServiceTime + '(dk) olarak hesaplanmıştır.');
    //        }
    //        else if (selectedCheckBoxCounter == 1) {
    //            $('.toplamServisSuresiInfo').text('* Servis süresi ( ' + minuteDifference + '(dk) x ' + selectedPersonCounter + '(kişi) ) x 1,5(katsayı) = ' + totalServiceTime * 1.5 + '(dk) olarak hesaplanmıştır.');
    //        }
    //        else {
    //            $('.toplamServisSuresiInfo').text('* Servis süresi ( ' + minuteDifference + '(dk) x ' + selectedPersonCounter + '(kişi) ) x 2.25(katsayı) = ' + totalServiceTime * 2.25 + '(dk) olarak hesaplanmıştır.');
    //        }
    //    }
    //}

    //    window.ServiceTimeControl = function () {
    //        var STATE = $("input[name=YAZILIMCICHECK]").prop("checked");
    //        var HAFTASONUCHECKSTATE = $("input[name=HAFTASONUCHECK]").prop("checked");
    //        var HAFTAICICHECKSTATE = $("input[name=HAFTAICICHECK]").prop("checked");


    //        var FREESERVICETIME = $("#SELECTMANDAYFREEID").val() == '' ? 0 : parseInt($(" #SELECTMANDAYFREEID").val());//Ücretsiz Servis Süresi
    //        var allDAYCHECKSTATE = $("input[name=allDAY]").prop("checked");



    //        if (allDAYCHECKSTATE == true) {
    //            $("#SELECTMANDAYFREEID").val(0);
    //            var SERVICETIME = $("#SELECTMANDAYID").val();
    //            calculationService = SERVICETIME - FREESERVICETIME;//Ücretsiz Servis Süresi girildiğinde Servis Süresinden Çıkarır
    //            $("#SELECTMANDAYID").val(parseInt(calculationService));
    //            $("#SELECTMANDAYFREEID").val(parseInt(FREESERVICETIME));

    //            STARTDATE = $('input#SELECTSTARTDATE').val();
    //            ENDDATE = $('input#SELECTENDDATE').val();
    //            DATESTART = STARTDATE.split('T')[0];
    //            DATEEND = ENDDATE.split('T')[0];
    //            $('input#SELECTSTARTDATE').val(DATESTART + 'T09:00');
    //            $('input#SELECTENDDATE').val(DATEEND + 'T18:00');

    //            calculateServiceTime();

    //        }
    //        else if (allDAYCHECKSTATE == false) {
    //            $("#SELECTMANDAYID").val('');
    //            $("#SELECTMANDAYFREEID").val('');
    //            var BaslangicZamani = Date.parse($("input#SELECTSTARTDATE").val());//value start
    //            var BitisZamani = Date.parse($("input#SELECTENDDATE").val());//value end
    //            $(".toplamServisSuresi").text("");
    //            $(".toplamUcretsizServisSuresi").text("");
    //            let zamanFarki = BitisZamani - BaslangicZamani; //Seçilen Başlangıç ve Bitiş Zamanına Göre "Servis Süresini" hesaplar
    //            let toplamServisSuresi = Math.floor(zamanFarki / 1000 / 60); //Servis Süresini "Dakika" Cinsinden Verir
    //            calculationService = toplamServisSuresi - FREESERVICETIME;//Ücretsiz Servis Süresi girildiğinde Servis Süresinden Çıkarır
    //            $("#SELECTMANDAYID").val(parseInt(calculationService));
    //            $("#SELECTMANDAYFREEID").val(parseInt(FREESERVICETIME));

    //            calculateServiceTime();
    //        }
    //        /*******************************************/
    //        if ($("#SELECTMANDAYID").val() == 60 || $("#SELECTMANDAYID").val() > 60) {
    //            var obj = secondsToTime(Math.round($("#SELECTMANDAYID").val()));
    //            if (obj.m > 0) {
    //                $(".toplamServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
    //            }
    //            else {
    //                $(".toplamServisSuresi").text("( " + obj.h + " sa" + ")");
    //            }
    //        }
    //        else {
    //            if ($("#SELECTMANDAYID").val() > 0) {
    //                $(".toplamServisSuresi").text("( " + ($("#SELECTMANDAYID").val()) + " " + " dk" + " )");
    //            }
    //        }
    //        if ($("#SELECTMANDAYFREEID").val() == 60 || $("#SELECTMANDAYFREEID").val() > 60) {
    //            var obj = secondsToTime(Math.round($("#SELECTMANDAYFREEID").val()));

    //            if (obj.m > 0) {
    //                $(".toplamUcretsizServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
    //            }
    //            else {
    //                $(".toplamUcretsizServisSuresi").text("( " + obj.h + " sa" + " )");
    //            }
    //        }
    //        else {
    //            if ($("#SELECTMANDAYFREEID").val() > 0) {
    //                $(".toplamUcretsizServisSuresi").text("( " + ($("#SELECTMANDAYFREEID").val()) + " " + " dk" + " )");
    //            }
    //        }
    //        $("span").removeAttr("hidden");
    //        if (STATE == true) {
    //            ProgrammerCheck();
    //        }
    //        if (HAFTASONUCHECKSTATE == true) {
    //            WeekendCheck();
    //        }
    //        if (HAFTAICICHECKSTATE == true) {
    //            WeekdayCheck();
    //        }
    //    }

    //    $('#CreateToCpmParticipant').on('change', function () {
    //        selectedPersonCounter = 1;
    //        $("#CreateToCpmParticipant :selected").map(function (i, el) {
    //            selectedPersonCounter++;
    //        }).get();
    //        calculateServiceTime();
    //    });

    //    function getDayDifference(start, end) {
    //        const msInDay = 24 * 60 * 60 * 1000; // Bir günün milisaniye cinsinden değeri
    //        return Math.floor((end - start) / msInDay); // Gün farkını hesaplayın
    //    }

    //    //Dakikayı saate ve dakikaya çeviren fonksiyon(1)
    //    function secondsToTime(secs) {
    //        var divisor_for_minutes = secs % (60 * 60);
    //        var hours = Math.floor(divisor_for_minutes / 60);
    //        var divisor_for_seconds = divisor_for_minutes % 60;
    //        var minutes = Math.ceil(divisor_for_seconds);
    //        var obj = {
    //            "h": hours,
    //            "m": minutes
    //        };
    //        return obj;
    //    }

    //    window.ProgrammerCheck = function () {
    //        var STATE = $("input[name=YAZILIMCICHECK]").prop("checked");
    //        var HAFTASONUCHECKSTATE = $("input[name=HAFTASONUCHECK]").prop("checked");
    //        $(".toplamServisSuresi").text("");
    //        $(".toplamUcretsizServisSuresi").text("");
    //        var sonucService;
    //        var sonucUService;

    //        if (STATE == true && (HAFTASONUCHECKSTATE == true || HAFTASONUCHECKSTATE == false)) {
    //            swal({
    //                title: "Bilgilendirme Mesajı",
    //                text: "Dikkat ! 'Servis Süresi' ve 'Ücretsiz Servis Süresi' 1.5 ile çarpılacaktır.",
    //                button: "Tamam",
    //            });
    //            sonucService = ($("#SELECTMANDAYID").val() * 1.5);
    //            sonucUService = ($("#SELECTMANDAYFREEID").val() * 1.5);
    //        }
    //        else if (STATE == false && HAFTASONUCHECKSTATE == true || HAFTASONUCHECKSTATE == false) {
    //            sonucService = ($("#SELECTMANDAYID").val() / 1.5);
    //            sonucUService = ($("#SELECTMANDAYFREEID").val() / 1.5);
    //        }

    //        $("#SELECTMANDAYID").val(sonucService);
    //        $("#SELECTMANDAYFREEID").val(sonucUService);

    //        /*******************************************/
    //        if ($("#SELECTMANDAYID").val() == 60 || $("#SELECTMANDAYID").val() > 60) {
    //            var obj = secondsToTime(Math.round($("#SELECTMANDAYID").val()));
    //            if (obj.m > 0) {
    //                $(".toplamServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
    //            }
    //            else {
    //                $(".toplamServisSuresi").text("( " + obj.h + " sa" + ")");
    //            }
    //        }
    //        else {
    //            if ($("#SELECTMANDAYID").val() > 0) {
    //                $(".toplamServisSuresi").text("( " + ($("#SELECTMANDAYID").val()) + " " + " dk" + " )");
    //            }
    //        }
    //        if ($("#SELECTMANDAYFREEID").val() == 60 || $("#SELECTMANDAYFREEID").val() > 60) {
    //            var obj = secondsToTime(Math.round($("#SELECTMANDAYFREEID").val()));

    //            if (obj.m > 0) {
    //                $(".toplamUcretsizServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
    //            }
    //            else {
    //                $(".toplamUcretsizServisSuresi").text("( " + obj.h + " sa" + " )");
    //            }
    //        }
    //        else {
    //            if ($("#SELECTMANDAYFREEID").val() > 0) {
    //                $(".toplamUcretsizServisSuresi").text("( " + ($("#SELECTMANDAYFREEID").val()) + " " + " dk" + " )");
    //            }
    //        }
    //        $("span").removeAttr("hidden");
    //        checkBoxInfoMessage(); 
    //    }

    //    window.WeekendCheck = function () {
    //        debugger;
    //        var YAZILIMCICHECKSTATE = $("input[name=YAZILIMCICHECK]").prop("checked");
    //        var STATE = $("input[name=HAFTASONUCHECK]").prop("checked");
    //        var STATE2 = $("input[name=HAFTAICICHECK]").prop("checked");
    //        $(".toplamServisSuresi").text("");
    //        $(".toplamUcretsizServisSuresi").text("");
    //        var sonucService;
    //        var sonucUService;
    //        if (STATE == true && (YAZILIMCICHECKSTATE == true || YAZILIMCICHECKSTATE == false) && STATE2 == false) {
    //            swal({
    //                title: "Bilgilendirme Mesajı",
    //                text: "Dikkat ! 'Servis Süresi' ve 'Ücretsiz Servis Süresi' 1.5 ile çarpılacaktır.",
    //                button: "Tamam",
    //            });
    //            sonucService = ($("#SELECTMANDAYID").val() * 1.5);
    //            sonucUService = ($("#SELECTMANDAYFREEID").val() * 1.5);
    //        }
    //        else if (STATE == false && (YAZILIMCICHECKSTATE == true || YAZILIMCICHECKSTATE == false)) {
    //            sonucService = ($("#SELECTMANDAYID").val() / 1.5);
    //            sonucUService = ($("#SELECTMANDAYFREEID").val() / 1.5);
    //        }


    //        $("#SELECTMANDAYID").val(sonucService);
    //        $("#SELECTMANDAYFREEID").val(sonucUService);

    //        /*******************************************/
    //        if ($("#SELECTMANDAYID").val() == 60 || $("#SELECTMANDAYID").val() > 60) {
    //            var obj = secondsToTime(Math.round($("#SELECTMANDAYID").val()));
    //            if (obj.m > 0) {
    //                $(".toplamServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
    //            }
    //            else {
    //                $(".toplamServisSuresi").text("( " + obj.h + " sa" + ")");
    //            }
    //        }
    //        else {
    //            if ($("#SELECTMANDAYID").val() > 0) {
    //                $(".toplamServisSuresi").text("( " + ($("#SELECTMANDAYID").val()) + " " + " dk" + " )");
    //            }
    //        }
    //        if ($("#SELECTMANDAYFREEID").val() == 60 || $("#SELECTMANDAYFREEID").val() > 60) {
    //            var obj = secondsToTime(Math.round($("#SELECTMANDAYFREEID").val()));

    //            if (obj.m > 0) {
    //                $(".toplamUcretsizServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
    //            }
    //            else {
    //                $(".toplamUcretsizServisSuresi").text("( " + obj.h + " sa" + " )");
    //            }
    //        }
    //        else {
    //            if ($("#SELECTMANDAYFREEID").val() > 0) {
    //                $(".toplamUcretsizServisSuresi").text("( " + ($("#SELECTMANDAYFREEID").val()) + " " + " dk" + " )");
    //            }
    //        }
    //        $("span").removeAttr("hidden");
    //        checkBoxInfoMessage(); 
    //    }

    //    window.WeekdayCheck = function () {
    //        debugger;
    //        var STATE = $("input[name=HAFTAICICHECK]").prop("checked");
    //        var STATE2 = $("input[name=HAFTASONUCHECK]").prop("checked");
    //        var YAZILIMCICHECKSTATE = $("input[name=YAZILIMCICHECK]").prop("checked");


    //        if (STATE == true && (YAZILIMCICHECKSTATE == true || YAZILIMCICHECKSTATE == false) && STATE2== false) {
    //            swal({
    //                title: "Bilgilendirme Mesajı",
    //                text: "Dikkat ! 'Servis Süresi' ve 'Ücretsiz Servis Süresi' 1.5 ile çarpılacaktır.",
    //                button: "Tamam",
    //            });
    //            sonucService = ($("#SELECTMANDAYID").val() * 1.5);
    //            sonucUService = ($("#SELECTMANDAYFREEID").val() * 1.5);
    //        }
    //        else if (STATE == false && (YAZILIMCICHECKSTATE == true || YAZILIMCICHECKSTATE == false)) {
    //            sonucService = ($("#SELECTMANDAYID").val() / 1.5);
    //            sonucUService = ($("#SELECTMANDAYFREEID").val() / 1.5);
    //        }

    //        $("#SELECTMANDAYID").val(sonucService);
    //        $("#SELECTMANDAYFREEID").val(sonucUService);
    //        /*******************************************/
    //        if ($("#SELECTMANDAYID").val() == 60 || $("#SELECTMANDAYID").val() > 60) {
    //            var obj = secondsToTime(Math.round($("#SELECTMANDAYID").val()));
    //            if (obj.m > 0) {
    //                $(".toplamServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
    //            }
    //            else {
    //                $(".toplamServisSuresi").text("( " + obj.h + " sa" + ")");
    //            }
    //        }
    //        else {
    //            if ($("#SELECTMANDAYID").val() > 0) {
    //                $(".toplamServisSuresi").text("( " + ($("#SELECTMANDAYID").val()) + " " + " dk" + " )");
    //            }
    //        }
    //        if ($("#SELECTMANDAYFREEID").val() == 60 || $("#SELECTMANDAYFREEID").val() > 60) {
    //            var obj = secondsToTime(Math.round($("#SELECTMANDAYFREEID").val()));

    //            if (obj.m > 0) {
    //                $(".toplamUcretsizServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
    //            }
    //            else {
    //                $(".toplamUcretsizServisSuresi").text("( " + obj.h + " sa" + " )");
    //            }
    //        }
    //        else {
    //            if ($("#SELECTMANDAYFREEID").val() > 0) {
    //                $(".toplamUcretsizServisSuresi").text("( " + ($("#SELECTMANDAYFREEID").val()) + " " + " dk" + " )");
    //            }
    //        }
    //        $("span").removeAttr("hidden");
    //        checkBoxInfoMessage();
    //}

});

