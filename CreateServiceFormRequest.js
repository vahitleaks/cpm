$(document).ready(function () {

    FloatingTextarea();
    // #region CPM Standardı Olusturulacak Konu Yeni Satır Ekle
    $('body').on('click', '#addNewRowKonu', function () {
        var satirEkle = '<div class="row pt-3 pb-3 mb-2" id="NewKonu" style="background-color:var(--thBG);border-radius:6px;"><div class="col-lg-3 col-md-6 col-sm-12">\
                    <span class="" style="color:var(--thTitle);font-size: 12px !important;font-weight: bold;padding-left: 10px!important;">Konu Başlığı</span>\
                    <input type="text" class="col-12 Input-Medium mt-2" id="GETTOPICTITLE" placeholder="Yazınız..." style="padding-top: 7px; padding-bottom: 7px;">\
                     </div><div class="col-lg-3 col-md-6 col-sm-12">\
                        <span class="" style="color:var(--thTitle);font-size: 12px !important;font-weight: bold;padding-left: 10px!important;">Uygulanacak Modül</span>\
                        <input type="text" class="col-12 Input-Medium mt-2" id="GETMODULE" placeholder="Yazınız..." style="padding-top: 7px; padding-bottom: 7px;">\
                         </div><div class="col-lg-5 col-md-6 col-sm-12"><span class="" style="color:var(--thTitle);font-size: 12px !important;font-weight: bold;padding-left: 10px!important;">Konu Detayı</span>\
                            <input type="text" class="col-12 Input-Medium mt-2" id="GETSUBJECTDETAIL" placeholder="Yazınız..." style="padding-top: 7px; padding-bottom: 7px;"></div>\
                            <div class="col-lg-1 col-md-1 col-sm-12 my-4"><i class="icon sc-trash-bin p-2 ml-2 float-right Label-Red" id="deleteKonu"></i></div></div>';
        $("#flush-collapseTwo .accordion-body").append(satirEkle);
    });

    $("body").on("click", "#deleteKonu", function () {
        $(this).parents("#NewKonu:not(':first-child')").remove();
    });
    // #endregion
    // #region CPM Standardı Oluşturulacak Rapor Ekle
    $('body').on('click', '#addNewRowRapor', function () {
        var satirEkle = '<div class="row pt-3 pb-3 mb-2" id="NewReport" style="background-color:var(--thBG);border-radius:6px;">\
                <div class="col-lg-3 col-md-6 col-sm-12"><span class="" style="color:var(--thTitle);font-size: 12px !important;font-weight: bold;padding-left: 10px!important;">Rapor Adı</span>\
                    <input type="text" class="col-12 Input-Medium mt-2" id="GETREPORTNAME" placeholder="Yazınız..." style="padding-top: 7px; padding-bottom: 7px;">\
                </div><div class="col-lg-3 col-md-6 col-sm-12"><span class="" style="color:var(--thTitle);font-size: 12px !important;font-weight: bold;padding-left: 10px!important;">Uygulanacak Modül</span>\
                        <input type="text" class="col-12 Input-Medium mt-2" id="GETREPORTMODULE" placeholder="Yazınız..." style="padding-top: 7px; padding-bottom: 7px;">\
                </div><div class="col-lg-5 col-md-6 col-sm-12"><span class="" style="color:var(--thTitle);font-size: 12px !important;font-weight: bold;padding-left: 10px!important;">Açıklama</span>\
                            <input type="text" class="col-12 Input-Medium mt-2" id="GETREPORTDESCRIPTION" placeholder="Yazınız..." style="padding-top: 7px; padding-bottom: 7px;"></div>\
                            <div class="col-lg-1 col-md-1 col-sm-12 my-4"><i class="icon sc-trash-bin p-2 ml-2 float-right Label-Red" id="deleteReport"></i></div></div>';
        $("#flush-collapseThree .accordion-body").append(satirEkle);
    });

    $("body").on("click", "#deleteReport", function () {
        $(this).parents("#NewReport:not(':first-child')").remove();
    });

    // #endregion
    //#region Plana bağlı Servis Form Açıldığında otomatik servis süresi hesaplar
    window.WindowModel = {
        ServiceTime: 0,
        FreeServiceTime: 0,
        ManuelInput: false,
        AllDay: false
    }
    //Dakikayı saate ve dakikaya çeviren fonksiyon(1)
    function secondsToTime2(secs) {
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
    /************************************************/
    var start = Date.parse($("input#SELECTSTARTDATE").val());//value start
    var end = Date.parse($("input#SELECTENDDATE").val());//value end
    totalHours = NaN;
    if (start < end) {
        let msDifference = end - start;
        let minutes = Math.floor(msDifference / 1000 / 60);
        $("#SELECTMANDAYID").val(minutes);
        $("#SELECTMANDAYFREEID").val("");
        var SERVICETIME = Number($("#SELECTMANDAYID").val());
        if ($("#SELECTMANDAYID").val() == 60 || $("#SELECTMANDAYID").val() > 60) {
            var obj = secondsToTime2(Math.round(SERVICETIME));
            $(".toplamServisSuresi").text("( " + obj.h + " sa" + " " + obj.m + " dk" + " )");
        }
        else {
            $(".toplamServisSuresi").text("( " + (SERVICETIME) + " " + "dk" + " )");
        }
        $("span").removeAttr("hidden");
    }
    //#endregion
    $('.selectpicker').selectpicker();
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
    // #region Gunun Tarihini ve Saatini Getirme
    try {
        /*Günün tarihini alma ve formatlama) */
        Date.prototype.getValidFormat = function () {
            var hours = this.getHours();
            var minute = this.getMinutes();
            var ay = this.getMonth() + 1;
            var gun = this.getDate();
            var yil = this.getFullYear();
            return yil + "-" + (ay < 10 ? "0" + ay : ay) + "-" + (gun < 10 ? "0" + gun : gun) + "T" + (hours < 10 ? "0" + hours : hours) + ":" + (minute < 10 ? "0" + minute : minute); //Gün ve ay 10 dan küçükse başına 0 gelir
        };
        var date = new Date();
        $(".tarihGetir").val(date.getValidFormat());
    } catch (error) {
        console.error(error);
    }
    // #endregion
    // #region Servis Form - Firmaya İl-İlçe Bilgisi Getir
    try {
        $("body").on("change", "#SELECTSERVICEFORMCOMPANYID", function () {

            var COMPANYID = $("#SELECTSERVICEFORMCOMPANYID option:selected").val();
            var COMPANY = $("#SELECTSERVICEFORMCOMPANYID option:selected").text();
            var PROVINCEID = $("#SELECTPROVINCEID");
            var DISTRICTNAME = $("#SELECTDISTRICTID");
            if (COMPANYID != "" && COMPANY != "Seçiniz") {
                $.ajax({
                    url: '/CpmServisSistemi/GetCompanyProvinceAndDistrict',
                    type: 'POST',
                    dataType: 'json',
                    data: { 'COMPANYID': COMPANYID },
                    success: function (data) {
                        $('#PROVINCEID option').last().remove();
                        $.each(data, function (index, option) {
                            if (option.ILAD == null) {
                                PROVINCEID.append('<option selected>Seçiniz</option>');
                                DISTRICTNAME.val(option.FATURAADRES4);
                            }
                            else {
                                PROVINCEID.append('<option selected value=' + option.FATURAADRES5.toString() + '>' + option.ILAD + '</option>');
                                DISTRICTNAME.val(option.FATURAADRES4);
                            }
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
    //#region Servis Form - İl Seçilince İlçe Temizle
    try {
        $("body").on("change", "#SELECTPROVINCEID", function () {
            var DISTRICTNAME = $("#SELECTDISTRICTID");
            DISTRICTNAME.val("");
        });
    }
    catch (error) {
        console.error(error);
    }
    // #endregion
    // #region Firma Katilimcilari
    try {
        $("body").on("change", "#SELECTSERVICEFORMCOMPANYID", function () {
            var COMPANYID = $("#SELECTSERVICEFORMCOMPANYID option:selected").val();
            var COMPANY = $("#SELECTSERVICEFORMCOMPANYID option:selected").text();
            var SELECTCOMPANYPERSONID = $("#SELECTCOMPANYPERSONID");
            if (COMPANYID != "" && COMPANY != "Seçiniz") {
                $.ajax({
                    url: '/CpmServisSistemi/GetCompanyPersons',
                    type: 'POST',
                    dataType: 'json',
                    data: { 'COMPANYID': COMPANYID },
                    success: function (data) {
                        SELECTCOMPANYPERSONID.empty();
                        $.each(data.CompanyPersons, function (index, option) {
                            SELECTCOMPANYPERSONID.append('<option value=' + option.Value + '>' + option.Text.toString() + '</option>');
                        });
                        $(function () {
                            $('.selectpicker').selectpicker('refresh');
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
    // #region Firmaya Ait Eposta-Yetkilisi Getir
    try {
        $("body").on("change", "#SELECTSERVICEFORMCOMPANYID", function () {
            var COMPANYID = $("#SELECTSERVICEFORMCOMPANYID option:selected").attr("data-hesapkod");
            //var COMPANYID = $("#SELECTSERVICEFORMCOMPANYID option:selected").val();
            var COMPANY = $("#SELECTSERVICEFORMCOMPANYID option:selected").text();
            var SELECTINFOEMAIL = $("#SELECTINFOEMAIL");
            var SELECTEMAILADDRESS = $("#SELECTEMAILADDRESS");
            SELECTEMAILADDRESS.val("");
            if (COMPANYID != "" && COMPANY != "Seçiniz") {
                $.ajax({
                    url: '/CpmServisSistemi/GetCompanyEmailAuthorized',
                    type: 'POST',
                    dataType: 'json',
                    data: { 'COMPANYID': COMPANYID },
                    success: function (data) {
                        if (data.CompanyContracts2.length != 0) {
                            $("#emailAnaCard").html("");
                            SELECTINFOEMAIL.html("");
                            SELECTEMAILADDRESS.html("");
                        }
                        else if (true) {
                            SELECTINFOEMAIL.html("");
                            SELECTEMAILADDRESS.html("");
                            $("#emailAnaCard").html("");
                            var satirEkle = '<div class="card p-2 EmailCards mb-2" style="background-color:var(--thBG);border:none!important;" id="emailCard">\
                <div class="row mb-3"><div class="col-10"><span class="" style="color:var(--thTitle);font-size: 12px !important;font-weight: bold;padding-left: 10px!important;">Ad-Soyad\
                 </span><br><input type="text" class="Input-Medium mt-2 getName col-12" id="GETNAME" placeholder="Yazınız..."></div><div class="col-1 my-auto">\
                 <input class="form-check-input my-auto" type="radio" name="exampleRadios" id="SendEmailFormPerson"></div><div class="col-1 my-auto pt-4">\
                  <i class="icon sc-trash-bin Label-Red" id="deleteEmailCard"></i></div></div><div class="mb-3">\
                 <span class="" style="color:var(--thTitle);font-size: 12px !important;font-weight: bold;padding-left: 10px!important;">E-Posta</span>\
                   <input type="email" class="datetime-local col-12 Input-Medium mt-2 inputValidateControl getmail" id="GETEMAIL" placeholder="Örn : isim@mail.com" aria-describedby="emailHelp"></div></div>';
                            $("#emailAnaCard").append(satirEkle);
                        }


                        $.each(data.CompanyContracts2, function (index, option) {
                            if (option.MAILONAY == 1) {
                                SELECTINFOEMAIL.append('<option selected value=' + option.ID + '>' + option.YETKILIADSOYAD.toString() + ' </option>');
                                SELECTEMAILADDRESS.val(option.EMAIL1);
                            }
                            if (option.YETKILINO == 1) {
                                SELECTINFOEMAIL.append('<option value="">Seçiniz </option>');
                                SELECTINFOEMAIL.append('<option value=' + option.ID + '>' + option.YETKILIADSOYAD.toString() + '</option>');
                                var satirEkle = '<div class="card p-2 EmailCards mb-2" style="background-color:var(--thBG);border:none!important;" id="emailCard">\
                <div class="row mb-3"><div class="col-10"><span class="" style="color:var(--thTitle);font-size: 12px !important;font-weight: bold;padding-left: 10px!important;">Ad-Soyad\
                 </span><br><input type="text" class="Input-Medium mt-2 getName col-12" id="GETNAME" placeholder="Yazınız..." value="' + option.YETKILIADSOYAD.toString() + '"></div><div class="col-1 my-auto">\
                 <input class="form-check-input my-auto" type="radio" name="exampleRadios" id="SendEmailFormPerson"></div><div class="col-1 my-auto pt-4">\
                  <i class="icon sc-trash-bin Label-Red" id="deleteEmailCard"></i></div></div><div class="mb-3">\
                 <span class="" style="color:var(--thTitle);font-size: 12px !important;font-weight: bold;padding-left: 10px!important;">E-Posta</span>\
                   <input type="email" class="datetime-local col-12 Input-Medium mt-2 inputValidateControl getmail" value="'+ option.EMAIL1 + '" id="GETEMAIL" placeholder="Örn : isim@mail.com" aria-describedby="emailHelp"></div></div>';
                                $("#emailAnaCard").append(satirEkle);
                            }

                        });
                        SELECTINFOEMAIL.append('<option value="">Seçiniz </option>');
                        SELECTEMAILADDRESS.html("");
                        var map = {};
                        $('#SELECTINFOEMAIL option').each(function () {
                            if (map[this.value]) {
                                $(this).remove()
                            }
                            map[this.value] = true;
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

    // #region Firmaya Ait Sozlesmeleri Getir
    try {
        debugger;
        $("body").on("change", "#SELECTSERVICEFORMCOMPANYID", function () {
            var COMPANYID = $("#SELECTSERVICEFORMCOMPANYID option:selected").val();
            var COMPANY = $("#SELECTSERVICEFORMCOMPANYID option:selected").text();
            var SELECTCONTRACTID = $("#SELECTCONTRACTID");
            var RSERVICEDAY = $("#RSERVICEDAY");
            RSERVICEDAY.html("");
            if (COMPANYID != "" && COMPANY != "Seçiniz") {
                $.ajax({
                    url: '/CpmServisSistemi/GetCompanyContract',
                    type: 'POST',
                    dataType: 'json',
                    data: { 'COMPANYID': COMPANYID },
                    success: function (data) {
                        clearSelections(3);
                        //SELECTCONTRACTID.empty();
                        //SELECTCONTRACTID.append('<option value="" selected>Seçiniz</option>');
                        $.each(data.CompanyContracts2, function (index, option) {
                            SELECTCONTRACTID.append('<option data-id=' + option.ID + ' value=' + option.COMPANYID + '>' + option.COMPANYCONTRACT + '</option>');
                            //RSERVICEDAY.append(option.RSERVICEDAY);
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
    // #region Firmaya Ait Kalan Adam Gün Getir
    try {
        $("body").on("change", "#SELECTCONTRACTID", function () {
            var COMPANYID = $("#SELECTCONTRACTID option:selected").val();
            var COMPANY = $("#SELECTCONTRACTID option:selected").text();
            var ID = $("#SELECTCONTRACTID option:selected ").attr('data-id');
            var RSERVICEDAY = $("#RSERVICEDAY");
            if (COMPANYID != "" && COMPANY != "Seçiniz") {
                $.ajax({
                    url: '/CpmServisSistemi/GetCompanyRemainderServiceDay',
                    type: 'POST',
                    dataType: 'json',
                    data: { 'COMPANYID': COMPANYID, 'ID': ID },
                    success: function (data) {
                        RSERVICEDAY.empty();
                        $.each(data.CompanyContracts2, function (index, option) {
                            RSERVICEDAY.append(option.RSERVICEDAY);
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
    //#region Firma Detay Getir
    $('body').on('change', '#SELECTSERVICEFORMCOMPANYID', function () {
        var companyDetailsCard = $("#COMPANYDETAILSCARD");
        COMPANYID = $("#SELECTSERVICEFORMCOMPANYID option:selected").val(),
            $.ajax({
                type: 'GET',
                url: "/CpmServisSistemi/GetCompanyDetails?COMPANYID=" + COMPANYID,
                datatype: "html",
                cache: false,
                success: function (data) {
                    companyDetailsCard.html("");
                    if (data != null) {
                        companyDetailsCard.html(data);
                    }
                },
                error: function (xhr) {
                    alert('error');
                }
            });
    });
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
        $("#emailAnaCard .EmailCards .getmail").each(function (index) {
        });
    });
    $("body").on("click", "#deleteEmailCard", function () {
        $(this).parents("#emailCard").remove();
    });
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
    //#region Dosyaları Diziye atma
    window.filesArray = [];
    $("#multipleFile").on("change", function (e) {
        var files = e.target.files;
        for (var i = 0; i < files.length; i++) {
            window.filesArray.push(files[i]);
        }
    });
    //#endregion
    //#region Cpm Katılımcıları için de oluştur
    window.CreateFormToCpmPersoncheckbox = document.getElementById('CreateFormToCpmPerson');
    var div = document.getElementById('cpmParticipantsDiv');
    window.CreateFormToCpmPersoncheckbox.addEventListener('click', function () {
        if (window.CreateFormToCpmPersoncheckbox.checked) {
            div.style.display = 'block';
        }
        else {
            div.style.display = 'none';
        }
    });
    //#endregion
    //#region Servis Formu Kaydet
    $('body').on('click', '#ServiceFormSaveButton', function () {
        debugger;
        var ALLDAYSTATE = $("input[name=allDAY]").prop("checked");
        var MANUELCHECKSTATE = $("input[name=manuelSetting]").prop("checked");
        var REQUESTID = $(this).attr("data-id");
        var PROGRAMMERSTATE = $("input[name=YAZILIMCICHECK]").prop("checked");
        var WEEKENDSTATE = $("input[name=HAFTASONUCHECK]").prop("checked");
        var WEEKDAYSTATE = $("input[name=HAFTAICICHECK]").prop("checked");
        var CREATEFORMTOCPMPERSON = $("input[name=CreateFormToCpmPerson]").prop("checked");
        var DONTADDMEE = $("input[name=DontAddMe]").prop("checked");
        var NAMESURNAME = [];
        var REQUESTER = [];
        var REQUESTEDSUBJECT = [];
        var WORKDONESUMMARY = [];
        var EMAILS = [];
        var TOPICTITLE = [];
        var MODULE = [];
        var SUBJECTDETAIL = [];
        var REPORTNAME = [];
        var REPORTMODULE = [];
        var REPORTDESCRIPTION = [];
        var AUTHORIZEDMAIL;
        var SERVICEFORMCONFIRMPERSONEMAIL;
        var SERVICEFORMCONFIRMPERSONFULLNAME;
        var COMPANYCONTRACTCONTROL = [];
        var SERVICETYPEID = $("#SELECTSERVICETYPEID option:selected").val();
        var PREVIOUSSERVICETIME = $("#SELECTMANDAYID").val() == '' ? 0 : parseInt($("#SELECTMANDAYID").val());
        var SERVICETIME = $("#SELECTMANDAYID").val() == '' ? 0 : parseInt($("#SELECTMANDAYID").val());
        var FREESERVICETIME = $("#SELECTMANDAYFREEID").val() == '' ? 0 : parseInt($("#SELECTMANDAYFREEID").val());
        var SUPPORTTYPE = $("#SELECTSUPPORTTYPEID option:selected").text();
        var STARTDATE = $("#SELECTSTARTDATE").val();
        var ENDDATE = $("#SELECTENDDATE").val();
        var PROVINCEID = $("#SELECTPROVINCEID option:selected").val();
        var DISTRICTNAME = $("#SELECTDISTRICTID").val();
        var AUTHORIZEDNO = $("#SELECTINFOEMAIL option:selected").val();
        var authorizedname = $("#SELECTINFOEMAIL option:selected").text().trim();
        var AUTHORIZEDNAME = authorizedname == 'Seçiniz' ? '' : authorizedname;
        /* var COMPANYID = $("#SELECTSERVICEFORMCOMPANYID option:selected").val();*/
        var COMPANYID = $("#SELECTSERVICEFORMCOMPANYID option:selected").attr("data-hesapkod");
        var COMPANYCONTRACT = $("#SELECTCONTRACTID option:selected").text();
        var COMPANYCONTRACTID = $("#SELECTCONTRACTID option:selected").attr("data-id")

        var CALCULATIONPARAMETER = $("#HESAPKATSAYISI").val() == '' ? 0 : parseFloat($("#HESAPKATSAYISI").val());
        inputControl("#kt_content_container");
        selectControl("#kt_content_container");
        //Cpm katılımcıları içinde oluştur seçeneği seçili ise
        var CPMPEREMAILS = [];
        var CPMPERNAME = [];
        var CPMPERID = [];
        CPMPARTICIPANTSNAME = "";//CPM Katılımcısı içinde oluştur FULLNAME
        CPMPARTICIPANTSID = "";//CPM Katılımcısı içinde oluştur EMAILS
        CPMPARTICIPANTSEMAIL = "";//CPM Katılımcısı içinde oluştur PERSONID


        if (window.CreateFormToCpmPersoncheckbox.checked) {
            $("#CreateToCpmParticipant :selected").map(function (i, el) {
                CPMPEREMAILS.push($(el).attr('data-email'));
                CPMPERNAME.push($(el).text());
                CPMPERID.push($(el).val());
            }).get();
            for (var i = 0; i < CPMPERNAME.length; i++) {
                CPMPARTICIPANTSNAME = CPMPARTICIPANTSNAME + CPMPERNAME[i];
                CPMPARTICIPANTSEMAIL = CPMPARTICIPANTSEMAIL + CPMPEREMAILS[i];
                CPMPARTICIPANTSID = CPMPARTICIPANTSID + CPMPERID[i];
                if (i != CPMPERNAME.length - 1) {
                    CPMPARTICIPANTSNAME = CPMPARTICIPANTSNAME + ",";
                }
                if (i != CPMPEREMAILS.length - 1) {
                    CPMPARTICIPANTSEMAIL = CPMPARTICIPANTSEMAIL + ";";
                }
                if (i != CPMPERID.length - 1) {
                    CPMPARTICIPANTSID = CPMPARTICIPANTSID + ",";
                }
            }
        }
        //Bilgi e-posta Yetkilisi control
        if (AUTHORIZEDNAME == "Seçiniz") {
            AUTHORIZEDNAME = "";
        }

        //CPM Katılımcıları ad-soyad,email
        var PEREMAILS = [];
        var PERNAME = [];
        var PERID = [];
        $("#SELECTCPMPERSONID :selected").map(function (i, el) {
            PEREMAILS.push($(el).attr('data-email'));
            PERNAME.push($(el).text());
            PERID.push($(el).val());
        }).get();
        PERSONNAME = "";//CPM Katılımcısı FULLNAME
        PERSONEMAILS = "";//CPM Katılımcısı EMAILS
        PERSONID = "";//CPM Katılımcısı PERSONID
        for (var i = 0; i < PERNAME.length; i++) {

            PERSONNAME = PERSONNAME + PERNAME[i];

            PERSONEMAILS = PERSONEMAILS + PEREMAILS[i];

            PERSONID = PERSONID + PERID[i];
            if (i != PERNAME.length - 1) {
                PERSONNAME = PERSONNAME + ",";
            }
            if (i != PEREMAILS.length - 1) {
                PERSONEMAILS = PERSONEMAILS + ";";
            }
            if (i != PERID.length - 1) {
                PERSONID = PERSONID + ",";
            }
        }
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
        //Firma Katılımcıları ad-soyad
        var COMPANYPERSONNAME = $("#SELECTCOMPANYPERSONID").val();
        //Sözleşme/Proje Control
        $("#SELECTCONTRACTID  option").each(function (i) {
            COMPANYCONTRACTCONTROL.push($(this).text());
        });
        if (COMPANYCONTRACTCONTROL.length <= 1 && COMPANYCONTRACT == "Seçiniz") {
            COMPANYCONTRACT = "";
        }
        var sy = 0;
        var sy2 = 0;
        var mailCont = "";
        //Birden fazla Email
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
        //Service Form Onay Mailinin Gideceği Kişi Mail ve Ad-soyad Bilgisi
        var EMAILISCHECK;
        var email;
        var namesurname;
        if ($("#SELECTEMAILADDRESS").val() != '') {
            if (isValidEmailAddress($("#SELECTEMAILADDRESS").val()) == false) {
                sy2 = 1;
            }
        }
        AUTHORIZEDMAIL = $("#SELECTEMAILADDRESS").val();
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
        //Birden fazla Yapilan İs
        $("#ANACARDYAPILAN  #yapilanlarCard").each(function () {
            REQUESTER.push($(this).find("#GETREQUESTER").val());
            REQUESTEDSUBJECT.push($(this).find("#GETREQUESTEDSUBJECT").val());
            WORKDONESUMMARY.push($(this).find("#GETWORKDONESUMMARY").val());
        });
        //Birden fazla CPM Standardı Oluşturulacak Konu
        $("#flush-collapseTwo .accordion-body #NewKonu").each(function () {
            TOPICTITLE.push($(this).find("#GETTOPICTITLE").val());
            MODULE.push($(this).find("#GETMODULE").val());
            SUBJECTDETAIL.push($(this).find("#GETSUBJECTDETAIL").val());
        });
        //Birden fazla CPM Standardı Oluşturulacak Rapor Ekleme
        $("#flush-collapseThree .accordion-body #NewReport").each(function () {
            REPORTNAME.push($(this).find("#GETREPORTNAME").val());
            REPORTMODULE.push($(this).find("#GETREPORTMODULE").val());
            REPORTDESCRIPTION.push($(this).find("#GETREPORTDESCRIPTION").val());
        });
        //Proje veya Servis Aşamasındaki İzlenimler
        var IMPFULLNAME = $("#flush-collapseOne #IMPFULLNAME").val();
        var IMPREQUESTEDSUBJECT = $("#flush-collapseOne #IMPREQUESTEDSUBJECT").val();
        var IMPTOPICCONTENT = $("#flush-collapseOne #IMPTOPICCONTENT").val();
        //Proje veya Servis Aşamasındaki İzlenimler/Dosya Ekleme
        var fileData = new FormData();
        for (var i = 0; i < window.filesArray.length; i++) {
            fileData.append(window.filesArray[i].name, window.filesArray[i]);
        }
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
        //Zorunlu Alan Kontrolleri
        else if (COMPANYID == "" || COMPANYCONTRACTCONTROL.length > 1 && COMPANYCONTRACT == "Seçiniz" || SUPPORTTYPE == "" || SERVICETYPEID == "" || REQUESTER == "" || REQUESTEDSUBJECT == "" || WORKDONESUMMARY == "" || PROVINCEID == "" || DISTRICTNAME == "" || PROJECTID == 0 || STEPID == 0 || MAINPROCESS == 0 || SUBPROCESS == 0) {
            swal('Lütfen kırmızı alanları  doldurunuz!',
                {
                    title: "UYARI !",
                    icon: "warning",
                    buttons: "Tamam",
                    name
                });
        }

        else if (CREATEFORMTOCPMPERSON == true && CPMPERID == "") {
            swal('Lütfen kırmızı alanı  doldurunuz!',
                {
                    title: "UYARI !",
                    icon: "warning",
                    buttons: "Tamam",
                    name
                });
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
            swal('Servis Süresi, "İşlem Seçimi" süresinden küçük olamaz !',
                {
                    title: "UYARI !",
                    icon: "warning",
                    buttons: "Tamam",
                });
        }
        else if (EMAILISCHECK != true && AUTHORIZEDMAIL == '') {
            swal('Lütfen  "Bilgi E-posta Adresi" bölümünden yetkili seçiniz ya da "E-posta Bilgilendirme" kısmından email adresi giriniz ve onay maili gönderilecek adresi işaretleyiniz!',
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
                            url: "/CpmServisSistemi/ServiceFormSave",
                            dataType: "json",
                            data:
                            {
                                'COMPANYID': COMPANYID, 'COMPANYCONTRACT': COMPANYCONTRACT, 'COMPANYCONTRACTID': COMPANYCONTRACTID,
                                'SERVICETYPEID': SERVICETYPEID, 'SUPPORTTYPE': SUPPORTTYPE,
                                'PREVIOUSSERVICETIME': PREVIOUSSERVICETIME, 'SERVICETIME': SERVICETIME, 'FREESERVICETIME': FREESERVICETIME,
                                'STARTDATE': STARTDATE, 'ENDDATE': ENDDATE,
                                'PROVINCEID': PROVINCEID, 'DISTRICTNAME': DISTRICTNAME,
                                'AUTHORIZEDNO': AUTHORIZEDNO, 'AUTHORIZEDNAME': AUTHORIZEDNAME, 'AUTHORIZEDMAIL': AUTHORIZEDMAIL,
                                'PERSONNAME': PERSONNAME, 'PERSONID': PERSONID, 'PERSONEMAILS': PERSONEMAILS, 'PROCESSDETAILS': PROCESSDETAILS,
                                'COMPANYPERSONNAME': COMPANYPERSONNAME,
                                'REQUESTER': REQUESTER, 'REQUESTEDSUBJECT': REQUESTEDSUBJECT, 'WORKDONESUMMARY': WORKDONESUMMARY,
                                'EMAILS': EMAILS, 'NAMESURNAME': NAMESURNAME,
                                'IMPFULLNAME': IMPFULLNAME, 'IMPREQUESTEDSUBJECT': IMPREQUESTEDSUBJECT, 'IMPTOPICCONTENT': IMPTOPICCONTENT,
                                'TOPICTITLE': TOPICTITLE, 'MODULE': MODULE, 'SUBJECTDETAIL': SUBJECTDETAIL,
                                'REPORTNAME': REPORTNAME, 'REPORTMODULE': REPORTMODULE, 'REPORTDESCRIPTION': REPORTDESCRIPTION,
                                'SERVICEFORMCONFIRMPERSONFULLNAME': SERVICEFORMCONFIRMPERSONFULLNAME, 'SERVICEFORMCONFIRMPERSONEMAIL': SERVICEFORMCONFIRMPERSONEMAIL,
                                'PROGRAMMERSTATE': PROGRAMMERSTATE, 'WEEKENDSTATE': WEEKENDSTATE, 'WEEKDAYSTATE': WEEKDAYSTATE, 'CALCULATIONPARAMETER': CALCULATIONPARAMETER, 'ALLDAYSTATE': ALLDAYSTATE, 'MANUELCHECKSTATE': MANUELCHECKSTATE,
                                'REQUESTID': REQUESTID, 'PROJECTID': PROJECTID, 'STEPID': STEPID, 'MAINPROCESS': MAINPROCESS, 'SUBPROCESS': SUBPROCESS,
                                'CREATEFORMTOCPMPERSON': CREATEFORMTOCPMPERSON,
                                'CPMPARTICIPANTSNAME': CPMPARTICIPANTSNAME, 'CPMPARTICIPANTSID': CPMPARTICIPANTSID, 'CPMPARTICIPANTSEMAIL': CPMPARTICIPANTSEMAIL,
                                'DONTADDMEE': DONTADDMEE
                            },

                            success: function (result) {
                                if (result.IsSuccess == true && window.filesArray.length >= 1) {
                                    var fileData = new FormData();
                                    for (var i = 0; i < window.filesArray.length; i++) {
                                        fileData.append("files", window.filesArray[i]);
                                    }
                                    fileData.append("SFORMGROUPCODE", result.SFORMGROUPCODE);
                                    $.ajax({
                                        type: 'POST',
                                        url: "/CpmServisSistemi/UploadServiceFormFiles",
                                        data: fileData, 'SFORMGROUPCODE': result.SFORMGROUPCODE,
                                        dataType: "json",
                                        contentType: false,
                                        processData: false,
                                        success: function (result) {
                                            if (result.IsSuccess == true) {
                                                window.location = "/CpmServisSistemi/ServisFormuMailGonderOnizleme";
                                            }
                                            else {
                                                toastr.error(result.Message);
                                            }
                                        },
                                        error: function () {
                                            alert('Erişim sağlanamadı.');
                                        }
                                    });
                                }
                                else if (result.IsSuccess == true && window.filesArray.length <= 0) {
                                    window.location = "/CpmServisSistemi/ServisFormuMailGonderOnizleme";
                                }
                                else {
                                    toastr.error(result.Message);
                                }
                            },
                            error: function (xhr, statusMessage, errorMessage) {
                                alert(errorMessage);
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
                    url: "/CpmServisSistemi/ServiceFormSave",
                    dataType: "json",
                    data:
                    {
                        'COMPANYID': COMPANYID, 'COMPANYCONTRACT': COMPANYCONTRACT, 'COMPANYCONTRACTID': COMPANYCONTRACTID,
                        'SERVICETYPEID': SERVICETYPEID, 'SUPPORTTYPE': SUPPORTTYPE,
                        'PREVIOUSSERVICETIME': PREVIOUSSERVICETIME, 'SERVICETIME': SERVICETIME, 'FREESERVICETIME': FREESERVICETIME,
                        'STARTDATE': STARTDATE, 'ENDDATE': ENDDATE,
                        'PROVINCEID': PROVINCEID, 'DISTRICTNAME': DISTRICTNAME,
                        'AUTHORIZEDNO': AUTHORIZEDNO, 'AUTHORIZEDNAME': AUTHORIZEDNAME, 'AUTHORIZEDMAIL': AUTHORIZEDMAIL,
                        'PERSONNAME': PERSONNAME, 'PERSONID': PERSONID, 'PERSONEMAILS': PERSONEMAILS, 'PROCESSDETAILS': PROCESSDETAILS,
                        'COMPANYPERSONNAME': COMPANYPERSONNAME,
                        'REQUESTER': REQUESTER, 'REQUESTEDSUBJECT': REQUESTEDSUBJECT, 'WORKDONESUMMARY': WORKDONESUMMARY,
                        'EMAILS': EMAILS, 'NAMESURNAME': NAMESURNAME,
                        'IMPFULLNAME': IMPFULLNAME, 'IMPREQUESTEDSUBJECT': IMPREQUESTEDSUBJECT, 'IMPTOPICCONTENT': IMPTOPICCONTENT,
                        'TOPICTITLE': TOPICTITLE, 'MODULE': MODULE, 'SUBJECTDETAIL': SUBJECTDETAIL,
                        'REPORTNAME': REPORTNAME, 'REPORTMODULE': REPORTMODULE, 'REPORTDESCRIPTION': REPORTDESCRIPTION,
                        'SERVICEFORMCONFIRMPERSONFULLNAME': SERVICEFORMCONFIRMPERSONFULLNAME, 'SERVICEFORMCONFIRMPERSONEMAIL': SERVICEFORMCONFIRMPERSONEMAIL,
                        'PROGRAMMERSTATE': PROGRAMMERSTATE, 'WEEKENDSTATE': WEEKENDSTATE, 'WEEKDAYSTATE': WEEKDAYSTATE, 'CALCULATIONPARAMETER': CALCULATIONPARAMETER, 'ALLDAYSTATE': ALLDAYSTATE, 'MANUELCHECKSTATE': MANUELCHECKSTATE,
                        'REQUESTID': REQUESTID, 'PROJECTID': PROJECTID, 'STEPID': STEPID, 'MAINPROCESS': MAINPROCESS, 'SUBPROCESS': SUBPROCESS,
                        'CREATEFORMTOCPMPERSON': CREATEFORMTOCPMPERSON,
                        'CPMPARTICIPANTSNAME': CPMPARTICIPANTSNAME, 'CPMPARTICIPANTSID': CPMPARTICIPANTSID, 'CPMPARTICIPANTSEMAIL': CPMPARTICIPANTSEMAIL,
                        'DONTADDMEE': DONTADDMEE
                    },

                    success: function (result) {
                        if (result.IsSuccess == true && window.filesArray.length >= 1) {
                            var fileData = new FormData();
                            for (var i = 0; i < window.filesArray.length; i++) {
                                fileData.append("files", window.filesArray[i]);
                            }
                            fileData.append("SFORMGROUPCODE", result.SFORMGROUPCODE);
                            $.ajax({
                                type: 'POST',
                                url: "/CpmServisSistemi/UploadServiceFormFiles",
                                data: fileData, 'SFORMGROUPCODE': result.SFORMGROUPCODE,
                                dataType: "json",
                                contentType: false,
                                processData: false,
                                success: function (result) {
                                    if (result.IsSuccess == true) {
                                        window.location = "/CpmServisSistemi/ServisFormuMailGonderOnizleme";
                                    }
                                    else {
                                        toastr.error(result.Message);
                                    }
                                },
                                error: function () {
                                    alert('Erişim sağlanamadı.');
                                }
                            });
                        }
                        else if (result.IsSuccess == true && window.filesArray.length <= 0) {
                            window.location = "/CpmServisSistemi/ServisFormuMailGonderOnizleme";
                        }
                        else {
                            toastr.error(result.Message);
                        }
                    },
                    error: function (xhr, statusMessage, errorMessage) {
                        alert(errorMessage);
                    }
                });
            }
        }
    });
    //#endregion

    $('body').on('click', 'input[name=CreateFormToCpmPerson]', function () {
        if ($('input[name=CreateFormToCpmPerson]').prop('checked') == false) {
            setParticipationCounter(1);
        }
        else {
            participationCounter = 1;
            $("#CreateToCpmParticipant :selected").map(function (i, el) {
                participationCounter++;
            }).get();
            setParticipationCounter(participationCounter);
        }
    });


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
    //#region Servis Süresi Girildiğinde 
    window.servicetime = 0;
    $("body").on("keyup", "#SELECTMANDAYID", function () {
        var manuelCHECKSTATE = $("input[name=manuelSetting]").prop("checked");
        if (manuelCHECKSTATE == true) {
            servicetime = $(this).val();
        }
    });
    //#endregion
    //#region Ücretsiz Servis Süresi Girildiğinde - Saat ve Dakika Hesaplama
    $("body").on("keyup", "#SELECTMANDAYFREEID", function () {
        var manuelCHECKSTATE = $("input[name=manuelSetting]").prop("checked");
        if (manuelCHECKSTATE == true) {
            ManuelServiceTimeControl(servicetime);
        }
        else {
            ServiceTimeControl();
        }
    });

    window.servicetime = 0;
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

    window.swalInfoShow = function (message) {
        swal(message,
            {
                title: "UYARI !",
                icon: "warning",
                buttons: "Tamam",
            });
    }

    //#endregion
    //#region  Başlangıç  ve Bitiş Zamanı değiştiğinde zamanı kontrol eder
    $("#SELECTENDDATE,#SELECTSTARTDATE").change(function () {
        var BaslangicZamani = new Date($("input#SELECTSTARTDATE").val());
        var BitisZamani = new Date($("input#SELECTENDDATE").val());
        if (BaslangicZamani <= BitisZamani) {
            DatePickerChange();
        }
    });
    //#endregion
    //#region Dakika İşlemleri
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
            DatePickerChange();
        }
    });
    //#endregion
});