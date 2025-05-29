$(document).ready(function () {
    FloatingTextarea();
    //#region Sayfa Açıldığında- Dakika Saat cinsinden göster
    //Dakikayı saate ve dakikaya çeviren fonksiyon(2)
    function secondsToTime3(secs) {
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
    var SERVICETIME = Number($("#SELECTMANDAYID").val());
    var FREESERVICETIME = Number($("#SELECTMANDAYFREEID").val());
    if ($("#SELECTMANDAYID").val() == 60 || $("#SELECTMANDAYID").val() > 60) {
        var obj = secondsToTime3(Math.round(SERVICETIME));
        $(".toplamServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
    }
    else {
        $(".toplamServisSuresi").text("( " + (SERVICETIME) + " " + "dk" + " )");
    }
    if (FREESERVICETIME == 60 || FREESERVICETIME > 60) {
        var obj = secondsToTime3(Math.round(FREESERVICETIME));
        $(".toplamUcretsizServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
    }
    else {
        $(" .toplamUcretsizServisSuresi").text("( " + (FREESERVICETIME) + " " + "dk" + " )");
    }
    $(".toplamServisSuresi .toplamUcretsizServisSuresi").removeAttr("hidden");
    //#endregion
    $('.selectpicker').selectpicker();
    $("#SELECTSUPPORTTYPEID  option:selected").hide();
    $("#SELECTSERVICETYPEID  option:selected").hide();
    $("#SELECTMANDAYID  option:selected").hide();
    $("#SELECTMANDAYFREEID option:selected").hide();
    $("#SELECTINFOEMAIL  option:selected").hide();
    //#region Input ve Selectbox Kontrolleri
    function inputControl(üstDiv) {

        $(üstDiv + " .inputValidateControl").each(function () {
            if ($(this).val() == "") {
                $(this).attr("style", "border:1px solid var(--thRed)!important;border-radius:6px;padding-top:7px;padding-bottom:7px;");
            }
            else {
                $(this).attr("style", "border:1px solid var(--thGreen)!important;border-radius:6px;padding-top:7px;padding-bottom:7px;");
            }
        });
    }
    function selectControl(üstDiv) {
        $(üstDiv + " .selectValidateControl").each(function () {
            if ($(this).find('option:selected').val() == "" || $(this).find('option:selected').val() == 0 || $(this).find('option:selected').length < 1) {
                $(this).attr("style", "border:1px solid var(--thRed)!important; border-radius:6px");
            }
            else {
                $(this).attr("style", "border:1px solid var(--thGreen)!important; border-radius:6px");
            }
        });
    }
    //#endregion
    // #region Yapilanlar Satır Ekle
    $('body').on('click', '#addRowYapilanlar', function () {
        var satirEkle = '<div class="card p-3 mb-2" id="yapilanlarCard" style="background-color:var(--thBG);border:none!important">\
            <div class="mb-3"><span class="" style="color:var(--thTitle);font-size: 12px !important;font-weight: bold;padding-left: 10px!important;">Talep Eden Kişi</span><br />\
                <input type="text" style="padding-top: 7px; padding-bottom: 7px;" class="datetime-local  Input-Medium mt-2 inputValidateControl col-10" id="GETREQUESTER" placeholder="Yazınız...">\
                    <i class="icon sc-trash-bin p-2 mr-2 float-right Label-Red" id="deleteYapilanlarCard"></i></div><div class="mb-3"><span class="" style="color:var(--thTitle);font-size: 12px !important;font-weight: bold;padding-left: 10px!important;">\
                        Talep Edilen Konu</span><input type="text" style="padding-top: 7px; padding-bottom: 7px;" class="datetime-local col-12 Input-Medium mt-2 inputValidateControl" id="GETREQUESTEDSUBJECT" placeholder="Yazınız...">\
                    </div><span style="color:var(--thTitle);font-size: 12px !important;font-weight: bold;padding-left: 10px!important;">Yapılan İş Özeti</span>\
                    <div class="form-floating"><textarea class=" form-control inputValidateControl" id="GETWORKDONESUMMARY"></textarea><label for="floatingTextarea">İş Özetiniz...</label></div></div>';
        $("#ANACARDYAPILAN").append(satirEkle);
        FloatingTextarea();

    });
    $("body").on("click", "#deleteYapilanlarCard", function () {
        $(this).parents("#yapilanlarCard:not(':first-child')").remove();
    });
    // #endregion
    // #region Yeni E-posta Ekle
    $('body').on('click', '#addNewEmail', function () {
        var satirEkle = '<div class="card p-2 EmailCards mb-2" style="background-color:var(--thBG);border:none!important;" id="emailCard">\
                <div class="row mb-3"><div class="col-lg-10"><span class="" style="color:var(--thTitle);font-size: 12px !important;font-weight: bold;padding-left: 10px!important;">Ad-Soyad\
                 </span><br><input type="text" class="Input-Medium mt-2 getName col-12" id="GETNAME" placeholder="Yazınız..."></div><div class="col-1 my-auto">\
                 <input class="form-check-input my-auto" type="radio" name="exampleRadios" id="SendEmailFormPerson"></div><div class="col-1 my-auto pt-4">\
                  <i class="icon sc-trash-bin Label-Red" id="deleteEmailCard"></i></div></div><div class="mb-3">\
                 <span class="" style="color:var(--thTitle);font-size: 12px !important;font-weight: bold;padding-left: 10px!important;">E-Posta</span>\
                   <input type="email" class="datetime-local col-12 Input-Medium mt-2 inputValidateControl getmail" id="GETEMAIL" placeholder="Örn : isim@mail.com" aria-describedby="emailHelp"></div></div>';
        $("#emailAnaCard").append(satirEkle);
    });
    $("body").on("click", "#deleteEmailCard", function () {
        $(this).parents("#emailCard").remove();
    });
    // #endregion
    // #region Firmaya Ait Sozlesmeleri Getir
    try {
        $("body").on("change", "#SELECTSERVICEFORMCOMPANYID", function () {
            var COMPANYID = $("#SELECTSERVICEFORMCOMPANYID option:selected").val();
            var COMPANY = $("#SELECTSERVICEFORMCOMPANYID option:selected").text();
            var SELECTCONTRACTID = $("#SELECTCONTRACTID");
            if (COMPANYID != "" && COMPANY != "Seçiniz") {
                $.ajax({
                    url: '/CpmServisSistemi/GetCompanyContract',
                    type: 'POST',
                    dataType: 'json',
                    data: { 'COMPANYID': COMPANYID },
                    success: function (data) {
                        SELECTCONTRACTID.empty();
                        SELECTCONTRACTID.append('<option value="" selected>Seçiniz</option>');
                        $.each(data.CompanyContracts, function (index, option) {
                            SELECTCONTRACTID.append('<option value=' + option.Value + '>' + option.Text.toString() + '</option>');
                        });
                    }
                });
            }
        });
    }
    catch (error) {
        console.error(error);
    }
    // #endregion
    // #region Yetkili E-postası Getir
    try {
        $("body").on("change", "#SELECTINFOEMAIL", function () {
            var COMPANYID = $("#SELECTSERVICEFORMCOMPANYID option:selected").attr("data-hesapkod");
            //var COMPANYID = $("#SELECTSERVICEFORMCOMPANYID option:selected").val();
            var COMPANY = $(" #SELECTSERVICEFORMCOMPANYID option:selected").text();
            var ID = $("#SELECTINFOEMAIL option:selected").val();
            var YETKILI = $(" #SELECTINFOEMAIL option:selected").text();
            var SELECTEMAILADDRESS = $("#SELECTEMAILADDRESS");
            SELECTEMAILADDRESS.val("");
            if (COMPANYID != "" && COMPANY != "Seçiniz" && ID != "" && YETKILI != "Seçiniz") {
                $.ajax({
                    url: '/CpmServisSistemi/GetAuthorizedEmail',
                    type: 'POST',
                    dataType: 'json',
                    data: { 'COMPANYID': COMPANYID, 'ID': ID },
                    success: function (data) {
                        SELECTEMAILADDRESS.html("");
                        $.each(data.AuthorizedEmail, function (index, k) {
                            SELECTEMAILADDRESS.val(k.Text);
                        });
                    }
                });
            }
        });
    }
    catch (error) {
        console.error(error);
    }
    // #endregion
    //#region Uzaktan Servis Formu Update
    $('body').on('click', ' #RemoteServiceFormSaveButton', function () {
        var PROGRAMMERSTATE = $("input[name=YAZILIMCICHECK]").prop("checked");
        var WEEKENDSTATE = $("input[name=HAFTASONUCHECK]").prop("checked");
        var WEEKDAYSTATE = $("input[name=HAFTAICICHECK]").prop("checked");
        var ALLDAYSTATE = $("input[name=allDAY]").prop("checked");
        var MANUELCHECKSTATE = $("input[name=manuelSetting]").prop("checked");
        var REQUESTER = [];
        var REQUESTEDSUBJECT = [];
        var WORKDONESUMMARY = [];





        var EMAILS = [];
        var NAMESURNAME = [];
        var SERVICEFORMCONFIRMPERSONEMAIL;
        var SERVICEFORMCONFIRMPERSONFULLNAME;
        var COMPANYID = $("#SELECTSERVICEFORMCOMPANYID option:selected").val();
        var COMPANYCONTRACT = $("#SELECTCONTRACTID option:selected").text();
        var COMPANYCONTRACTID = $("#SELECTCONTRACTID option:selected").attr("data-id");
        var SERVICETYPEID = $("#SELECTSERVICETYPEID option:selected").val();
        var SUPPORTTYPE = $("#SELECTSUPPORTTYPEID option:selected").text();
        var SERVICETIME = $("#SELECTMANDAYID").val() == '' ? 0 : parseInt($("#SELECTMANDAYID").val());//Servis Süresi
        var FREESERVICETIME = $("#SELECTMANDAYFREEID").val() == '' ? 0 : parseInt($("#SELECTMANDAYFREEID").val());//Ücretsiz Servis Süresi
        var CALCULATIONPARAMETER = $("#HESAPKATSAYISI").val() == '' ? 0 : parseFloat($("#HESAPKATSAYISI").val());//Hesaplama Katsayısı
        var STARTDATE = $("#SELECTSTARTDATE").val();
        var ENDDATE = $("#SELECTENDDATE").val();
        var AUTHORIZEDNO = $("#SELECTINFOEMAIL option:selected").val();
        var authorizedname = $("#SELECTINFOEMAIL option:selected").text().trim();
        var AUTHORIZEDNAME = authorizedname == 'Seçiniz' ? '' : authorizedname;
        //İşlem Seçimi      
        var ID = [];
        var TotalServiceSelection = 0;
        $("#SelectServiceSelection  :selected").map(function (i, el) {
            ID.push($(el).val());
            TotalServiceSelection += parseInt($(el).attr("data-id"));
        }).get();
        PROCESSDETAILS = "";
        for (var i = 0; i < ID.length; i++) {
            PROCESSDETAILS = PROCESSDETAILS + ID[i];
            if (i != ID.length - 1) {
                PROCESSDETAILS = PROCESSDETAILS + ",";
            }
        }
        var sy = 0;
        var sy2 = 0;
        var mailCont = "";
        if ($("#SELECTEMAILADDRESS").val() != '') {
            if (isValidEmailAddress($("#SELECTEMAILADDRESS").val()) == false) {
                sy2 = 1;
            }
        }
        var AUTHORIZEDMAIL = $(" #SELECTEMAILADDRESS").val();//Bilgi E-posta Adresi
        //E-Posta Bilgilendirme - Birden fazla Email
        $(".EmailCards").each(function () {
            if ($(this).find("#GETEMAIL").val() != '') {
                if (isValidEmailAddress($(this).find("#GETEMAIL").val()) == false) {
                    sy++;
                    mailCont = mailCont + " , " + $(this).find("#GETEMAIL").val();
                }
            }
            EMAILS.push($(this).find("#GETEMAIL").val());
        });
        //Birden fazla E-posta bilgilendirme Ad-Soyad
        $(".EmailCards").each(function () {
            NAMESURNAME.push($(this).find("#GETNAME").val());
        });
        //Uzaktan Service Form Onay Mailinin Gideceği Kişi
        var EMAILISCHECK;
        var email;
        var namesurname;
        $("#emailAnaCard .EmailCards .form-check-input").each(function (index) {
            if ($(this).prop("checked") == true) {
                email = ($(this).parents(".EmailCards").find(".getmail").val());
                namesurname = ($(this).parents(".EmailCards").find(".getName").val());
                EMAILISCHECK = ($(this).prop("checked"));
            }
        });
        if (EMAILISCHECK == true) {
            SERVICEFORMCONFIRMPERSONEMAIL = email;
            SERVICEFORMCONFIRMPERSONFULLNAME = namesurname;
        }
        else if (EMAILISCHECK != true && AUTHORIZEDMAIL != '') {
            SERVICEFORMCONFIRMPERSONEMAIL = AUTHORIZEDMAIL;
            SERVICEFORMCONFIRMPERSONFULLNAME = AUTHORIZEDNAME;
        }
        //Birden fazla Yapilan İs
        $("#ANACARDYAPILAN  #yapilanlarCard").each(function () {
            REQUESTER.push($(this).find("#GETREQUESTER").val());
            REQUESTEDSUBJECT.push($(this).find("#GETREQUESTEDSUBJECT").val());
            WORKDONESUMMARY.push($(this).find("#GETWORKDONESUMMARY").val());
        });
        //Proje Kontrol Alanı
        if (SERVICETYPEID == "3") {
            var PROJECTID = $("#SelectProject option:selected").val() == '' ? 0 : $("#SelectProject option:selected").val(); //Proje seçimi
            var STEPID = $("#SelectProjectSteps option:selected").val() == '' ? 0 : $("#SelectProjectSteps option:selected").val();//Proje Adımları
        }
        //Ana Group/Alt Group Kontrol Alanı
        else if (SERVICETYPEID == "2") {
            var MAINPROCESS = $("#MainProcess option:selected").val() == '' ? 0 : $("#MainProcess option:selected").text().trim(); //Ana Group
            var SUBPROCESS = $("#SubProcess option:selected").val() == '' ? 0 : $("#SubProcess option:selected").text().trim();//Alt Group
        }
        //Zorunlu Alan Kontrolleri
        if (sy > 0) {
            toastr.error("Geçersiz email adresleri: " + mailCont);
        }
        else if (sy2 == 1) {
            toastr.error("Bilgi E- Posta Adresi Geçersiz!");
        }
        else if (SERVICETIME != 0 && SERVICETIME < 10) {

            swal('10 dakikadan az Servis Süresi girilemez',
                {
                    title: "UYARI !",
                    icon: "warning",
                    buttons: "Tamam",
                });


        }
        else if (SUPPORTTYPE == "" || SERVICETYPEID == "" || REQUESTER == "" || REQUESTEDSUBJECT == "" || WORKDONESUMMARY == "" || PROJECTID == 0 || STEPID == 0 || MAINPROCESS == 0 || SUBPROCESS == 0) {
            swal('Lütfen kırmızı alanları  doldurunuz!',
                {
                    title: "UYARI !",
                    icon: "warning",
                    buttons: "Tamam",

                });
            inputControl("");
            selectControl("");
        }
        else if (NAMESURNAME.includes('') == true && EMAILS.includes('') != true) {
            swal('Lütfen "E-Posta Bilgilendirme" kısmından "Ad-Soyad" bilgisi giriniz!',
                {
                    title: "UYARI !",
                    icon: "warning",
                    buttons: "Tamam",
                });
        }
        else if (SERVICETIME < TotalServiceSelection) {
            swal('Servis Süresi, "İşlem Seçimi" süresinden küçük olamaz!',
                {
                    title: "UYARI !",
                    icon: "warning",
                    buttons: "Tamam",
                });
        }
        else if (SERVICETIME != 0 && SERVICETIME < 10) {

            swal('10 dakikadan az Servis Süresi girilemez',
                {
                    title: "UYARI !",
                    icon: "warning",
                    buttons: "Tamam",
                });
        }
        else {
            var serviceTime = $('#SELECTMANDAYID').val() == "" ? 0 : $('#SELECTMANDAYID').val();
            var freeServiceTime = $('#SELECTMANDAYFREEID').val() == "" ? 0 : $('#SELECTMANDAYFREEID').val();
            if (serviceTime > 360) {
                swal({
                    title: "Bilgilendirme!",
                    text: "\n  Servis Süresi: " + serviceTime + " dk \n Ücretsiz Servis Süresi: " + freeServiceTime + " dk \n\n Girilen Servis sürelerini onaylıyor musun?\n",
                    icon: "info",
                    buttons: true,
                    buttons: ['Vazgeç', 'Onayla']
                }).then((result) => {
                    if (result) {
                        $.blockUI({
                            message: '<lottie-player autoplay  loop mode="normal" src="/Scripts/LottieFiles/cpm-loading-sc.json" style="width: 320px"></lottie-player>',
                        });
                        $.ajax({
                            type: 'POST',
                            url: "/CpmServisSistemi/RemoteServiceFormUpdate",
                            dataType: "json",
                            data:
                            {
                                'COMPANYID': COMPANYID, 'COMPANYCONTRACTID': COMPANYCONTRACTID, 'COMPANYCONTRACT': COMPANYCONTRACT, 'SERVICETYPEID': SERVICETYPEID,
                                'SERVICETIME': SERVICETIME, 'FREESERVICETIME': FREESERVICETIME, 'SUPPORTTYPE': SUPPORTTYPE, 'STARTDATE': STARTDATE,
                                'ENDDATE': ENDDATE, 'AUTHORIZEDNO': AUTHORIZEDNO,
                                'AUTHORIZEDNAME': AUTHORIZEDNAME, 'AUTHORIZEDMAIL': AUTHORIZEDMAIL,
                                'REQUESTER': REQUESTER, 'REQUESTEDSUBJECT': REQUESTEDSUBJECT, 'WORKDONESUMMARY': WORKDONESUMMARY, 'NAMESURNAME': NAMESURNAME, 'EMAILS': EMAILS,
                                'SERVICEFORMCONFIRMPERSONFULLNAME': SERVICEFORMCONFIRMPERSONFULLNAME, 'SERVICEFORMCONFIRMPERSONEMAIL': SERVICEFORMCONFIRMPERSONEMAIL,
                                'PROGRAMMERSTATE': PROGRAMMERSTATE, 'WEEKENDSTATE': WEEKENDSTATE, 'WEEKDAYSTATE': WEEKDAYSTATE, 'CALCULATIONPARAMETER': CALCULATIONPARAMETER, 'ALLDAYSTATE': ALLDAYSTATE, 'MANUELCHECKSTATE': MANUELCHECKSTATE,
                                'PROJECTID': PROJECTID, 'STEPID': STEPID, 'PROCESSDETAILS': PROCESSDETAILS, 'MAINPROCESS': MAINPROCESS, 'SUBPROCESS': SUBPROCESS
                            },
                            success: function (result) {
                                if (result.IsSuccess == true) {
                                    setTimeout($.unblockUI, 300);
                                    window.location = "/CpmServisSistemi/UzaktanServisFormuMailGonderOnizleme";
                                    toastr.success(result.Message);
                                }
                                else {
                                    window.location = "/CpmServisSistemi/UzaktanServisKaydet";
                                    toastr.error(result.Message);
                                }
                            },
                            error: function (xhr) {
                                alert('error');
                            }
                        });

                    }
                })
            }
            else {
                $.blockUI({
                    message: '<lottie-player autoplay  loop mode="normal" src="/Scripts/LottieFiles/cpm-loading-sc.json" style="width: 320px"></lottie-player>',
                });
                $.ajax({
                    type: 'POST',
                    url: "/CpmServisSistemi/RemoteServiceFormUpdate",
                    dataType: "json",
                    data:
                    {
                        'COMPANYID': COMPANYID, 'COMPANYCONTRACTID': COMPANYCONTRACTID, 'COMPANYCONTRACT': COMPANYCONTRACT, 'SERVICETYPEID': SERVICETYPEID,
                        'SERVICETIME': SERVICETIME, 'FREESERVICETIME': FREESERVICETIME, 'SUPPORTTYPE': SUPPORTTYPE, 'STARTDATE': STARTDATE,
                        'ENDDATE': ENDDATE, 'AUTHORIZEDNO': AUTHORIZEDNO,
                        'AUTHORIZEDNAME': AUTHORIZEDNAME, 'AUTHORIZEDMAIL': AUTHORIZEDMAIL,
                        'REQUESTER': REQUESTER, 'REQUESTEDSUBJECT': REQUESTEDSUBJECT, 'WORKDONESUMMARY': WORKDONESUMMARY, 'NAMESURNAME': NAMESURNAME, 'EMAILS': EMAILS,
                        'SERVICEFORMCONFIRMPERSONFULLNAME': SERVICEFORMCONFIRMPERSONFULLNAME, 'SERVICEFORMCONFIRMPERSONEMAIL': SERVICEFORMCONFIRMPERSONEMAIL,
                        'PROGRAMMERSTATE': PROGRAMMERSTATE, 'WEEKENDSTATE': WEEKENDSTATE, 'WEEKDAYSTATE': WEEKDAYSTATE, 'CALCULATIONPARAMETER': CALCULATIONPARAMETER, 'ALLDAYSTATE': ALLDAYSTATE, 'MANUELCHECKSTATE': MANUELCHECKSTATE,
                        'PROJECTID': PROJECTID, 'STEPID': STEPID, 'PROCESSDETAILS': PROCESSDETAILS, 'MAINPROCESS': MAINPROCESS, 'SUBPROCESS': SUBPROCESS
                    },
                    success: function (result) {
                        if (result.IsSuccess == true) {
                            setTimeout($.unblockUI, 300);
                            window.location = "/CpmServisSistemi/UzaktanServisFormuMailGonderOnizleme";
                            toastr.success(result.Message);
                        }
                        else {
                            window.location = "/CpmServisSistemi/UzaktanServisKaydet";
                            toastr.error(result.Message);
                        }
                    },
                    error: function (xhr) {
                        alert('error');
                    }
                });

            }

        }
    });


    //#region Servis kontrol ekranında dönen hata mesajları
    window.swalInfoShow = function (message) {
        swal(message,
            {
                title: "UYARI !",
                icon: "warning",
                buttons: "Tamam",
            });
    }
    //#endregion

    //#region  Yazılımcı checkbox tıklandığında
    $("body").on("click", "input[name=YAZILIMCICHECK]", function () {
        ProgrammerCheck();
    });
    //#endregion

    //#region  Hafta sonu checkbox tıklandığında
    $("body").on("click", "input[name=HAFTASONUCHECK]", function () {
        if (this.checked) {
            $("#HAFTAICICHECK").prop('checked', false);
        }
        WeekEndAndWeekDayCheck();
    });
    //#endregion

    //#region  Hafta içi checkbox tıklandığında
    $("body").on("click", "input[name=HAFTAICICHECK]", function () {
        if (this.checked) {
            $("#HAFTASONUCHECK").prop('checked', false);
        }
        WeekEndAndWeekDayCheck();
    });
    //#endregion

    //#region  Başlangıç  ve Bitiş Zamanı değiştirme işlemi sona erdiğinde zamanı kontrol eder
    $("#SELECTENDDATE,#SELECTSTARTDATE").focusout(function () {
        var BaslangicZamani = new Date($("input#SELECTSTARTDATE").val());
        var BitisZamani = new Date($("input#SELECTENDDATE").val());
        if (BaslangicZamani >= BitisZamani) {
            swal('Başlangıç Zamanı, Bitiş Zamanından küçük olmalıdır !',
                {
                    title: "UYARI !",
                    icon: "warning",
                    buttons: "Tamam",
                });
        }
    });
    //#endregion


    //#region Servis Süresi Girildiğinde 
    //window.servicetime = 0;
    //$("body").on("keyup", "#SELECTMANDAYID", function () {
    //    var manuelCHECKSTATE = $("input[name=manuelSetting]").prop("checked");
    //    if (manuelCHECKSTATE == true) {
    //        servicetime = $(this).val();
    //    }
    //});
    //#endregion

    //#region Ücretsiz Servis Süresi Girildiğinde - Saat ve Dakika Hesaplama
    //window.servicetime = 0;
    $("#BASEFREESERVICETIME").keyup(function () {
        calculateFreeServiceTime($('#BASEFREESERVICETIME').val() == '' ? 0 : parseInt($('#BASEFREESERVICETIME').val()));
    });

    $("#BASESERVICETIME").keyup(function () {
        ManuelServiceTimeEntry($('#BASESERVICETIME').val() == '' ? 0 : parseInt($('#BASESERVICETIME').val()));
    });
    //#endregion

    //#region Tüm Gün CheckBox Tıklandığında
    $("body").on("click", "input[name=allDAY]", function () {
        $("input#SELECTENDDATE").val();
        $("input#SELECTSTARTDATE").val();
        if ($('input[name=allDAY]').prop('checked') == true) {
            $("input[name=manuelSetting]").prop("checked", false);
            $("#BASESERVICETIME").prop("disabled", true);
            $("#BASESERVICETIME").removeAttr("style", "background-color:#fff");
            $('.servisSuresiInfoSpan').attr('hidden', true); // TODO ÇALIŞMIYOR
        }
        AllDayStateChange();
    });
    //#endregion

    //#region Dakika İşlemleri
    $("#SELECTENDDATE,#SELECTSTARTDATE").change(function () {
        var BaslangicZamani = new Date($("input#SELECTSTARTDATE").val());
        var BitisZamani = new Date($("input#SELECTENDDATE").val());
        let zamanFarki = BitisZamani - BaslangicZamani; //Seçilen Başlangıç ve Bitiş Zamanına Göre "Servis Süresini" hesaplar
        let toplamServisSuresi = Math.floor(zamanFarki / 1000 / 60); //Servis Süresini "Dakika" Cinsinden Verir
        if (toplamServisSuresi > 0) {
            DatePickerChange();
        }
    });

    $("#SELECTENDDATE,#SELECTSTARTDATE").focusout(function () {
        var BaslangicZamani = new Date($("input#SELECTSTARTDATE").val());
        var BitisZamani = new Date($("input#SELECTENDDATE").val());
        if (BaslangicZamani > BitisZamani) {

            swal('Başlangıç Zamanı, Bitiş Zamanından küçük olmalıdır !',
                {
                    title: "UYARI !",
                    icon: "warning",
                    buttons: "Tamam",
                });
            DatePickerChange();
        }
    });
    //#endregion


    //#region Manuel Giriş CheckBox Tıklandığında
    $("body").on("click", "input[name=manuelSetting]", function () {
        var manuelCHECKSTATE = $("input[name=manuelSetting]").prop("checked");
        if (manuelCHECKSTATE == true) {
            $('input[name=allDAY]').prop('checked', false);
            $("#BASESERVICETIME").prop("disabled", false);
            $("#BASESERVICETIME").attr("style", "background-color:#f2f6f7");
            $('.servisSuresiInfoSpan').attr('hidden', false);
        }
        else {
            $("#BASESERVICETIME").prop("disabled", true);
            $("#BASESERVICETIME").removeAttr("style", "background-color:#fff");
            $('.servisSuresiInfoSpan').attr('hidden', true);
        }
    });


    ////#endregion
    //$("body").on("click", "input[name=YAZILIMCICHECK]", function () {
    //    ProgrammerCheck();
    //});
    ////#endregion
    ////#region  Hafta sonu checkbox tıklandığında

    //$("body").on("click", "input[name=HAFTASONUCHECK]", function () {
    //    if (this.checked) {
    //        $("#HAFTAICICHECK").prop('checked', false);
    //    }
    //    WeekEndAndWeekDayCheck();
    //});
    ////#endregion
    ////#region  Hafta içi checkbox tıklandığında
    //$("body").on("click", "input[name=HAFTAICICHECK]", function () {
    //    if (this.checked) {
    //        $("#HAFTASONUCHECK").prop('checked', false);
    //    }
    //    WeekEndAndWeekDayCheck();
    //});
    ////#endregion

    ////#region  Başlangıç  ve Bitiş Zamanı değiştiğinde zamanı kontrol eder
    //$("#SELECTENDDATE,#SELECTSTARTDATE").focusout(function () {
    //    var BaslangicZamani = new Date($("input#SELECTSTARTDATE").val());
    //    var BitisZamani = new Date($("input#SELECTENDDATE").val());
    //    if (BaslangicZamani > BitisZamani) {
    //        swal('Başlangıç Zamanı, Bitiş Zamanından küçük olmalıdır !',
    //            {
    //                title: "UYARI !",
    //                icon: "warning",
    //                buttons: "Tamam",
    //            });
    //    }
    //});
    ////#endregion
    ////#region Servis kontrol ekranında dönen hata mesajları
    //window.swalInfoShow = function (message) {
    //    swal(message,
    //        {
    //            title: "UYARI !",
    //            icon: "warning",
    //            buttons: "Tamam",
    //        });
    //}
    ////#endregion

    ////#region  Yazılımcı checkbox tıklandığında
    //$("body").on("click", "input[name=YAZILIMCICHECK]", function () {
    //    ProgrammerCheck();
    //});
    ////#endregion

    ////#region  Hafta sonu checkbox tıklandığında
    //$("body").on("click", "input[name=HAFTASONUCHECK]", function () {
    //    if (this.checked) {
    //        $("#HAFTAICICHECK").prop('checked', false);
    //    }
    //    WeekEndAndWeekDayCheck();
    //});
    ////#endregion

    ////#region  Hafta içi checkbox tıklandığında
    //$("body").on("click", "input[name=HAFTAICICHECK]", function () {
    //    if (this.checked) {
    //        $("#HAFTASONUCHECK").prop('checked', false);
    //    }
    //    WeekEndAndWeekDayCheck();
    //});
    ////#endregion

    ////#region  Başlangıç  ve Bitiş Zamanı değiştirme işlemi sona erdiğinde zamanı kontrol eder
    //$("#SELECTENDDATE,#SELECTSTARTDATE").focusout(function () {
    //    var BaslangicZamani = new Date($("input#SELECTSTARTDATE").val());
    //    var BitisZamani = new Date($("input#SELECTENDDATE").val());
    //    if (BaslangicZamani > BitisZamani) {
    //        swal('Başlangıç Zamanı, Bitiş Zamanından küçük olmalıdır !',
    //            {
    //                title: "UYARI !",
    //                icon: "warning",
    //                buttons: "Tamam",
    //            });
    //    }
    //});
    ////#endregion


    ////#region Servis Süresi Girildiğinde 
    ////window.servicetime = 0;
    ////$("body").on("keyup", "#SELECTMANDAYID", function () {
    ////    var manuelCHECKSTATE = $("input[name=manuelSetting]").prop("checked");
    ////    if (manuelCHECKSTATE == true) {
    ////        servicetime = $(this).val();
    ////    }
    ////});
    ////#endregion

    ////#region Ücretsiz Servis Süresi Girildiğinde - Saat ve Dakika Hesaplama
    ////window.servicetime = 0;
    //$("body").on("keydown", "#SELECTMANDAYFREEID", function (event) {
    //    if (event.keyCode === 13) {
    //        calculateFreeServiceTime($('#SELECTMANDAYFREEID').val() == '' ? 0 : parseInt($('#SELECTMANDAYFREEID').val()));
    //    }
    //});
    ////#endregion

    ////#region Tüm Gün CheckBox Tıklandığında
    //$("body").on("click", "input[name=allDAY]", function () {
    //    $("input#SELECTENDDATE").val();
    //    $("input#SELECTSTARTDATE").val();
    //    if ($('input[name=allDAY]').prop('checked') == true) {
    //        $("input[name=manuelSetting]").prop("checked", false);
    //        $("#SELECTMANDAYID").prop("disabled", true);
    //        $("#SELECTMANDAYID").removeAttr("style", "background-color:#fff");
    //        $('.servisSuresiInfoSpan').attr('hidden', true); // TODO ÇALIŞMIYOR
    //    }
    //    AllDayStateChange();
    //});
    ////#endregion

    ////#region Dakika İşlemleri
    //$("#SELECTENDDATE,#SELECTSTARTDATE").change(function () {
    //    var BaslangicZamani = new Date($("input#SELECTSTARTDATE").val());
    //    var BitisZamani = new Date($("input#SELECTENDDATE").val());
    //    let zamanFarki = BitisZamani - BaslangicZamani; //Seçilen Başlangıç ve Bitiş Zamanına Göre "Servis Süresini" hesaplar
    //    let toplamServisSuresi = Math.floor(zamanFarki / 1000 / 60); //Servis Süresini "Dakika" Cinsinden Verir
    //    if (toplamServisSuresi > 0) {
    //        DatePickerChange();
    //    }
    //});

    //$("#SELECTENDDATE,#SELECTSTARTDATE").focusout(function () {
    //    var BaslangicZamani = new Date($("input#SELECTSTARTDATE").val());
    //    var BitisZamani = new Date($("input#SELECTENDDATE").val());
    //    if (BaslangicZamani > BitisZamani) {

    //        swal('Başlangıç Zamanı, Bitiş Zamanından küçük olmalıdır !',
    //            {
    //                title: "UYARI !",
    //                icon: "warning",
    //                buttons: "Tamam",
    //            });
    //        DatePickerChange();
    //    }
    //});
    ////#endregion


    ////#region Manuel Giriş CheckBox Tıklandığında
    //$("body").on("click", "input[name=manuelSetting]", function () {
    //    var manuelCHECKSTATE = $("input[name=manuelSetting]").prop("checked");
    //    if (manuelCHECKSTATE == true) {
    //        $('input[name=allDAY]').prop('checked', false);
    //        $("#SELECTMANDAYID").prop("disabled", false);
    //        $("#SELECTMANDAYID").attr("style", "background-color:#f2f6f7");
    //        $('.servisSuresiInfoSpan').attr('hidden', false);
    //    }
    //    else {
    //        $("#SELECTMANDAYID").prop("disabled", true);
    //        $("#SELECTMANDAYID").removeAttr("style", "background-color:#fff");
    //        $('.servisSuresiInfoSpan').attr('hidden', true);
    //    }
    //});

    ////Manuel Giriş düzenleme işlemi bittikten sonra 
    //$("body").on("keydown", "#SELECTMANDAYID", function (event) {
    //    if (event.keyCode === 13) {
    //        ManuelServiceTimeEntry($('#SELECTMANDAYID').val() == '' ? 0 : parseInt($('#SELECTMANDAYID').val()));
    //    }
    //});
    ////#endregion

    //#region  Yazılımcı checkbox tıklandığında

    ////#region  Yazılımcı checkbox tıklandığında
    //$("body").on("click", "input[name=YAZILIMCICHECK]", function () {
    //    ProgrammerCheck();
    //});
    ////#endregion
    ////#region  Hafta sonu checkbox tıklandığında
    //$("body").on("click", "input[name=HAFTASONUCHECK]", function () {
    //    if (this.checked) {
    //        if ($("#HAFTAICICHECK").prop("checked")) {
    //            $("#SELECTMANDAYID").val(($("#SELECTMANDAYID").val() / 1.5));
    //            $("#SELECTMANDAYFREEID").val(($("#SELECTMANDAYFREEID").val() / 1.5));
    //        }
    //        $("#HAFTAICICHECK").prop('checked', false);
    //    }
    //    WeekendCheck();
    //});
    ////#endregion
    ////#region  Hafta içi checkbox tıklandığında
    //$("body").on("click", "input[name=HAFTAICICHECK]", function () {
    //    debugger;
    //    if (this.checked) {
    //        if ($("#HAFTASONUCHECK").prop("checked")) {
    //            $("#SELECTMANDAYID").val(($("#SELECTMANDAYID").val() / 1.5));
    //            $("#SELECTMANDAYFREEID").val(($("#SELECTMANDAYFREEID").val() / 1.5));
    //        }
    //        $("#HAFTASONUCHECK").prop('checked', false);
    //    }
    //    WeekdayCheck();
    //});
    ////#endregion


    //#region Tüm Gün CheckBox Tıklandığında



    //$("body").on("click", "input[name=allDAY]", function () {
    //    ServiceTimeControl();
    //});
    //#endregion


    //#region Ücretsiz Servis Süresi Girildiğinde - Saat ve Dakika Hesaplama
    //window.freeservicetime = $("#SELECTMANDAYFREEID").val();
    //$("body").on("keyup", "#SELECTMANDAYFREEID", function () {
    //    var manuelCHECKSTATE = $("input[name=manuelSetting]").prop("checked");
    //    var FREESERVICETIME = $("#SELECTMANDAYFREEID").val() == '' ? 0 : parseInt($(" #SELECTMANDAYFREEID").val());//Ücretsiz Servis Süresi
    //    var HAFTASONUCHECKSTATE = $("input[name=HAFTASONUCHECK]").prop("checked");
    //    var HAFTAICICHECKSTATE = $("input[name=HAFTAICICHECK]").prop("checked");
    //    var YAZILIMCICHECKSTATE = $("input[name=YAZILIMCICHECK]").prop("checked");
    //    if (HAFTASONUCHECKSTATE == true && HAFTAICICHECKSTATE == true && YAZILIMCICHECKSTATE == true && FREESERVICETIME != 0) {
    //        swal({
    //            title: "Bilgilendirme Mesajı",
    //            text: "Doğru hesaplama işlemi için ilk olarak 'Yazılımcı', 'Hafta içi' ve 'Haftasonu' seçimini kaldırmalısınız.",
    //            button: "Tamam",
    //        });
    //        $("#SELECTMANDAYFREEID").val(window.freeservicetime);
    //    }
    //    else if (HAFTASONUCHECKSTATE == false &&HAFTAICICHECKSTATE==false && YAZILIMCICHECKSTATE == true && FREESERVICETIME != 0) {
    //        swal({
    //            title: "Bilgilendirme Mesajı",
    //            text: "Doğru hesaplama işlemi için ilk olarak 'Yazılımcı', 'Hafta içi' ve 'Haftasonu' seçimini kaldırmalısınız.",
    //            button: "Tamam",
    //        });

    //        var sonuc = window.freeservicetime / 1.5;
    //        $("#SELECTMANDAYFREEID").val(sonuc);
    //    }
    //    else if (HAFTASONUCHECKSTATE == true && HAFTAICICHECKSTATE == true && YAZILIMCICHECKSTATE == false && FREESERVICETIME != 0) {
    //        swal({
    //            title: "Bilgilendirme Mesajı",
    //            text: "Doğru hesaplama işlemi için ilk olarak 'Yazılımcı' , 'Hafta içi' ve 'Haftasonu' seçimini kaldırmalısınız.",
    //            button: "Tamam",
    //        });
    //        var sonuc = window.freeservicetime / 1.5;
    //        $("#SELECTMANDAYFREEID").val(sonuc);
    //    }
    //    else if (HAFTASONUCHECKSTATE == true && HAFTAICICHECKSTATE == false && YAZILIMCICHECKSTATE == true && FREESERVICETIME != 0) {
    //        swal({
    //            title: "Bilgilendirme Mesajı",
    //            text: "Doğru hesaplama işlemi için ilk olarak 'Yazılımcı' , 'Hafta içi' ve 'Haftasonu' seçimini kaldırmalısınız.",
    //            button: "Tamam",
    //        });
    //        var sonuc = window.freeservicetime / 1.5;
    //        $("#SELECTMANDAYFREEID").val(sonuc);
    //    }
    //    else if (HAFTASONUCHECKSTATE == true && HAFTAICICHECKSTATE == false && YAZILIMCICHECKSTATE == false && FREESERVICETIME != 0) {
    //        swal({
    //            title: "Bilgilendirme Mesajı",
    //            text: "Doğru hesaplama işlemi için ilk olarak 'Yazılımcı' , 'Hafta içi' ve 'Haftasonu' seçimini kaldırmalısınız.",
    //            button: "Tamam",
    //        });
    //        var sonuc = window.freeservicetime / 1.5;
    //        $("#SELECTMANDAYFREEID").val(sonuc);
    //    }
    //    else if (HAFTASONUCHECKSTATE == false && HAFTAICICHECKSTATE == false && YAZILIMCICHECKSTATE == false && FREESERVICETIME != 0) {
    //        swal({
    //            title: "Bilgilendirme Mesajı",
    //            text: "Doğru hesaplama işlemi için ilk olarak 'Yazılımcı' , 'Hafta içi' ve 'Haftasonu' seçimini kaldırmalısınız.",
    //            button: "Tamam",
    //        });
    //        var sonuc = window.freeservicetime / 1.5;
    //        $("#SELECTMANDAYFREEID").val(sonuc);
    //    }


    //    else {
    //        if (manuelCHECKSTATE == true) {
    //            ManuelServiceTimeControl(servicetime);
    //        }
    //        else {
    //            ServiceTimeControl();
    //        }
    //    }
    //});
    //#endregion
    //#region Dakika İşlemleri


    //$("#SELECTENDDATE,#SELECTSTARTDATE").change(function () {
    //    var HAFTASONUCHECKSTATE = $("input[name=HAFTASONUCHECK]").prop("checked");
    //    var HAFTAICICHECKSTATE = $("input[name=HAFTAICICHECK]").prop("checked");
    //    var YAZILIMCICHECKSTATE = $("input[name=YAZILIMCICHECK]").prop("checked");
    //    if (HAFTASONUCHECKSTATE == true && YAZILIMCICHECKSTATE == true && HAFTAICICHECKSTATE == true) {
    //        swal({
    //            title: "Bilgilendirme Mesajı",
    //            text: "Doğru hesaplama işlemi için ilk olarak 'Yazılımcı' , 'Haftasonu' ve 'Hafta içi' seçimini kaldırmalısınız.",
    //            button: "Tamam",
    //        });
    //    }

    //    else
    //    {
    //        var BaslangicZamani = new Date($("input#SELECTSTARTDATE").val());
    //        var BitisZamani = new Date($("input#SELECTENDDATE").val());
    //        let zamanFarki = BitisZamani - BaslangicZamani; //Seçilen Başlangıç ve Bitiş Zamanına Göre "Servis Süresini" hesaplar
    //        let toplamServisSuresi = Math.floor(zamanFarki / 1000 / 60); //Servis Süresini "Dakika" Cinsinden Verir
    //        if (toplamServisSuresi > 0) {
    //            var manuelCHECKSTATE = $("input[name=manuelSetting]").prop("checked");

    //            if (manuelCHECKSTATE == false) {
    //                servicetime = toplamServisSuresi;
    //            }
    //            ServiceTimeControl();
    //        }
    //        else {
    //            $("#SELECTMANDAYID").val(0);
    //        }
    //    }
    //});
    //#endregion

    //#region Manuel Giriş CheckBox Tıklandığında



    //$("body").on("click", "input[name=manuelSetting]", function () {
    //    var manuelCHECKSTATE = $("input[name=manuelSetting]").prop("checked");
    //    if (manuelCHECKSTATE == true) {
    //        $("#SELECTMANDAYID").prop("disabled", false);
    //        $("#SELECTMANDAYID").attr("style", "background-color:#f2f6f7");
    //    }
    //    else {
    //        $("#SELECTMANDAYID").prop("disabled", true);
    //        $("#SELECTMANDAYID").removeAttr("style", "background-color:#fff");
    //    }
    //});
    //#endregion

    //#region  Başlangıç  ve Bitiş Zamanı değiştiğinde zamanı kontrol eder
    //$("#SELECTENDDATE,#SELECTSTARTDATE").focusout(function () {
    //    var BaslangicZamani = new Date($("input#SELECTSTARTDATE").val());
    //    var BitisZamani = new Date($("input#SELECTENDDATE").val());
    //    if (BaslangicZamani > BitisZamani) {
    //        swal('Başlangıç Zamanı, Bitiş Zamanından küçük olmalıdır !',
    //            {
    //                title: "UYARI !",
    //                icon: "warning",
    //                buttons: "Tamam",
    //            });
    //    }
    //});
    //#endregion
});