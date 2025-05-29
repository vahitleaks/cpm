$(document).ready(function () {
    //#region Dosyaları Diziye atma
    window.filesArray = [];
    $("#multipleFile2").on("change", function (e) {
        var files = e.target.files;
        for (var i = 0; i < files.length; i++) {
            window.filesArray.push(files[i]);
        }
    });
    //#endregion
    FloatingTextarea();
    function dosyaGorsel(dosyaname) {
        var extension = dosyaname.split('.').pop().toLowerCase();
        if (extension == 'pdf') {
            return '/Images/filetype/pdf.svg';
        }
        else if (extension == 'doc' || extension == 'docx') {
            return '/Images/filetype/word.svg';
        }
        else if (extension == 'xls' || extension == 'xlsx') {
            return '/Images/filetype/icons8-microsoft_excel_2019.svg';
        }
        else if (extension == 'jpg' || extension == 'jpeg' || extension == 'png' || extension == 'svg') {
            return '/Images/filetype/photo.svg';
        }
        else if (extension == 'zip' || extension == 'rar') {
            return '/Images/filetype/zip.svg';
        }
        else if (extension == 'pptx' || extension == 'ppt') {
            return '/Images/filetype/powerpoint.svg';
        }
        else if (extension == 'msg' || extension == 'ppt') {
            return '/Images/filetype/mail.svg';
        }
        else
            return '/Images/filetype/otherfiles.svg';
    }
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
    $("#filesUploadEditServiceForm .fileType").each(function () {
        let fileImage = dosyaGorsel($(this).attr("data-file"));
        $(this).parents(".star").find(".fileTypeImage").attr("src", fileImage);
    });
    $(".selectpicker").selectpicker("refresh");
    $('#SELECTCPMPERSONID').selectpicker('refresh');
    $("#SELECTSERVICETYPEID  option:selected").hide();
    $("#SELECTMANDAYID  option:selected").hide();
    $("#SELECTMANDAYFREEID  option:selected").hide();
    $("#SELECTSUPPORTTYPEID option:selected").hide();
    $("#SELECTPROVINCEID  option:selected").hide();
    $("#SELECTINFOEMAIL  option:selected").hide();
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
    // #region  Dosya Sil
    $('body').on('click', '#filesUploadEditServiceForm #btnFileDelete', function () {
        var FILEID = $(this).attr("data-id");
        var FILEREMOVE = $(this).parents(".star");
        swal({
            title: "Dikkat!",
            text: "Dosyayı silmek istediğinize emin misiniz?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            buttons: ['Vazgeç', 'Sil']
        })
            .then((result) => {
                if (result) {
                    $.blockUI({
                        message: '<lottie-player autoplay  loop mode="normal" src="/Scripts/LottieFiles/cpm-loading-sc.json" style="width: 320px"></lottie-player>',
                    });
                    $.ajax({
                        url: "/CpmServisSistemi/ServiceDeleteFile/" + FILEID,
                        type: 'POST',
                        data: { 'FILEID': FILEID },
                        success: function () {
                            FILEREMOVE.remove();
                            setTimeout($.unblockUI, 300);
                            swal("Dosyanız silindi.", {
                                icon: "success",
                                timer: 400
                            });
                        },
                        error: function () {
                            bootbox.alert("İşlem sırasında hata oluştu")
                        }
                    })
                }

                else {
                    swal("Dosyanız güvende!");
                }
            });
    });
    //#endregion
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
    //#region Servis Formu Guncelle
    $('body').on('click', '#ServiceFormUpdateButton', function () {
        var PROGRAMMERSTATE = $("input[name=YAZILIMCICHECK]").prop("checked"); //Yazılımcı checkbox
        var WEEKENDSTATE = $("input[name=HAFTASONUCHECK]").prop("checked"); //Hafta sonu  checkbox
        var WEEKDAYSTATE = $("input[name=HAFTAICICHECK]").prop("checked"); //Hafta içi  checkbox
        var ALLDAYSTATE = $("input[name=allDAY]").prop("checked");
        var MANUELCHECKSTATE = $("input[name=manuelSetting]").prop("checked");
        var PERID = [];
        var PERNAME = [];
        var REQUESTER = [];
        var REQUESTEDSUBJECT = [];
        var WORKDONESUMMARY = [];
        var NAMESURNAME = [];
        var EMAILS = [];
        var TOPICTITLE = [];
        var MODULE = [];
        var SUBJECTDETAIL = [];
        var REPORTNAME = [];
        var REPORTMODULE = [];
        var REPORTDESCRIPTION = [];
        var SERVICEFORMCONFIRMPERSONEMAIL;
        var SERVICEFORMCONFIRMPERSONFULLNAME;
        var COMPANYID = $("#SELECTSERVICEFORMCOMPANYID option:selected").val(); //Firma Adı
        var COMPANYCONTRACT = $("#SELECTCONTRACTID option:selected").text();//Sözleşme/Proje
        var COMPANYCONTRACTID = $("#SELECTCONTRACTID option:selected").attr("data-id");
        var SERVICETYPEID = $("#SELECTSERVICETYPEID option:selected").val();//Servis Tipi
        var SERVICETIME = $("#SELECTMANDAYID").val() == '' ? 0 : parseInt($("#SELECTMANDAYID").val());//Servis Süresi
        var FREESERVICETIME = $("#SELECTMANDAYFREEID").val() == '' ? 0 : parseInt($("#SELECTMANDAYFREEID").val());//Ücretsiz Servis Süresi
        var CALCULATIONPARAMETER = $("#HESAPKATSAYISI").val() == '' ? 0 : parseFloat($("#HESAPKATSAYISI").val());//Hesaplama Katsayısı
        var SUPPORTTYPE = $("#SELECTSUPPORTTYPEID option:selected").text();//Destek Şekli
        var STARTDATE = $("#SELECTSTARTDATE").val();//Başlangıç Tarihi ve Saati
        var ENDDATE = $("#SELECTENDDATE").val();//Bitiş Tarihi ve Saati
        var PROVINCEID = $("#SELECTPROVINCEID option:selected").val();//Gidilecek İl
        var DISTRICTNAME = $("#SELECTDISTRICTID").val();//İlçe
        var AUTHORIZEDNO = $("#SELECTINFOEMAIL option:selected").val();//Bilgi e-posta Yetkili No
        var authorizedname = $("#SELECTINFOEMAIL option:selected").text().trim();
        var AUTHORIZEDNAME = authorizedname == 'Seçiniz' ? '' : authorizedname;//Bilgi e-posta Yetkili Adı
        //CPM Katılımcıları ad-soyad,email
        var PEREMAILS = [];
        var PERNAME = [];
        $("#SELECTCPMPERSONID :selected").map(function (i, el) {
            PEREMAILS.push($(el).val());
            PERNAME.push($(el).text());
        }).get();
        PERSONNAME = "";//CPM Katılımcısı FULLNAME
        PERSONEMAILS = "";//CPM Katılımcısı EMAILS
        for (var i = 0; i < PERNAME.length; i++) {
            PERSONNAME = PERSONNAME + PERNAME[i];
            PERSONEMAILS = PERSONEMAILS + PEREMAILS[i];
            if (i != PERNAME.length - 1) {
                PERSONNAME = PERSONNAME + ",";
            }
            if (i != PEREMAILS.length - 1) {
                PERSONEMAILS = PERSONEMAILS + ";";
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
        //Firma Katılımcıları
        var COMPANYPERSONNAME = $("#SELECTCOMPANYPERSONID").val();
        //E-posta bilgilendirme-Birden fazla Email
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
        //Proje veya Servis Aşamasındaki İzlenimler
        var IMPFULLNAME = $("#flush-collapseOne  #IMPFULLNAME").val();
        var IMPREQUESTEDSUBJECT = $("#flush-collapseOne  #IMPREQUESTEDSUBJECT").val();
        var IMPTOPICCONTENT = $("#flush-collapseOne  #IMPTOPICCONTENT").val();
        //Proje veya Servis Aşamasındaki İzlenimler/Dosya Ekleme
        var fileData = new FormData();
        for (var i = 0; i < window.filesArray2.length; i++) {
            fileData.append(window.filesArray2[i].name, window.filesArray2[i]);
        }
        if (sy > 0) {
            toastr.error("Geçersiz email adresleri: " + mailCont);
        }
        else if (sy2 == 1) {
            toastr.error("Bilgi E- Posta Adresi Geçersiz!");
        }
        else if (SUPPORTTYPE == "" ||
            SERVICETYPEID == "" || REQUESTER == "" || REQUESTEDSUBJECT == "" ||
            WORKDONESUMMARY == "" || PROVINCEID == "" || DISTRICTNAME == "" || PROJECTID == 0 || STEPID == 0 || MAINPROCESS == 0 || SUBPROCESS == 0) {
            swal('Lütfen kırmızı alanları  doldurunuz!',
                {
                    title: "UYARI !",
                    icon: "warning",
                    buttons: "Tamam",

                });
            inputControl("#kt_content_container");
            selectControl("#kt_content_container");
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
                            url: "/CpmServisSistemi/ServiceFormUpdate",
                            dataType: "json",
                            data:
                            {
                                'COMPANYID': COMPANYID, 'COMPANYCONTRACTID': COMPANYCONTRACTID, 'COMPANYCONTRACT': COMPANYCONTRACT, 'SERVICETYPEID': SERVICETYPEID,
                                'SERVICETIME': SERVICETIME, 'FREESERVICETIME': FREESERVICETIME, 'SUPPORTTYPE': SUPPORTTYPE, 'STARTDATE': STARTDATE,
                                'ENDDATE': ENDDATE, 'PROVINCEID': PROVINCEID, 'DISTRICTNAME': DISTRICTNAME, 'AUTHORIZEDNO': AUTHORIZEDNO,
                                'AUTHORIZEDNAME': AUTHORIZEDNAME, 'AUTHORIZEDMAIL': AUTHORIZEDMAIL, 'PERSONNAME': PERSONNAME, 'PERSONEMAILS': PERSONEMAILS,
                                'PROCESSDETAILS': PROCESSDETAILS, 'COMPANYPERSONNAME': COMPANYPERSONNAME,
                                'REQUESTER': REQUESTER, 'REQUESTEDSUBJECT': REQUESTEDSUBJECT, 'WORKDONESUMMARY': WORKDONESUMMARY, 'EMAILS': EMAILS, 'NAMESURNAME': NAMESURNAME,
                                'SERVICEFORMCONFIRMPERSONEMAIL': SERVICEFORMCONFIRMPERSONEMAIL, 'SERVICEFORMCONFIRMPERSONFULLNAME': SERVICEFORMCONFIRMPERSONFULLNAME,
                                'IMPFULLNAME': IMPFULLNAME, 'IMPREQUESTEDSUBJECT': IMPREQUESTEDSUBJECT, 'IMPTOPICCONTENT': IMPTOPICCONTENT, 'TOPICTITLE': TOPICTITLE, 'MODULE': MODULE, 'SUBJECTDETAIL': SUBJECTDETAIL,
                                'REPORTNAME': REPORTNAME, 'REPORTMODULE': REPORTMODULE, 'REPORTDESCRIPTION': REPORTDESCRIPTION,
                                'PROGRAMMERSTATE': PROGRAMMERSTATE, 'WEEKENDSTATE': WEEKENDSTATE, 'WEEKDAYSTATE': WEEKDAYSTATE, 'CALCULATIONPARAMETER': CALCULATIONPARAMETER, 'ALLDAYSTATE': ALLDAYSTATE, 'MANUELCHECKSTATE': MANUELCHECKSTATE,
                                'PROJECTID': PROJECTID, 'STEPID': STEPID, 'MAINPROCESS': MAINPROCESS, 'SUBPROCESS': SUBPROCESS
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
                                        url: "/CpmServisSistemi/UploadServiceFormFilesUpdate",
                                        data: fileData, 'SFORMGROUPCODE': result.SFORMGROUPCODE,
               
                                        dataType: "json",
                                        contentType: false,
                                        processData: false,
                                        success: function (result) {
                                            if (result.IsSuccess == true) {
                                               
                                                //window.location = "/CpmServisSistemi/ServisFormuGuncellendi";
                                                toastr.success(result.Message);
                                                window.location = "/CpmServisSistemi/ServisFormuMailGonderOnizleme";
 setTimeout($.unblockUI, 300);
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
                                else {
                                  
                                    window.location = "/CpmServisSistemi/ServisFormuMailGonderOnizleme";
                                    //window.location = "/CpmServisSistemi/ServisFormuGuncellendi"; 
                                    setTimeout($.unblockUI, 300);
                                }
                            },
                            error: function (xhr, status, error) {
                                console.log(xhr.responseText); // Hata mesajını konsola yazdır
                                console.log(status); // Hata durumunu konsola yazdır
                                console.log(error); // Hata nesnesini konsola yazdır
                            }
                            //error: function (xhr) {
                            //    alert('error');
                            //}
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
                    url: "/CpmServisSistemi/ServiceFormUpdate",
                    dataType: "json",
                    data:
                    {
                        'COMPANYID': COMPANYID, 'COMPANYCONTRACTID': COMPANYCONTRACTID, 'COMPANYCONTRACT': COMPANYCONTRACT, 'SERVICETYPEID': SERVICETYPEID,
                        'SERVICETIME': SERVICETIME, 'FREESERVICETIME': FREESERVICETIME, 'SUPPORTTYPE': SUPPORTTYPE, 'STARTDATE': STARTDATE,
                        'ENDDATE': ENDDATE, 'PROVINCEID': PROVINCEID, 'DISTRICTNAME': DISTRICTNAME, 'AUTHORIZEDNO': AUTHORIZEDNO,
                        'AUTHORIZEDNAME': AUTHORIZEDNAME, 'AUTHORIZEDMAIL': AUTHORIZEDMAIL, 'PERSONNAME': PERSONNAME, 'PERSONEMAILS': PERSONEMAILS,
                        'PROCESSDETAILS': PROCESSDETAILS, 'COMPANYPERSONNAME': COMPANYPERSONNAME,
                        'REQUESTER': REQUESTER, 'REQUESTEDSUBJECT': REQUESTEDSUBJECT, 'WORKDONESUMMARY': WORKDONESUMMARY, 'EMAILS': EMAILS, 'NAMESURNAME': NAMESURNAME,
                        'SERVICEFORMCONFIRMPERSONEMAIL': SERVICEFORMCONFIRMPERSONEMAIL, 'SERVICEFORMCONFIRMPERSONFULLNAME': SERVICEFORMCONFIRMPERSONFULLNAME,
                        'IMPFULLNAME': IMPFULLNAME, 'IMPREQUESTEDSUBJECT': IMPREQUESTEDSUBJECT, 'IMPTOPICCONTENT': IMPTOPICCONTENT, 'TOPICTITLE': TOPICTITLE, 'MODULE': MODULE, 'SUBJECTDETAIL': SUBJECTDETAIL,
                        'REPORTNAME': REPORTNAME, 'REPORTMODULE': REPORTMODULE, 'REPORTDESCRIPTION': REPORTDESCRIPTION,
                        'PROGRAMMERSTATE': PROGRAMMERSTATE, 'WEEKENDSTATE': WEEKENDSTATE, 'WEEKDAYSTATE': WEEKDAYSTATE, 'CALCULATIONPARAMETER': CALCULATIONPARAMETER, 'ALLDAYSTATE': ALLDAYSTATE, 'MANUELCHECKSTATE': MANUELCHECKSTATE,
                        'PROJECTID': PROJECTID, 'STEPID': STEPID, 'MAINPROCESS': MAINPROCESS, 'SUBPROCESS': SUBPROCESS
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
                                url: "/CpmServisSistemi/UploadServiceFormFilesUpdate",
                                data: fileData, 'SFORMGROUPCODE': result.SFORMGROUPCODE,
                                dataType: "json",
                                contentType: false,
                                processData: false,
                                success: function (result) {
                                    if (result.IsSuccess == true) {
                                
                                        //window.location = "/CpmServisSistemi/ServisFormuGuncellendi";
                                        toastr.success(result.Message);
                                        window.location = "/CpmServisSistemi/ServisFormuMailGonderOnizleme";
        setTimeout($.unblockUI, 300);
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
                        else {
                   
                            window.location = "/CpmServisSistemi/ServisFormuMailGonderOnizleme";
                            //window.location = "/CpmServisSistemi/ServisFormuGuncellendi"; 
                            setTimeout($.unblockUI, 300);
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log(xhr.responseText); // Hata mesajını konsola yazdır
                        console.log(status); // Hata durumunu konsola yazdır
                        console.log(error); // Hata nesnesini konsola yazdır
                    }
                    //error: function (xhr) {
                    //    alert('error');
                    //}
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
    $("#BASEFREESERVICETIME").keyup(function () {
        calculateFreeServiceTime($('#BASEFREESERVICETIME').val() == '' ? 0 : parseInt($('#BASEFREESERVICETIME').val()));
    });

    $("#BASESERVICETIME").keyup(function () {
        ManuelServiceTimeEntry($('#BASESERVICETIME').val() == '' ? 0 : parseInt($('#BASESERVICETIME').val()));
    });
    //#endregion

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


    //window.freeservicetime = $("#SELECTMANDAYFREEID").val();
    //$("body").on("keyup", "#SELECTMANDAYFREEID", function () {
    //    var manuelCHECKSTATE = $("input[name=manuelSetting]").prop("checked");
    //    var FREESERVICETIME = $("#SELECTMANDAYFREEID").val() == '' ? 0 : parseInt($(" #SELECTMANDAYFREEID").val());//Ücretsiz Servis Süresi
    //    var HAFTASONUCHECKSTATE = $("input[name=HAFTASONUCHECK]").prop("checked");
    //    var HAFTAICICHECKSTATE = $("input[name=HAFTAICICHECK]").prop("checked");
    //    var YAZILIMCICHECKSTATE = $("input[name=YAZILIMCICHECK]").prop("checked");
    //    if (HAFTASONUCHECKSTATE == true && YAZILIMCICHECKSTATE == true && FREESERVICETIME != 0) {
    //        swal({
    //            title: "Bilgilendirme Mesajı",
    //            text: "Doğru hesaplama işlemi için ilk olarak 'Yazılımcı' ve 'Haftasonu' seçimini kaldırmalısınız.",
    //            button: "Tamam",
    //        });
    //        $("#SELECTMANDAYFREEID").val(window.freeservicetime);
    //    }
    //    else if (HAFTASONUCHECKSTATE == false && YAZILIMCICHECKSTATE == true && FREESERVICETIME != 0) {
    //        swal({
    //            title: "Bilgilendirme Mesajı",
    //            text: "Doğru hesaplama işlemi için ilk olarak 'Yazılımcı' ve 'Haftasonu' seçimini kaldırmalısınız.",
    //            button: "Tamam",
    //        });

    //        var sonuc = window.freeservicetime / 1.5;
    //        $("#SELECTMANDAYFREEID").val(sonuc);
    //    }
    //    else if (HAFTASONUCHECKSTATE == true && YAZILIMCICHECKSTATE == false && FREESERVICETIME != 0) {
    //        swal({
    //            title: "Bilgilendirme Mesajı",
    //            text: "Doğru hesaplama işlemi için ilk olarak 'Yazılımcı' ve 'Haftasonu' seçimini kaldırmalısınız.",
    //            button: "Tamam",
    //        });
    //        var sonuc = window.freeservicetime / 1.5;
    //        $("#SELECTMANDAYFREEID").val(sonuc);
    //    }
    //    else if (HAFTAICICHECKSTATE == true && FREESERVICETIME != 0) {
    //        swal({
    //            title: "Bilgilendirme Mesajı",
    //            text: "Doğru hesaplama işlemi için ilk olarak 'Hafta İçi' seçimini kaldırmalısınız.",
    //            button: "Tamam",
    //        });
    //        $("#SELECTMANDAYFREEID").val(window.freeservicetime);
    //    }
    //    else
    //    {
    //        if (manuelCHECKSTATE == true) {
    //            ManuelServiceTimeControl(servicetime);
    //        }
    //        else {
    //            ServiceTimeControl();
    //        }
    //    }
    //});
    //#endregion


    //$("body").on("click", "input[name=allDAY]", function () {
    //    ServiceTimeControl();
    //});
    //#endregion




    //$("#SELECTENDDATE,#SELECTSTARTDATE").change(function () {
    //    var HAFTASONUCHECKSTATE = $("input[name=HAFTASONUCHECK]").prop("checked");
    //    var HAFTAICICHECKSTATE = $("input[name=HAFTAICICHECK]").prop("checked");
    //    var YAZILIMCICHECKSTATE = $("input[name=YAZILIMCICHECK]").prop("checked");
    //    if (HAFTASONUCHECKSTATE == true && YAZILIMCICHECKSTATE == true && HAFTAICICHECKSTATE==true) {
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
});









