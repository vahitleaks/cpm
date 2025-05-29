// #region Tarih ve Saat 
var monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
var newDate = new Date();
newDate.setDate(newDate.getDate());
$('#Date').html(newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());
setInterval(function () {
    var minutes = new Date().getMinutes();
    $("#min").html((minutes < 10 ? "0" : "") + minutes);
});
setInterval(function () {
    var hours = new Date().getHours();
    $("#hours").html((hours < 10 ? "0" : "") + hours);
});
// #endregion