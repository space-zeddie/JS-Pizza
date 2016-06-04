var Api = require('../API');
var PizzaCart = require('./PizzaCart');

function base64(str) {
    return new Buffer(str).toString('base64');
}
var crypto = require('crypto');
function sha1(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}

function today() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd < 10) {
        dd = '0' + dd
    }    

    if(mm < 10) {
        mm = '0' + mm
    }    

    return mm+'/'+dd+'/'+yyyy;
}

function init() {
    var map = null;
    var geocodeAddress = function(address, callback) {};
    var setMarker = function(point) {};
    var PUBLIC_KEY = 'i93445480062';
    var PRIVATE_KEY = '3RALW5X7VEO0KdeY8mhOKGrLDh0RqfRNqljDgVaX';
    
    
    function initialize() {
        var marker = null;
        var homeCoord = new google.maps.LatLng(50.464379,30.519131)
        
        setMarker = function (point) {
            if (marker)
                marker.setMap(null);
            marker = new google.maps.Marker({
                position: point,
                map: map,
                animation: google.maps.Animation.DROP,
                icon: "assets/images/map-icon.png"
            });
            calculateRoute(homeCoord, point, function(err, duration) {
                if (!err) {
                    console.log(duration);
                    $('#order-time').text(duration.duration.text);
                  /*  var path = new google.maps.Polyline({
                        path: [homeCoord, point],
                        geodesic: true,
                        strokeColor: '#FF0000',
                        strokeOpacity: 1.0,
                        strokeWeight: 2
                    });
                    path.setMap(map);*/
                } else
                    console.log("could not determine the duration");
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
        var homeMarker = new google.maps.Marker({
            position: homeCoord,
            map: map,
            icon: "assets/images/home-icon.png"
        });
        
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
        
        function calculateRoute(A_latlng, B_latlng, callback) {
            var directionService = new google.maps.DirectionsService();
            directionService.route({
                origin: A_latlng,
                destination: B_latlng,
                travelMode: google.maps.TravelMode["DRIVING"]
            }, function(response, status) {
                if ( status == google.maps.DirectionsStatus.OK ) {
                    var leg = response.routes[ 0 ].legs[ 0 ];
                    callback(null, {
                        duration: leg.duration
                    });
                } else {
                    callback(new Error("Can' not find direction"));
                }
            });
        }
        
        google.maps.event.addListener(map, 'click', function(me){
            var coordinates = me.latLng;
            setMarker(coordinates);
            geocodeLatLng(coordinates, function(err, adress) {
                if(!err) {
                    fillAddress(adress);
                    $('#addressInput').parent().addClass('has-success');  
                } else {
                    console.log("Немає адреси")
                }
            });
        });
    }
    google.maps.event.addDomListener(window, 'load', initialize);
    
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
            else if ($(this).parent().hasClass('has-error')) {
                $(this).parent().removeClass('has-error');
                $(this).parent().addClass('has-success');  
            }
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
    
    function getCustomer() {
        return {
            name: $('#nameInput').val(),
            phone: $('#phoneInput').val(),
            address: $('#addressInput').val()
        };
    }
    
    $('#submit-order').click(function (e){
        if (checkForFormFilling()) {
            Api.createOrder(PizzaCart.getPizzaInCart(), function (err, data) {
                if (!err) {
                  //  alert(JSON.stringify(PizzaCart.getPizzaInCart()));
                    fileOrder(PizzaCart.getPizzaInCart(), getCustomer());
                } else {
                    console.log('error');
                }
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
    
    function fileOrder(items, customer) {
        var totalPrice = 0;
        var descr = '' + today() + ':\n';
        alert(JSON.stringify(customer));
        descr += customer.name + ', ' + customer.phone + ', ' + customer.address + '\n';
        items.forEach(function (item) {
            totalPrice += item.pizza[item.size].price * item.quantity;
            descr += item.quantity + ' x "' + item.pizza.title + '", ' + item.size + '\n';
        });
        
        var order = {
            version: 3,
            public_key: PUBLIC_KEY,
            action: "pay",
            amount: totalPrice,
            currency: "UAH",
            description: descr,
            order_id: ("" + Math.random()).substr(2),
            sandbox: 1
        };
        var data = base64(JSON.stringify(order));
        var signature = base64(sha1(PRIVATE_KEY + data + PRIVATE_KEY));
        console.log(order);
        LiqPayCheckout.init({
            data: order,
            signature: signature,
            embedTo: "#liqpay",
            mode: "popup" // embed || popup
        }).on("liqpay.callback", function(data){
            console.log(data.status);
            console.log(data);
        }).on("liqpay.ready", function(data){
            console.log(data);
        }).on("liqpay.close", function(data){
            console.log(data);
        });
    }
    
}

exports.init = init;