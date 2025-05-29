var isValidEmailAddress = function (controlemail) {
    var regex = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    //var regex = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    //var regex =/^[^0-9][a-zA-z0-9_]+([.][a-zA-z0-9_]+)*[@][a-zA-z0-9_]+([.][a-zA-z0-9_]+)*[.][a-zA-Z]{2,4}$/i;
    if (regex.test(controlemail) == true)
    {
        if (controlemail.contains) {

        }
        return true;
    }
    else { return false; }
}
