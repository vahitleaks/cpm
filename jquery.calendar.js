/**
* Theme: Metrica - Responsive Bootstrap 4 Admin Dashboard
* Author: Mannatthemes
* Component: Full-Calendar
*/
document.addEventListener('DOMContentLoaded', function () {
    /* Check if window resize function */
    function mobileCheck() {
        if (window.innerWidth <= 460) {
            return false;
        } else {
            return true;
        }
    };
    var activeInactiveWeekends = true;
    var calendarEl = document.getElementById('calendar');
    var selectedEvent = null;
    var events = [];
    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'tr', //Dil ayarı
        weekends: activeInactiveWeekends,
        plugins: ['interaction', 'dayGrid', 'timeGrid', 'list'],
        header: //Baslık buton duzenlemeleri
        {
            center: 'prev,today,next',
            left: 'myCustomButtonNewPlan,myCustomButtonServisFormu,myCustomButtonUzakService',
            right: 'timeGridDay,dayGridWeek,dayGridMonth,myCustomButtonPerson'
        },
        footer: { //alt menu duzenleme
            center: 'title'
        },
        snapDuration: '00:15:00',
        timeZone: 'Europe/Istanbul',
        slotLabelFormat: {
            hour: '2-digit',
            minute: '2-digit',
        },
        columnHeaderFormat: {
            weekday: 'long',
        },
        buttonText: //Button text change
        {
            today: 'Bugün',
            month: 'Aylık',
            week: 'Haftalık',
            day: 'Günlük',
        },
        views: {
            week: {
                columnHeaderFormat: {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                },
            }
        },
        customButtons: {
            myCustomButtonPerson: {
                text: 'Kişiler',
                click: function (event, jsEvent, view) {
                    window.location.href = '/CpmServisSistemi/Kisiler';
                }
            },
            myCustomButtonUzakService: {
                text: 'Uzaktan Servis',
                click: function (event, jsEvent, view) {
                    window.location.href = '/CpmServisSistemi/CreateRemoteServiceForm';
                }
            },
            myCustomButtonNewPlan: {
                text: 'Yeni Plan Oluştur',
                click: function (event, jsEvent, view) {
                    Date.prototype.getValidFormat = function () {
                        var hours = this.getHours();
                        var minute = this.getMinutes();
                        var ay = this.getMonth() + 1;
                        var gun = this.getDate();
                        var yil = this.getFullYear();
                        return yil + "-" + (ay < 10 ? "0" + ay : ay) + "-" + (gun < 10 ? "0" + gun : gun) + "T" + (hours < 10 ? "0" + hours : hours) + ":" + (minute < 10 ? "0" + minute : minute); //Gün ve ay 10 dan küçükse başına 0 gelir
                    };

                    var date = new Date();
                    //Modal temizleme;
                    $("#newPlanCreate #STARTDATE").val(date.getValidFormat());
                    $("#newPlanCreate #ENDDATE").val(date.getValidFormat());
                    window.planAddModal.show();
                    $("#newPlanCreate .selectpicker").val('default');
                    $("#newPlanCreate .Scroll-Blue ul").html('');
                    $('.selectpicker').selectpicker('refresh');
                    $('#newPlanCreate input[type="checkbox"]').prop('checked', false);
                    $('#newPlanCreate #SERVICETYPEID').val('');
                    $('#newPlanCreate #PROVINCEID').val('');
                    $('#newPlanCreate #DISTRICTID').val('');
                    $('#newPlanCreate #multipleFile').val('');
                    $("#newPlanCreate  .Scroll-Blue").val('');
                    $('#newPlanCreate #STARTDATE').val();
                    $('#newPlanCreate #ENDDATE').val();
                    $('#newPlanCreate #COMMENT').val('');
                    $("#INFORMATIONAREA").attr("hidden", true);
                    $("#INFORMATIONAREASERVICETYPE").attr("hidden", true);
                    $("#SERVICETYPEDIV").addClass("mb-3");

                }
            },
            myCustomButtonServisFormu: {
                text: 'Servis Formu Oluştur',
                click: function (event, jsEvent, view) {
                    $.ajax({
                        type: 'GET',
                        url: "/CpmServisSistemi/CreateServiceForm",
                        success: function (result) {
                            window.location.href = '/CpmServisSistemi/CreateServiceForm';
                        },
                        error: function () {
                            alert('Erişim sağlanamadı.');
                        }
                    });
                }
            }
        },
        firstDay: 1, // Hangi gunden başlayacak şekilde 0, 1, 2 ..
        /* Check if window resize and add the new view */
        defaultView: mobileCheck() ? "timeGridDay" : "dayGridWeek",
        //mobileCheck() ?"timeGridDay": "dayGridWeek",
        windowResize: function (view) {
            if (window.innerWidth <= 460) {
                calendar.changeView('dayGridWeek');
            } else {
                calendar.changeView('timeGridDay');
            }
        },
        //defaultView: 'timeGridDay',
        allDaySlot: false,
        contentHeight: 540,
        minTime: '08:00:00',
        maxTime: '23:00:00',
        navLinks: true, // can click day/week names to navigate views
        selectMirror: true,
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
        },
        eventRender: function (info) {
            $(info.el).find('.fc-title').html(info.event.title);
        },
        events: [],
        selectable: true,
        select: function (info) {
            selectedEvent = {
                id: 0,
                start: moment(info.startStr),
                end: moment(info.endStr)
            }
            window.info = info;
            console.log(info);
            openAddOrUpdateModal(info.view.type);
        },
        eventResize: function (info) {
            eventDrop(info);
        },
        eventClick: function (arg) {
            var eventObj = arg.event;
            var PLANGROUPCODE = eventObj.id;
            getPlansDetails(PLANGROUPCODE);
        },
        eventDrop: function (info) {
            eventDrop(info);
        }
    });
    $("body").on("click", ".fc-dayGridMonth-button", function () {
        $(".fc-title br").remove();
    });
    $("body").on("click", "input[name=WEEKCHECK2]", function () {
        var STATE = $(this).prop("checked");
        if (STATE == true) {
            activeInactiveWeekends = true;
        }
        else {
            activeInactiveWeekends = false;
        }
        calendar.setOption('weekends', activeInactiveWeekends);//dinamikleştirme kodu
    });

    calendar.setOption('weekends', false);
    calendar.render();
    getPlans();
    window.planAddModal = new bootstrap.Modal(document.getElementById('newPlanCreate'), {
        keyboard: false
    });
    window.planEditModal = new bootstrap.Modal(document.getElementById('editPlan'), {
        keyboard: false
    });


    function formatDateToISO(dateString) {
        const date = new Date(dateString);

        // Türkiye saati UTC+3
        const offset = 3 * 60; // dakika olarak
        const localTime = new Date(date.getTime() - offset * 60 * 1000);

        const year = localTime.getFullYear();
        const month = String(localTime.getMonth() + 1).padStart(2, '0');
        const day = String(localTime.getDate()).padStart(2, '0');
        const hours = String(localTime.getHours()).padStart(2, '0');
        const minutes = String(localTime.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    function eventDrop(info) {

        const event = {
            id: info.event.id,
            start: info.event.start.toISOString(),
            end: info.event.end ? info.event.end.toISOString() : null,
            allDay: info.event.allDay
        };
        var newStart = formatDateToISO(event.start);
        var newEnd = formatDateToISO(event.end);
        // Show the update event window



        var PLANGROUPCODE = event.id;
        $.ajax({
            type: 'POST',
            url: "/CpmServisSistemi/GetEditPlan",
            data: { 'PLANGROUPCODE': PLANGROUPCODE },
            success: function (result) {
                if (result.IsSuccess == true) {
                    swal(result.Message,
                        {
                            title: "UYARI !",
                            icon: "warning",
                            buttons: "Tamam",
                        });
                    info.revert();
                }
                else {
                    $("#editPlan .modal-body").html(result);
                    $('#STARTDATEUPDATE').val(newStart);
                    $('#ENDDATEUPDATE').val(newEnd);
                    window.planEditModal.show();
                }
                //$('#closeUpdate').on('click', function () {
                //    info.revert();
                //    $('#updateDropEvent').modal('hide');
                //});
                $('#iptalUpdate').on('click', function () {
                    info.revert();
                    $('#editPlan').modal('hide');
                });


            },
            error: function () {
                alert('Erişim sağlanamadı.');
            }
        });


    }
    //#region Dosyaları diziye atar
    window.filesArray = [];
    $("#newPlanCreate #multipleFile").on("change", function (e) {
        debugger;
        var files = e.target.files;
        for (var i = 0; i < files.length; i++) {
            window.filesArray.push(files[i]);
        }
    });
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
        $("#newPlanCreate #STARTDATE").val(date.getValidFormat());
        $("#newPlanCreate #ENDDATE").val(date.getValidFormat());
    } catch (error) {
        console.error(error);
    }
    // #endregion
    //#region Olay Detay Getir
    function getPlansDetails(PLANGROUPCODE) {
        var planDetailsCard = $("#PLANDETAILSCARD");
        //$.blockUI({
        //    message: '<lottie-player autoplay  loop mode="normal" src="/Scripts/LottieFiles/cpm-loading-sc.json" style="width: 320px"></lottie-player>',
        //});
        //$("#PLANDETAILSCARD").block({
        //    message: '<lottie-player autoplay loop mode="normal" src="/Scripts/LottieFiles/cpm-loading-sc.json" style="width: 100px"></lottie-player>',
        //    css: {
        //        border: 'none',
        //        backgroundColor: 'transparent'
        //    }
        //});
        //var minTime = 5000; // Minimum 1 saniye göster (1000ms)
        //var startTime = new Date().getTime();
        $.ajax({
            type: 'GET',
            url: "/CpmServisSistemi/GetPlansDetails?PLANGROUPCODE=" + PLANGROUPCODE,
            datatype: "html",
            cache: false,
            success: function (data) {
                planDetailsCard.html("");
                if (data != null) {
                    planDetailsCard.html(data);
                    $(".drawer-end").addClass("drawer-on");
                    $("body").attr("data-kt-drawer-explore", "on");
                    $("body").attr("data-kt-drawer", "on");
                }
                //setTimeout(function () {
                //    $("#PLANDETAILSCARD").unblock();
                //}, minTime);
            },
            error: function (xhr) {
                alert('error');
            }
        });
    }
    //#endregion
    //#region Plan Getir
    function getPlans() {
        debugger;
        $.ajax({
            type: 'GET',
            url: '/CpmServisSistemi/GetPlans',
            success: function (response) {
                events = [];
                var sources = calendar.getEventSources();
                for (var i = 0; i < sources.length; i++) {
                    sources[i].remove();
                }
                for (var i = 0; i < response.length; i++) {
                    var deg;
                    if (response[i].STATESERVICEFORM == true) {
                        deg = "✅";
                    }
                    else {
                        deg = "";
                    }
                    var splitfullname = response[i].FULLNAME;
                    var COUNTFULLNAME = 1;
                    if (splitfullname != null) {
                        COUNTFULLNAME = COUNTFULLNAME + (response[i].FULLNAME.match(/,/g) || []).length;
                    }
                    var str;
                    var delimiter;
                    var start;
                    var tokens2;
                    var FULLNAME;
                    var sonuc = COUNTFULLNAME - 4;
                    if (COUNTFULLNAME > 3) {
                        str = splitfullname,
                            delimiter = ',',
                            start = 3,
                            tokens2 = str.split(delimiter).slice(0, start),
                            FULLNAME = tokens2.join(delimiter); // this
                        if (sonuc == 0) {
                            events.push({
                                id: response[i].PLANGROUPCODE,
                                title: response[i].UNVAN + " " + deg + '<br />' + '• ' + FULLNAME + '<br />' + '<font class="' + response[i].EVENTCOLORTEXT + '">' + '• ' + response[i].SERVICETYPENAME + '<font />',
                                start: dateFormatlama(response[i].STARTDATE),
                                end: dateFormatlama(response[i].ENDDATE),
                                className: response[i].EVENTCOLOR,
                                description: response[i].COMMENT
                            });
                        }
                        else {
                            events.push({
                                id: response[i].PLANGROUPCODE,
                                title: response[i].UNVAN + " " + deg + '<br />' + '• ' + FULLNAME + " " + "+" + sonuc + '<br />' + '<font class="' + response[i].EVENTCOLORTEXT + '">' + '• ' + response[i].SERVICETYPENAME + '<font />',
                                start: dateFormatlama(response[i].STARTDATE),
                                end: dateFormatlama(response[i].ENDDATE),
                                className: response[i].EVENTCOLOR,
                                description: response[i].COMMENT
                            });







                        }
                    }
                    else {
                        FULLNAME = response[i].FULLNAME;
                        if (!!FULLNAME) {
                            events.push({
                                id: response[i].PLANGROUPCODE,
                                title: response[i].UNVAN + " " + deg + '<br />' + '• ' + FULLNAME.slice(0, -1) + '<br />' + '<font class="' + response[i].EVENTCOLORTEXT + '">' + '• ' + response[i].SERVICETYPENAME + '<font />',
                                start: dateFormatlama(response[i].STARTDATE),
                                end: dateFormatlama(response[i].ENDDATE),
                                className: response[i].EVENTCOLOR,
                                description: response[i].COMMENT

                            });
                        }
                    }

                }
                calendar.addEventSource(events);
            },
            error: function () {
                $("#newPlanCreate").modal("hide");
                alert('Plan eklenirken bir problem oluştu.');
            }
        });
    }
    //#endregion
    //#region Tarih ve Saat Formatlama
    function dateFormatlama(value) {
        var pattern = /Date\(([^)]+)\)/;
        var results = pattern.exec(value);
        var dt = new Date(parseFloat(results[1]));
        //console.log(dt);
        var ay;
        var gun;
        var saat;
        var dakika;
        if ((dt.getMonth() + 1) < 10) {
            ay = '0' + (dt.getMonth() + 1)
        }
        else {
            ay = (dt.getMonth() + 1);
        }
        if (dt.getDate() < 10) {
            gun = '0' + dt.getDate();
        }
        else {
            gun = dt.getDate();
        }
        if (dt.getHours() < 10) {
            saat = '0' + dt.getHours();
        }
        else {
            saat = dt.getHours();
        }
        if (dt.getMinutes() < 10) {
            dakika = '0' + dt.getMinutes();
        }
        else {
            dakika = dt.getMinutes();
        }
        //2021-05-29T14:00:00
        return dt.getFullYear() + "-" + ay + "-" + gun + "T" + saat + ":" + dakika + ":00";
    }
    //#endregion
    //#region Plan Ekle Modal - Seçilen tarihi doldurma fonksiyonu
    function openAddOrUpdateModal(type) {
        console.log(type);
        if (type == "dayGridWeek" || type == "dayGridMonth") {
            var date = selectedEvent.end._d;
            date.setDate(date.getDate());
            selectedEvent.end = new moment(date.toISOString().split('T')[0]);
        }

        if (selectedEvent != null) {
            if (selectedEvent.start._i.indexOf('T') == -1)
                selectedEvent.start._i = selectedEvent.start._i + 'T09:00:00';
            if (selectedEvent.end._i.indexOf('T') == -1)
                selectedEvent.end._i = selectedEvent.end._i + 'T18:00:00';
            $('#PLANID').val(selectedEvent.id);
            $('#COMPANYID').val(selectedEvent.COMPANYID);
            $('#SERVICETYPEID').val(selectedEvent.SERVICETYPEID);
            $('#newPlanCreate #STARTDATE').val(selectedEvent.start._i);
            $('#newPlanCreate #ENDDATE').val(selectedEvent.end._i);
            $('#PROVINCEID').val(selectedEvent.PROVINCEID);
            $('#DISTRICTID').val(selectedEvent.DISTRICTID);
            $('#PERSONID').val(selectedEvent.personid);
            $('#COMMENT').val(selectedEvent.COMMENT);
        }
        //Modal temizleme;
        $('#newPlanCreate .selectpicker').selectpicker('refresh');
        $('#newPlanCreate #SERVICETYPEID').val('');
        $('#newPlanCreate #PROVINCEID').val('');
        $('#newPlanCreate #DISTRICTID').val('');
        $('#newPlanCreate #PERSONID').val('');
        $('#newPlanCreate #COMMENT').val('');
        $('#newPlanCreate input[type="checkbox"]').prop('checked', false);
        window.planAddModal.show()
    }
    //#endregion
    //#region Plan Ekleme - Verileri Ajax İle Gonderme Fonksiyonu
    function savePlans(PlanData) {
        $.blockUI({
            message: '<lottie-player autoplay  loop mode="normal" src="/Scripts/LottieFiles/cpm-loading-sc.json" style="width: 320px"></lottie-player>',
        });
        window.planAddModal.hide();
        $.ajax({
            method: "POST",
            url: '/CpmServisSistemi/AddPlan',
            data: {
                PERSONID: PlanData.PERSONID, COMPANYID: PlanData.COMPANYID, SERVICETYPEID: PlanData.SERVICETYPEID,
                STARTDATE: PlanData.STARTDATE, ENDDATE: PlanData.ENDDATE, PROVINCEID: PlanData.PROVINCEID, PROVINCE: PlanData.PROVINCE, DISTRICTID: PlanData.DISTRICTID,
                DISTRICTNAME: PlanData.DISTRICTNAME, DONTADDMEE: PlanData.DONTADDMEE, COMMENT: PlanData.COMMENT
            },
            success: function (result) {
                setTimeout($.unblockUI, 300);
                window.planAddModal.hide();
                getPlans();
                if (result.IsSuccess == true) {

                    toastr.success(result.Message);
                    if (PlanData.filecount > 0) {
                        $.ajax({
                            type: 'POST',
                            url: "/CpmServisSistemi/UploadPlanFiles",
                            data: PlanData.fileData,
                            dataType: "json",
                            contentType: false,
                            processData: false,
                            success: function (result) {
                                setTimeout($.unblockUI, 300);
                                if (result.IsSuccess == true) {
                                    toastr.success(result.Message);
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
                }
                else {
                    toastr.error(result.Message);
                }
                $("#btnNewPlanAdd").attr('disabled', false);
            },
            error: function () {
                window.planAddModal.hide()
                alert('Erişim sağlanamadı.');
            }
        });
    }
    //#endregion

    function saveIzın(IZINTYPEID) {
        debugger;
        var PERSONID = [];
        $("#PERSONID :selected").map(function (i, el) {
            PERSONID.push($(el).val());
        }).get();
        var Data = {
            PERSONID,
            COMPANYID: $("#newPlanCreate #COMPANYID option:selected").val(),
            STARTDATE: $("#newPlanCreate #STARTDATE").val(),
            ENDDATE: $("#newPlanCreate #ENDDATE").val(),
            PROVINCEID: $("#newPlanCreate #PROVINCEID option:selected").val(),
            PROVINCE: $("#newPlanCreate #PROVINCEID option:selected").text(),
            DISTRICTNAME: $("#newPlanCreate #DISTRICTID option:selected").text(),
            DISTRICTID: $("#newPlanCreate #DISTRICTID option:selected").val(),
            COMMENT: $("#newPlanCreate #COMMENT").val().trim(),
            DONTADDMEE: $("input[name=DontAddMe]").prop("checked"),

        }
        $.blockUI({
            message: '<lottie-player autoplay  loop mode="normal" src="/Scripts/LottieFiles/cpm-loading-sc.json" style="width: 320px"></lottie-player>',
        });
        window.planAddModal.hide();
        $.ajax({
            method: "POST",
            url: '/Permission/AddIzın',
            data: {
                PERSONID: Data.PERSONID, COMPANYID: Data.COMPANYID, SERVICETYPEID: IZINTYPEID,
                STARTDATE: Data.STARTDATE, ENDDATE: Data.ENDDATE, PROVINCEID: Data.PROVINCEID, PROVINCE: Data.PROVINCE, DISTRICTID: Data.DISTRICTID,
                DISTRICTNAME: Data.DISTRICTNAME, DONTADDMEE: Data.DONTADDMEE, COMMENT: Data.COMMENT
            },
            success: function (result) {
                setTimeout($.unblockUI, 300);
                window.planAddModal.hide();
                getPlans();
                if (result.IsSuccess == true) {
                    toastr.success(result.Message);
                }
                else {
                    toastr.error(result.Message);
                }
                $("#btnNewPlanAdd").attr('disabled', false);
            },
            error: function () {
                window.planAddModal.hide()
                alert('Erişim sağlanamadı.');
            }
        });
    }


    $('body').on('change', '#SERVICETYPEID', function () {
        if ($("#newPlanCreate #SERVICETYPEID option:selected").val() == 8 || $("#newPlanCreate #SERVICETYPEID option:selected").val() == 17) {
            $("#INFORMATIONAREA").attr("hidden", false);
            $("#INFORMATIONAREASERVICETYPE").attr("hidden", false);
            $("#SERVICETYPEDIV").removeClass("mb-3");

            $.ajax({
                type: "GET",
                url: "/CpmServisSistemi/GetPersonPermissionInfo",
                success: function (response) {
                    $('#IAPERMISSIONREMAINING').text(response.IZINKALAN + ' gün izniniz kalmıştır!')
                },
                error: function () {

                }
            });

            setSaveButtonState()

        }
        else {
            $("#INFORMATIONAREA").attr("hidden", true);
            $("#INFORMATIONAREASERVICETYPE").attr("hidden", true);
            $("#SERVICETYPEDIV").addClass("mb-3");
        }

    });

    function setSaveButtonState() {
        if ($("#newPlanCreate #SERVICETYPEID option:selected").val() == 8) {
            if ($('input#STARTDATE').val().split('T')[1] == '09:00' && $('input#ENDDATE').val().split('T')[1] == '18:00') {
                $('#btnNewPlanAdd').removeAttr('disabled');
            }
            else {
                $('#btnNewPlanAdd').attr('disabled', 'disabled');
            }
        }
        else if ($("#newPlanCreate #SERVICETYPEID option:selected").val() == 17) {
            if ($('input#STARTDATE').val().split('T')[1] == '09:00' && $('input#ENDDATE').val().split('T')[1] == '18:00') {
                $('#btnNewPlanAdd').attr('disabled', 'disabled');
            }
            else {
                $('#btnNewPlanAdd').removeAttr('disabled');
            }
        }
    }

    $('body').on('change', '#STARTDATE, #ENDDATE', function () {
        setSaveButtonState()
    });

    //#region Tüm Gün CheckBox Tıklandığında butonu disabled yap
    $("body").on("click", "input[name=allDayCheckBox]", function () {
        setSaveButtonState()

    });
    //#endregion

    //#region Plan Ekleme - Verileri Modaldan Çekme
    $('#btnNewPlanAdd').click(function () {
        debugger;
        var COMPANYID = $("#newPlanCreate #COMPANYID option:selected").val();
        var IZINTYPEID = $("#newPlanCreate #SERVICETYPEID option:selected").val();
        if (IZINTYPEID == 8 || IZINTYPEID == 17) {
            saveIzın(IZINTYPEID)
        }
        else {
            debugger;
            //Ekle butonuna tiklandiginda...   
            var fileData = new FormData();
            for (var i = 0; i < window.filesArray.length; i++) {
                fileData.append(window.filesArray[i].name, window.filesArray[i]);
            }
            var filecount = window.filesArray.length;
            /* DontAddMe*/
            var DONTADDMEE = $("input[name=DontAddMe]").prop("checked");
            var PERSONID = [];
            $("#PERSONID :selected").map(function (i, el) {
                PERSONID.push($(el).val());
            }).get();

            if ($('#COMPANYID').val() === null) {

                swal(
                    'UYARI ?',
                    'Lütfen Firma adı seçiniz!',
                    'info'
                )

                return;
            }
            else if ($('#SERVICETYPEID').val() === "") {
                swal(
                    'UYARI ?',
                    'Lütfen Servis türü seçiniz!',
                    'info'
                )

                return;
            }
            else if ($('#STARTDATE').val() === "") {
                swal(
                    'UYARI ?',
                    'Lütfen Başlangıç tarihi seçiniz!',
                    'info'
                )

                return;
            }
            else if ($('#ENDDATE').val() === "") {
                swal(
                    'UYARI ?',
                    'Lütfen Bitiş tarihi seçiniz!',
                    'info'
                )

                return;
            }
            else if ($('#PROVINCEID').val() === "" || $('#PROVINCEID').val() === null) {
                swal(
                    'UYARI ?',
                    'Lütfen İl şeçiniz !',
                    'info'
                )

                return;
            }
            else if ($('#DISTRICTID').val() === "" || $('#DISTRICTID').val() === null) {
                swal(
                    'UYARI ?',
                    'Lütfen İlçe seçiniz !',
                    'info'
                )
                return;
            }

            else {
                if ($("#newPlanCreate #SERVICETYPEID option:selected").val() == 17) {
                    var timeDiff = (((new Date($('#ENDDATE').val())) - (new Date($('#STARTDATE').val()))) / (1000 * 60 * 60));
                    if (timeDiff > 7.5) {
                        alert("Saat aralığı saatlik alabileceğiniz izinden fazla!");
                        return;
                    }
                }
                if (DONTADDMEE == true && PERSONID.length == 0) {
                    swal(
                        'UYARI ?',
                        'Plana eklenecek kullanıcı seçimi yapınız !',
                        'info'
                    )

                    return;
                }
                $(this).attr('disabled', true);
                var PlanData = {
                    fileData,
                    filecount,
                    PERSONID,
                    COMPANYID: $("#newPlanCreate #COMPANYID option:selected").val(),
                    SERVICETYPEID: $("#newPlanCreate #SERVICETYPEID option:selected").val(),
                    STARTDATE: $("#newPlanCreate #STARTDATE").val(),
                    ENDDATE: $("#newPlanCreate #ENDDATE").val(),
                    PROVINCEID: $("#newPlanCreate #PROVINCEID option:selected").val(),
                    PROVINCE: $("#newPlanCreate #PROVINCEID option:selected").text(),
                    DISTRICTNAME: $("#newPlanCreate #DISTRICTID option:selected").text(),
                    DISTRICTID: $("#newPlanCreate #DISTRICTID option:selected").val(),
                    COMMENT: $("#newPlanCreate #COMMENT").val().trim(),
                    DONTADDMEE: DONTADDMEE
                }
                savePlans(PlanData);

            }
        }
    });
    //#endregion
    // #region Plan Ekle Popup - Firmaya İl-İlçe Bilgisi Getir
    try {
        $("body").on("change", "#newPlanCreate #COMPANYID", function () {
            debugger;
            var COMPANYID = $("#newPlanCreate #COMPANYID option:selected").val();
            var COMPANY = $("#newPlanCreate #COMPANYID option:selected").text();
            var PROVINCEID = $("#newPlanCreate #PROVINCEID");
            var DISTRICTNAME = $("#newPlanCreate #DISTRICTID");

            if (COMPANYID != "" && COMPANY != "Seçiniz") {
                $.ajax({
                    url: '/CpmServisSistemi/GetCompanyProvinceAndDistrict',
                    type: 'POST',
                    dataType: 'json',
                    data: { 'COMPANYID': COMPANYID },
                    success: function (data) {
                        // Şehir ve ilçe dropdownlarını temizle
                        PROVINCEID.empty().append('<option value="">Seçiniz</option>');
                        DISTRICTNAME.empty().append('<option value="">Seçiniz</option>');

                        if (data && data.length > 0) {
                            // Şehir bilgisi otomatik olarak seçili hale gelsin
                            var selectedProvinceID = data[0].FATURAADRES5; // Şehir ID
                            var selectedDISTRICT = data[0].FATURAADRES4; // Şehir ID
                            var selectedDISTRICTID = data[0].ILCEKOD; // Şehir ID
                            PROVINCEID.append('<option value="' + selectedProvinceID + '" selected>' + data[0].ILAD + '</option>');
                            DISTRICTNAME.append('<option value="' + selectedDISTRICTID + '" selected>' + data[0].FATURAADRES4 + '</option>');

                            // İlçeleri yükle
                            loadDistrictsByProvince(selectedProvinceID, DISTRICTNAME);
                        }
                    }
                });
            }
        });

        // Şehire göre ilçe bilgisini getirme
        $("body").on("change", "#newPlanCreate #PROVINCEID", function () {
            var PROVINCEID = $("#newPlanCreate #PROVINCEID option:selected").val();
            var DISTRICTNAME = $("#newPlanCreate #DISTRICTID");
            if (PROVINCEID != "" && PROVINCEID != "Seçiniz") {
                loadDistrictsByProvince(PROVINCEID, DISTRICTNAME);
            }
        });

        // İlçeleri yükleyen yardımcı fonksiyon
        function loadDistrictsByProvince(PROVINCEID, DISTRICTNAME) {
            $.ajax({
                url: '/CpmServisSistemi/GetProvinceDistricts',
                type: 'POST',
                dataType: 'json',
                data: { 'PROVINCEID': PROVINCEID },
                success: function (data) {
                    /*    DISTRICTNAME.empty().append('<option value="">Seçiniz</option>');*/
                    $.each(data, function (index, option) {
                        DISTRICTNAME.append('<option value="' + option.ILCEKOD.toString() + '">' + option.ILCEAD + '</option>');
                    });
                }
            });
        }
    }
    catch (error) {
        console.error(error);
    }
    // #endregion
    //#region Plan Ekle Popup - İl Seçilince İlçe Temizle
    try {
        $("body").on("change", "#newPlanCreate #PROVINCEID", function () {
            var DISTRICTNAME = $("#newPlanCreate #DISTRICTID");
            DISTRICTNAME.val("");
        });
    }
    catch (error) {
        console.error(error);
    }
    // #endregion
    // #region Plan Guncelleme Verilerini Getiren Ajax
    $("body").on("click", "#PLANDETAILSCARD #btnPlanUpdate", function () {
        var PLANGROUPCODE = $(this).attr("data-id");
        $.ajax({
            type: 'POST',
            url: "/CpmServisSistemi/GetEditPlan",
            data: { 'PLANGROUPCODE': PLANGROUPCODE },
            success: function (result) {
                if (result.IsSuccess) {
                    swal({
                        title: "UYARI !",
                        text: result.Message,
                        icon: "warning",
                        buttons: "Tamam"
                    });
                    window.planEditModal.hide();
                    revertFunc();
                } else {
                    $("#editPlan .modal-body").html(result);
                    window.planEditModal.show();
                }
            },
            error: function () {
                alert('Erişim sağlanamadı.');
            }
        });

    });

    // #region Plan Guncelleme Verilerini Getiren Ajax
    $("body").on("click", "#PLANDETAILSCARD #btnGorevUpdate", function () {
        debugger;
        var PLANGROUPCODE = $(this).attr("data-id");
        $.ajax({
            type: 'POST',
            url: "/CpmServisSistemi/GetEditGorev",
            data: { 'PLANGROUPCODE': PLANGROUPCODE },
            success: function (result) {
                if (result.IsSuccess) {
                    swal({
                        title: "UYARI !",
                        text: result.Message,
                        icon: "warning",
                        buttons: "Tamam"
                    });
                    window.gorevEditModal.hide();
                    revertFunc();
                } else {
                    $("#editGorev .modal-body").html(result);
                    window.gorevEditModal.show();
                }
            },
            error: function () {
                alert('Erişim sağlanamadı.');
            }
        });

    });

    ////#endregion
    //#region Plan Güncelleme - Verileri Modaldan Çekme
    $("body").on("click", "#editPlan #modalBtnPlanUpdate", function () { //Ekle butonuna tiklandiginda...
        var PLANGROUPCODE = $(this).attr("data-id");
        var PERSONID = [];
        var fileData = new FormData();
        for (var i = 0; i < window.filesArray2.length; i++) {
            fileData.append(window.filesArray2[i].name, window.filesArray2[i]);
        }
        //var filecount = window.filesArray.length;
        var FILELENGTH = window.filesArray2.length;
        $("#editPlan #PERSONIDUPDATE :selected").map(function (i, el) {
            PERSONID.push($(el).val());
        }).get();
        if ($('#editPlan #COMPANYIDUPDATE').val() === null) {
            alert("Firma adı seçiniz !");
            return;
        }
        else if ($('#editPlan #SERVICETYPEIDUPDATE').val() === "") {
            alert("Servis türü seçiniz !");
            return;
        }
        else if ($('#editPlan #STARTDATEUPDATE').val() === "") {
            alert("Başlangıç tarihi seçiniz !");
            return;
        }
        else if ($('#editPlan #ENDDATEUPDATE').val() === "") {
            alert("Bitiş tarihi seçiniz!");
            return;
        }
        else if ($('#editPlan #PROVINCEIDUPDATE').val() === "") {
            alert("İl seçiniz!");
            return;
        }
        else if ($('#editPlan #DISTRICTIDUPDATE').val() === "") {
            alert("İlçe yazınız!");
            return;
        }
        else {
            var PlanData = {
                FILELENGTH,
                fileData,
                PLANGROUPCODE,
                PERSONID,
                COMPANYID: $("#editPlan #COMPANYIDUPDATE option:selected").val(),
                SERVICETYPEID: $("#editPlan #SERVICETYPEIDUPDATE option:selected").val(),
                STARTDATE: $("#editPlan #STARTDATEUPDATE").val(),
                ENDDATE: $("#editPlan #ENDDATEUPDATE").val(),
                PROVINCEID: $("#editPlan #PROVINCEIDUPDATE option:selected").val(),
                COMMENT: $("#editPlan #COMMENTUPDATE").val().trim(),
                DISTRICTNAME: $("#editPlan #DISTRICTIDUPDATE").val()
            }
            updatePlans(PlanData);
        }
    });
    //#endregion
    //#region Plan Güncelleme - Verileri Ajax İle Gonderme Fonksiyonu
    function updatePlans(PlanData) {
        $.blockUI({
            message: '<lottie-player autoplay  loop mode="normal" src="/Scripts/LottieFiles/cpm-loading-sc.json" style="width: 320px"></lottie-player>',
        });
        $.ajax({
            method: "POST",
            url: '/CpmServisSistemi/UpdatePlan',
            data: { PLANGROUPCODE: PlanData.PLANGROUPCODE, PERSONID: PlanData.PERSONID, COMPANYID: PlanData.COMPANYID, SERVICETYPEID: PlanData.SERVICETYPEID, STARTDATE: PlanData.STARTDATE, ENDDATE: PlanData.ENDDATE, PROVINCEID: PlanData.PROVINCEID, DISTRICTNAME: PlanData.DISTRICTNAME, COMMENT: PlanData.COMMENT },
            success: function (result) {
                if (result.IsSuccess == false) {
                    //alert(result.Message);
                    window.planEditModal.hide();
                    revertFunc();
                    swal(result.Message,
                        {
                            title: "UYARI !",
                            icon: "warning",
                            buttons: "Tamam",
                        });
                    setTimeout($.unblockUI, 300);
                }
                else {
                    setTimeout($.unblockUI, 300);
                    window.planEditModal.hide();
                    $(".drawer-end").removeClass("drawer-on");
                    $(".drawer-end").addClass("drawer-off");
                    $("body").attr("data-kt-drawer-explore", "off");
                    $("body").attr("data-kt-drawer", "off");
                    toastr.success(result.Message);
                    getPlans();
                    if (result.IsSuccess == true && PlanData.FILELENGTH > 0) {
                        $.ajax({
                            type: 'POST',
                            url: "/CpmServisSistemi/UploadPlanFilesUpdate",
                            data: PlanData.fileData,
                            dataType: "json",
                            contentType: false,
                            processData: false,
                            success: function (result) {
                                setTimeout($.unblockUI, 300);
                                if (result.IsSuccess == true) {
                                    $(".drawer-end").removeClass("drawer-on");
                                    $(".drawer-end").addClass("drawer-off");
                                    $("body").attr("data-kt-drawer-explore", "off");
                                    $("body").attr("data-kt-drawer", "off");
                                    toastr.success(result.Message);
                                }
                                else {
                                    $(".drawer-end").removeClass("drawer-on");
                                    $(".drawer-end").addClass("drawer-off");
                                    $("body").attr("data-kt-drawer-explore", "off");
                                    $("body").attr("data-kt-drawer", "off");
                                    toastr.error(result.Message);
                                }
                            },
                            error: function () {
                                alert('Erişim sağlanamadı.');
                            }
                        });
                    }
                }
            },
            error: function () {
                window.planEditModal.hide();
                revertFunc();
                alert('Erişim sağlanamadı.');
            }
        });
    }
    //#endregion
    // #region Plan Düzenle Popup - Firmaya İl-İlçe Bilgisi Getir
    try {
        $("body").on("change", "#editPlan #COMPANYIDUPDATE", function () {

            var COMPANYID = $("#editPlan #COMPANYIDUPDATE option:selected").val();
            var COMPANY = $("#editPlan #COMPANYID option:selected").text();
            var PROVINCEID = $("#editPlan #PROVINCEIDUPDATE");
            var DISTRICTNAME = $("#editPlan #DISTRICTIDUPDATE");
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
    //#region Plan Düzenle Popup - İl Seçilince İlçe Temizle
    try {
        $("body").on("change", "#editPlan #PROVINCEIDUPDATE", function () {
            var DISTRICTNAME = $("#editPlan #DISTRICTIDUPDATE");
            DISTRICTNAME.val("");
        });
    }
    catch (error) {
        console.error(error);
    }
    // #endregion
    // #region  Plan Sil
    jQuery('body').on('click', '#PLANDETAILSCARD #btnPlanDelete', function () {
        debugger;
        var PLANGROUPCODE = $(this).attr("data-id");
        var SERVICEFORMCONFIRM = $(this).attr("data-stateform");
        var SERVICETYPEID = $('#PLANDETAILSCARD .name').text();
        if (SERVICETYPEID == "İzinli" || SERVICETYPEID == "Saatlik") {
            deletePermission(PLANGROUPCODE);
        }
        else {
            swal({
                title: "Dikkat!",
                text: "Planı silmek istediğinize emin misiniz?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                buttons: ['Vazgeç', 'Sil']
            }).then((result) => {
                if (result) {
                    $.ajax({
                        url: "/CpmServisSistemi/DeletePlan",
                        type: 'POST',
                        data: { 'PLANGROUPCODE': PLANGROUPCODE },
                        success: function (result) {
                            if (result.IsSuccess == true) {
                                var event = calendar.getEventById(PLANGROUPCODE);
                                event.remove();

                                swal({
                                    title: "Silindi",
                                    text: result.Message,
                                    icon: "success",
                                    confirmButtonText: 'Tamam'
                                })
                                $(".drawer-end").removeClass("drawer-on");
                                $(".drawer-end").addClass("drawer-off");

                                location.reload();
                            }
                            else {

                                swal(
                                    'Hata Oluştu!',
                                    result.Message,
                                    'error'
                                )
                            }
                        },

                    });
                }
            })
        }


    });
    //#endregion 
    // #region  Görev Sil
    jQuery('body').on('click', '#PLANDETAILSCARD #btnGorevDelete', function () {
        debugger;
        var PERMISSIONID = $(this).attr("data-permissionId");
        var GOREVNO = $(this).attr("data-GorevNo");
        swal({
            title: "Dikkat!",
            text: "Görevi silmek istediğinize emin misiniz?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            buttons: ['Vazgeç', 'Sil']
        }).then((result) => {
            if (result) {
                $.ajax({
                    url: "/CpmServisSistemi/DeleteGorev",
                    type: 'POST',
                    data: { 'PERMISSIONID': PERMISSIONID, 'GOREVNO': GOREVNO },
                    success: function (result) {
                        if (result.IsSuccess == true) {
                            var event = calendar.getEventById(PERMISSIONID, GOREVNO);
                            event.remove();
                            swal({
                                title: "Görev Silindi",
                                text: result.Message,
                                icon: "success",
                                confirmButtonText: 'Tamam'
                            })
                            $(".drawer-end").removeClass("drawer-on");
                            $(".drawer-end").addClass("drawer-off");

                            location.reload();
                        }
                        else {

                            swal(
                                'Hata Oluştu!',
                                result.Message,
                                'error'
                            )
                        }
                    },

                });
            }
        })

    });
    //#endregion

    // #region  İzin Sil
    function deletePermission(PLANGROUPCODE) {
        debugger;
  

        swal({
            title: "Dikkat!",
            text: "İzni silmek istediğinize emin misiniz?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            buttons: ['Vazgeç', 'Sil']
        }).then((result) => {
            if (result) {
                $.ajax({
                    url: "/Permission/DeleteIzin",
                    type: 'POST',
                    data: { 'PLANGROUPCODE': PLANGROUPCODE},
                    success: function (result) {
                        if (result.IsSuccess == true) {
                            var event = calendar.getEventById(PLANGROUPCODE);
                            if (event) {
                                event.remove();
                            }

                            swal({
                                title: "Silindi",
                                text: result.Message,
                                icon: "success",
                                confirmButtonText: 'Tamam'
                            });

                            $(".drawer-end").removeClass("drawer-on").addClass("drawer-off");
                            location.reload();
                        } else {
                            swal('Hata Oluştu!', result.Message, 'error');
                        }
                    },
                    error: function () {
                        swal('Hata!', 'Silme işlemi sırasında bir hata oluştu.', 'error');
                    }
                });
            }
        });

    }
    //#endregion 

});






