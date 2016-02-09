/**
 * Created by chaika on 09.02.16.
 */
var API_URL = "http://localhost:5050";

exports.getPizzaList = function(callback) {
    $.get(API_URL + "/api/get-pizza-list/", function( data ) {
        console.log("Get Pizza Success", data);
        callback(null, data);
    }).fail(function() {
        console.error("Get Pizza Failed");
        callback(new Error("Can not get pizza"));
    });
};

exports.createOrder = function(order_info, callback) {
    $.post(API_URL + "/api/create-order/", order_info, function( data ) {
        console.log("Create order success", data);
        callback(null, data);
    }).fail(function() {
        console.error("Create order failed");
        callback(new Error("Can not create order"));
    });
};