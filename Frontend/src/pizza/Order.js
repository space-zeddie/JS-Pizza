var Api = require('../API');
var PizzaCart = require('./PizzaCart');
var map = null;

function init() {
    
    if (document.location.href === '/order')
        $('#order').text('Edit Order');
    
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
    
    function checkForFormFilling() {
        if ($('#nameInput').parent().hasClass('has-success') && $('#phoneInput').parent().hasClass('has-success')
            && $('#addressInput').parent().hasClass('has-success'))
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
    
    $('#submit-order').click(function (e){
        if (checkForFormFilling()) {
            Api.createOrder(PizzaCart.getPizzaInCart(), function (err, data) {
                if (!err)
                    alert(JSON.stringify(PizzaCart.getPizzaInCart()));
            });
        }
        else alert('Something went wrong. Try again.');
    });
    
    function setMarker(point) {
        var marker = new google.maps.Marker({
            position: point,
            map: map,
            icon: "assets/images/map-icon.png"
        });
    }
    
    function initialize() {
        //Тут починаємо працювати з картою
        var mapProp = {
            center: new google.maps.LatLng(50.464379,30.519131),
            zoom: 11
        };
        var html_element = document.getElementById("googleMap");
        map = new google.maps.Map(html_element, mapProp);
        //Карта створена і показана
        setMarker(new google.maps.LatLng(50.464379,30.519131));
    }
    google.maps.event.addDomListener(window, 'load', initialize);
}

exports.init = init;