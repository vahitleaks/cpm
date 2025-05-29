//$(document).ready(function () {
//    const txHeight = 59;
//    const tx = document.getElementsByTagName("textarea");

//    for (let i = 0; i < tx.length; i++) {
//        if (tx[i].value == '') {
//            tx[i].setAttribute("style", "height:" + txHeight + "px;overflow-y:hidden;white-space:pre-wrap;background-color:rgba(255, 255, 255, 0);color: var(--thText)!important;border: 1px solid var(--thBorder)!important;border-radius:6px!important;font-size:12px!important;");
//        } else {
//            tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;white-space:pre-wrap;background-color:rgba(255, 255, 255, 0);color: var(--thText)!important;border: 1px solid var(--thBorder)!important;border-radius:6px!important;font-size:12px!important;");
//        }
//        tx[i].addEventListener("input", OnInput, false);
//    }

//    function OnInput(e) {
//        this.style.height = "auto";
//        this.style.height = (this.scrollHeight) + "px";
//    }
//});


window.FloatingTextarea = function () {
    const txHeight = 59;
    const tx = document.getElementsByTagName("textarea");

    for (let i = 0; i < tx.length; i++) {
        if (tx[i].value == '') {
            tx[i].setAttribute("style", "height:" + txHeight + "px;overflow-y:hidden;white-space:pre-wrap;background-color:rgba(255, 255, 255, 0);color: var(--thText)!important;border: 1px solid var(--thBorder)!important;border-radius:6px!important;font-size:12px!important;");
        } else {
            tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;white-space:pre-wrap;background-color:rgba(255, 255, 255, 0);color: var(--thText)!important;border: 1px solid var(--thBorder)!important;border-radius:6px!important;font-size:12px!important;");
        }
        tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput(e) {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    }



};



