function init() {
    
    function checkNameInput(input) {
        var letters = /^[A-Za-z]+$/;
        if (input !== '' && input.match(letters))
            return true;
        return false;
    }

    function checkPhoneInput(input) {
        var phoneNum = /^\+380[0-9]{9}$/;
        if (input !== '' && input.match(phoneNum))
            return true;
        return false;
    }

    function checkAddressInput(input) {
        var letters = /^[A-Za-z]+$/;
        if (input !== '' && input.match(letters))
            return true;
        return false;
    }
    
    function applyInteractions(selector, validFn) {
        $(selector).keyup(function(e) {
            var val = $(this).val();
            if ($(this).parent().hasClass('has-success'))
                $(this).parent().removeClass('has-success');
            if (!validFn(val))
                $(this).parent().addClass('has-error');
            else if ($(this).parent().hasClass('has-error'))
                $(this).parent().removeClass('has-error');
        });
        $(selector).focusout(function (e) {
            var val = $(this).val();
            if (validFn(val)) {
                $(this).parent().addClass('has-success');    
            }
        });
    }
    
    applyInteractions('#nameInput', checkNameInput);
    applyInteractions('#phoneInput', checkPhoneInput);
    applyInteractions('#addressInput', checkAddressInput);
}

exports.init = init;