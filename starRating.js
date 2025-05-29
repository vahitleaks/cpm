$(document).ready(function () {
    var slider = $("#vote-slider");
    var output = $("#vote");

    output.innerHTML = slider.value; // Display the default slider value
    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
        output.innerHTML = this.value;
    }

    $(".stars-container .star-item").on('click', function () {
        var starDataId = $(this).attr("data-id");

        $(".stars-container .star-item-" + starDataId).addClass("active");
        $(".stars-container .star-item-" + starDataId).prevAll().addClass("active");
        $(".stars-container .star-item-" + starDataId).nextAll().removeClass("active");
        var colorVal = (1 - ((starDataId * 2) / 10));
        $(".StarRating .top-img-container").css({ "filter": "grayscale(" + colorVal + ")" });
        $("#vote-slider").val(starDataId);
        $("#vote span").html($("#vote-slider").val())

    });
})