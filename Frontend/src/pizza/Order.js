var Api = require('../API');
var PizzaCart = require('./PizzaCart');

function init() {
    var map = null;
    var geocodeAddress = function(address, callback) {};
    var setMarker = function(point) {};
    
    function initialize() {
        var marker = null;
        
        setMarker = function (point) {
            if (marker)
                marker.setMap(null);
            marker = new google.maps.Marker({
                position: point,
                map: map,
                icon: "assets/images/map-icon.png"
            });
        }
        //Тут починаємо працювати з картою
        var mapProp = {
            center: new google.maps.LatLng(50.464379,30.519131),
            zoom: 15
        };
        var html_element = document.getElementById("googleMap");
        map = new google.maps.Map(html_element, mapProp);
        //Карта створена і показана
        setMarker(new google.maps.LatLng(50.464379,30.519131));
        
        function geocodeLatLng(latlng, callback){
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'location': latlng}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK && results[1]) {
                    var adress = results[1].formatted_address;
                    callback(null, adress);
                } else {
                    callback(new Error("Can't find adress"));
                }
            });
        }
        
        geocodeAddress = function (address, callback) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'address': address}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK && results[0]) {
                    var coordinates = results[0].geometry.location;
                    callback(null, coordinates);
                } else {
                    callback(new Error("Can not find the adress"));
                }
            });
        };
        
        google.maps.event.addListener(map, 'click', function(me){
            var coordinates = me.latLng;
            setMarker(coordinates);
            geocodeLatLng(coordinates, function(err, adress) {
                if(!err) {
                    fillAddress(adress);
                } else {
                    console.log("Немає адреси")
                }
            });
        });
    }
    google.maps.event.addDomListener(window, 'load', initialize);
    
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
        if (input !== '')
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
                if (selector === '#addressInput') {
                    fillAddress(val);
                    geocodeAddress(val, function(err, coord){
                        if (!err)
                            setMarker(coord);
                        else console.log('no address found');
                    });
                }
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
    
    function fillAddress(address) {
        var $field = $('#addressInput');
        var $info = $('#order-address');
        
        $field.val(address);
        $info.text(address);
    }
    
}

exports.init = init;