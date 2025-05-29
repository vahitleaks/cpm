//#region Kronometre Fonksiyonu

var gecenSureTimer = 0;

function Kronometre(Id, Saniye) {
    this.gercekSaniye = Saniye || 0;
    this.saniye = Saniye || 0;
    this.interval;
    this.baslat = function () {
        if ($(".kronometrecontainer .sc-audio-play").length > 0) {
            this.sayacElem = document.getElementById(Id);
            if (!this.interval) {
                this.sayac();
                this.interval = setInterval(this.sayac.bind(this), 1000);
                $(".kronometrecontainer .sc-audio-play").addClass("sc-audio-pause");
                $(".kronometrecontainer .sc-audio-play").removeClass("sc-audio-play");
            }
        }
        else {
            clearInterval(this.interval);
            this.interval = null;
            $(".kronometrecontainer .sc-audio-pause").addClass("sc-audio-play");
            $(".kronometrecontainer .sc-audio-pause").removeClass("sc-audio-pause");
            setTimerToServiceTime();
        }
    };
    this.sayac = function () {
        var toplamSaniye = this.saniye;
        var saat = parseInt(toplamSaniye / 3600) % 24;
        var dakika = parseInt(toplamSaniye / 60) % 60;
        var saniye = toplamSaniye % 60;
        this.sayacElem.innerHTML = (saat < 10 ? "0" + saat : saat) + ":" + (dakika < 10 ? "0" + dakika : dakika) + ":" + (saniye < 10 ? "0" + saniye : saniye);
        this.saniye += 1;
        gecenSureTimer = this.saniye;
    };
    this.bitir = function () {
        this.sayacElem.innerHTML = '00:00:00';
        this.saniye = this.gercekSaniye;
    };
}
var Kronometre = new Kronometre('stopWhatchID');
//#endregion

$(document).ready(function () {
    FloatingTextarea();
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
    $('.selectpicker').selectpicker();
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
    // #region Firmaya Ait Sozlesmeleri Getir
    try {
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
    // #region Firmaya Ait Eposta-Yetkilisi Getir
    try {
        $("body").on("change", "#SELECTSERVICEFORMCOMPANYID", function () {
            var COMPANYID = $("#SELECTSERVICEFORMCOMPANYID option:selected").attr("data-hesapkod");
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
    //#region Uzaktan Servis Formu Kaydet
    $('body').on('click', '#RemoteServiceFormSaveButton', function () {
        debugger;
        var PROGRAMMERSTATE = $("input[name=YAZILIMCICHECK]").prop("checked");//Yazılımcı
        var WEEKENDSTATE = $("input[name=HAFTASONUCHECK]").prop("checked");//Hafta sonu
        var WEEKDAYSTATE = $("input[name=HAFTAICICHECK]").prop("checked");//Hafta içi
        var ALLDAYSTATE = $("input[name=allDAY]").prop("checked");
        var MANUELCHECKSTATE = $("input[name=manuelSetting]").prop("checked");
        var REMOTESERVICETOTALTIME = $("#stopWhatchID").text().trim();
        var REQUESTER = [];
        var REQUESTEDSUBJECT = [];
        var WORKDONESUMMARY = [];
        var NAMESURNAME = [];
        var EMAILS = [];
        var COMPANYCONTRACTCONTROL = [];
        var EMAILISCHECK;
        var SERVICEFORMCONFIRMPERSONEMAIL;
        var SERVICEFORMCONFIRMPERSONFULLNAME;
        var PREVIOUSSERVICETIME;
        var COMPANYID = $("#SELECTSERVICEFORMCOMPANYID option:selected").attr("data-hesapkod");//Firma Adı*/
        /*       var COMPANYID = $("#SELECTSERVICEFORMCOMPANYID option:selected").val();*/
        var SERVICETYPEID = $(" #SELECTSERVICETYPEID option:selected").val();//Servis Tipi
        var PREVIOUSSERVICETIME = $(" #SELECTMANDAYID").val() == '' ? 0 : parseInt($(" #SELECTMANDAYID").val());//Önceki Servis Süresi
        var SERVICETIME = $(" #SELECTMANDAYID").val() == '' ? 0 : parseInt($(" #SELECTMANDAYID").val());//Servis Süresi
        var FREESERVICETIME = $(" #SELECTMANDAYFREEID").val() == '' ? 0 : parseInt($(" #SELECTMANDAYFREEID").val());//Ücretsiz Servis Süresi
        var SUPPORTTYPE = $(" #SELECTSUPPORTTYPEID option:selected").text();//Destek Şekli
        var STARTDATE = $(" #SELECTSTARTDATE").val();//Başlangıç Tarihi ve Saati
        var ENDDATE = $(" #SELECTENDDATE").val();//Bitiş Tarihi ve Saati
        var AUTHORIZEDNO = $(" #SELECTINFOEMAIL option:selected").val();
        var authorizedname = $("#SELECTINFOEMAIL option:selected").text().trim();
        var AUTHORIZEDNAME = authorizedname == 'Seçiniz' ? '' : authorizedname; //Bilgi e-posta Yetkilisi
        var CALCULATIONPARAMETER = $(" #HESAPKATSAYISI").val() == '' ? 0 : parseFloat($(" #HESAPKATSAYISI").val());//Hesaplama Katsayısı
        var COMPANYCONTRACT = $(" #SELECTCONTRACTID option:selected").text();//Sözleşme/Proje
        var COMPANYCONTRACTID = $("#SELECTCONTRACTID option:selected").attr("data-id");
        var sy = 0;
        var sy2 = 0;
        var mailCont = "";
        if ($("#SELECTEMAILADDRESS").val() != '') {
            if (isValidEmailAddress($("#SELECTEMAILADDRESS").val()) == false) {
                sy2 = 1;
            }
        }
        var AUTHORIZEDMAIL = $(" #SELECTEMAILADDRESS").val();//Bilgi E-posta Adresi
        //Sözleşme/Proje Control
        $("#SELECTCONTRACTID  option").each(function (i) {
            COMPANYCONTRACTCONTROL.push($(this).text());
        });
        if (COMPANYCONTRACTCONTROL.length <= 1 && COMPANYCONTRACT == "Seçiniz") {
            COMPANYCONTRACT = "";
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
        else if (COMPANYID == "" || COMPANYCONTRACTCONTROL.length > 1 && COMPANYCONTRACT == "Seçiniz" || SUPPORTTYPE == "" || SERVICETYPEID == "" || REQUESTER == "" || REQUESTEDSUBJECT == "" || WORKDONESUMMARY == "" || PROJECTID == 0 || STEPID == 0 || MAINPROCESS == 0 || SUBPROCESS == 0) {
            swal('Lütfen kırmızı alanları doldurunuz!',
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
                    className: "red-bg",
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
                            url: "/CpmServisSistemi/RemoteServiceFormSave",
                            dataType: "json",
                            data:
                            {
                                'COMPANYID': COMPANYID, 'COMPANYCONTRACT': COMPANYCONTRACT,
                                'COMPANYCONTRACTID': COMPANYCONTRACTID, 'SERVICETYPEID': SERVICETYPEID,
                                'SERVICETIME': SERVICETIME, 'PREVIOUSSERVICETIME': PREVIOUSSERVICETIME, 'FREESERVICETIME': FREESERVICETIME,
                                'SUPPORTTYPE': SUPPORTTYPE, 'STARTDATE': STARTDATE, 'ENDDATE': ENDDATE, 'AUTHORIZEDNO': AUTHORIZEDNO,
                                'AUTHORIZEDNAME': AUTHORIZEDNAME, 'AUTHORIZEDMAIL': AUTHORIZEDMAIL,
                                'REQUESTER': REQUESTER, 'REQUESTEDSUBJECT': REQUESTEDSUBJECT, 'WORKDONESUMMARY': WORKDONESUMMARY, 'EMAILS': EMAILS,
                                'NAMESURNAME': NAMESURNAME, 'SERVICEFORMCONFIRMPERSONFULLNAME': SERVICEFORMCONFIRMPERSONFULLNAME,
                                'SERVICEFORMCONFIRMPERSONEMAIL': SERVICEFORMCONFIRMPERSONEMAIL, 'REMOTESERVICETOTALTIME': REMOTESERVICETOTALTIME,
                                'PROGRAMMERSTATE': PROGRAMMERSTATE, 'WEEKENDSTATE': WEEKENDSTATE, 'WEEKDAYSTATE': WEEKDAYSTATE, 'CALCULATIONPARAMETER': CALCULATIONPARAMETER, 'ALLDAYSTATE': ALLDAYSTATE, 'MANUELCHECKSTATE': MANUELCHECKSTATE,
                                'PROJECTID': PROJECTID, 'STEPID': STEPID, 'PROCESSDETAILS': PROCESSDETAILS, 'MAINPROCESS': MAINPROCESS, 'SUBPROCESS': SUBPROCESS
                            },
                            success: function (result) {
                                if (result.IsSuccess == true) {
                                    window.location = "/CpmServisSistemi/UzaktanServisFormuMailGonderOnizleme";
                                    toastr.success(result.Message);
                                }

                                else {
                                    /* window.location = "/CpmServisSistemi/UzaktanServisKaydet";*/
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
                    url: "/CpmServisSistemi/RemoteServiceFormSave",
                    dataType: "json",
                    data:
                    {
                        'COMPANYID': COMPANYID, 'COMPANYCONTRACT': COMPANYCONTRACT,
                        'COMPANYCONTRACTID': COMPANYCONTRACTID, 'SERVICETYPEID': SERVICETYPEID,
                        'SERVICETIME': SERVICETIME, 'PREVIOUSSERVICETIME': PREVIOUSSERVICETIME, 'FREESERVICETIME': FREESERVICETIME,
                        'SUPPORTTYPE': SUPPORTTYPE, 'STARTDATE': STARTDATE, 'ENDDATE': ENDDATE, 'AUTHORIZEDNO': AUTHORIZEDNO,
                        'AUTHORIZEDNAME': AUTHORIZEDNAME, 'AUTHORIZEDMAIL': AUTHORIZEDMAIL,
                        'REQUESTER': REQUESTER, 'REQUESTEDSUBJECT': REQUESTEDSUBJECT, 'WORKDONESUMMARY': WORKDONESUMMARY, 'EMAILS': EMAILS,
                        'NAMESURNAME': NAMESURNAME, 'SERVICEFORMCONFIRMPERSONFULLNAME': SERVICEFORMCONFIRMPERSONFULLNAME,
                        'SERVICEFORMCONFIRMPERSONEMAIL': SERVICEFORMCONFIRMPERSONEMAIL, 'REMOTESERVICETOTALTIME': REMOTESERVICETOTALTIME,
                        'PROGRAMMERSTATE': PROGRAMMERSTATE, 'WEEKENDSTATE': WEEKENDSTATE, 'WEEKDAYSTATE': WEEKDAYSTATE, 'CALCULATIONPARAMETER': CALCULATIONPARAMETER, 'ALLDAYSTATE': ALLDAYSTATE, 'MANUELCHECKSTATE': MANUELCHECKSTATE,
                        'PROJECTID': PROJECTID, 'STEPID': STEPID, 'PROCESSDETAILS': PROCESSDETAILS, 'MAINPROCESS': MAINPROCESS, 'SUBPROCESS': SUBPROCESS
                    },
                    success: function (result) {
                        if (result.IsSuccess == true) {
                            window.location = "/CpmServisSistemi/UzaktanServisFormuMailGonderOnizleme";
                            toastr.success(result.Message);
                        }

                        else {
                            /* window.location = "/CpmServisSistemi/UzaktanServisKaydet";*/
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
    //#endregion



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
    window.servicetime = 0;
    //$("body").on("keydown", "#SELECTMANDAYFREEID", function (event) {
    //    if (event.keyCode === 13) {
    //        calculateFreeServiceTime($('#SELECTMANDAYFREEID').val() == '' ? 0 : parseInt($('#SELECTMANDAYFREEID').val()));
    //    }
    //});

    $("#BASEFREESERVICETIME").keyup(function () {
        calculateFreeServiceTime($('#BASEFREESERVICETIME').val() == '' ? 0 : parseInt($('#BASEFREESERVICETIME').val()));
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

    //Manuel Giriş düzenleme işlemi bittikten sonra 
    $("body").on("keyup", "#BASESERVICETIME", function (event) {
        ManuelServiceTimeEntry($('#BASESERVICETIME').val() == '' ? 0 : parseInt($('#BASESERVICETIME').val()));

    });

    //$("#SELECTMANDAYID").change(function () {
    //    ManuelServiceTimeEntry($('#SELECTMANDAYID').val() == '' ? 0 : parseInt($('#SELECTMANDAYID').val()));
    //});
    //#endregion

    //$('#BASESERVICETIME').on('focus', function () {
    //    var value = $(this).val();
    //    if (value.startsWith('0')) {
    //        $(this).val(value.substring(1));
    //    }
    //});

    //$('#BASEFREESERVICETIME').on('focus', function () {
    //    var value = $(this).val();
    //    if (value.startsWith('0')) {
    //        $(this).val(value.substring(1));
    //    }
    //});

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

    //window.swalInfoShow = function (message) {
    //    swal(message,
    //        {
    //            title: "UYARI !",
    //            icon: "warning",
    //            buttons: "Tamam",
    //        });
    //}
    ////#endregion

    window.setTimerToServiceTime = function () {
        var gecenSureTimerMinute = (((gecenSureTimer - 1) / 60) == '' ? 0 : parseInt(((gecenSureTimer - 1) / 60)));

        if (gecenSureTimerMinute > 0) {
            $('#BASEFREESERVICETIME').val('');
            $('input[name=manuelSetting]').prop('checked', true);
            $('input[name=allDAY]').prop('checked', false);
            $("#BASESERVICETIME").prop("disabled", false);
            $("#BASESERVICETIME").attr("style", "background-color:#f2f6f7");
            $('.servisSuresiInfoSpan').attr('hidden', false);
            ManuelServiceTimeEntry(gecenSureTimerMinute);
        }
    }

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
    ////#endregion





    //////#region Manuel Giriş CheckBox Tıklandığında
    ////$("body").on("click", "input[name=manuelSetting]", function () {
    ////    var manuelCHECKSTATE = $("input[name=manuelSetting]").prop("checked");
    ////    if (manuelCHECKSTATE == true) {
    ////        $("#SELECTMANDAYID").prop("disabled", false);
    ////        $("#SELECTMANDAYID").attr("style", "background-color:#f2f6f7");
    ////    }
    ////    else {
    ////        $("#SELECTMANDAYID").prop("disabled", true);
    ////        $("#SELECTMANDAYID").removeAttr("style", "background-color:#fff");
    ////    }
    ////});




    ////#endregion
    //////#region Servis Süresi Girildiğinde 
    ////window.servicetime = 0;
    ////$("body").on("keyup", "#SELECTMANDAYID", function () {
    ////    var manuelCHECKSTATE = $("input[name=manuelSetting]").prop("checked");
    ////    if (manuelCHECKSTATE == true) {
    ////        var servicetime = $('#SELECTMANDAYID').val();
    ////    }
    ////});
    //////#endregion
    //////#region Ücretsiz Servis Süresi Girildiğinde - Saat ve Dakika Hesaplama
    ////$("body").on("keyup", "#SELECTMANDAYFREEID", function () {
    ////    var manuelCHECKSTATEE = $("input[name=manuelSetting]").prop("checked");
    ////    var servicetime = $('#SELECTMANDAYID').val();
    ////    if (manuelCHECKSTATEE == true) {
    ////        ManuelServiceTimeControl(servicetime);
    ////    }
    ////    else if (manuelCHECKSTATEE == false) {
    ////        ServiceTimeControl();
    ////    }
    ////});
    //////#endregion



    ////#region Servis Süresi Girildiğinde 
    //window.servicetime = 0;
    //$("body").on("keydown", "#SELECTMANDAYFREEID", function (event) {
    //    if (event.keyCode === 13) {
    //        calculateFreeServiceTime($('#SELECTMANDAYFREEID').val() == '' ? 0 : parseInt($('#SELECTMANDAYFREEID').val()));
    //    }
    //});


    //$("body").on("keydown", "#SELECTMANDAYID", function (event) {
    //    if (event.keyCode === 13) {
    //        ManuelServiceTimeEntry($('#SELECTMANDAYID').val() == '' ? 0 : parseInt($('#SELECTMANDAYID').val()));
    //    }
    //});
    ////#endregion

    ////#region  Başlangıç  ve Bitiş Zamanı değiştiğinde zamanı kontrol eder

    //$("#SELECTENDDATE,#SELECTSTARTDATE").change( function () {

    //            DatePickerChange();

    //});

    ////$("#SELECTENDDATE,#SELECTSTARTDATE").on('keydown', function () {
    ////    if (event.keyCode === 13) {
    ////        var BaslangicZamani = new Date($("input#SELECTSTARTDATE").val());
    ////        var BitisZamani = new Date($("input#SELECTENDDATE").val());
    ////        if (BaslangicZamani > BitisZamani) {

    ////            swal('Başlangıç Zamanı, Bitiş Zamanından küçük olmalıdır !',
    ////                {
    ////                    title: "UYARI !",
    ////                    icon: "warning",
    ////                    buttons: "Tamam",
    ////                });
    ////        }
    ////        else {
    ////            DatePickerChange();
    ////        }
    ////    }
    ////});


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
    ////#region Tüm Gün CheckBox Tıklandığında
    ////$("body").on("click", "input[name=allDAY]", function () {
    ////    ServiceTimeControl();
    ////});
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
    //    else {
    //        DatePickerChange();
    //    }
    //});
    ////#endregion
});




