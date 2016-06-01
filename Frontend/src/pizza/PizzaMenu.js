/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');
var Api = require('../API');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function getPizzas(err, data) {
    if (!err)
        Pizza_List = data;
}

Api.getPizzaList(function (err, data) {
    if (!err)
        Pizza_List = data;
});

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");
    $('.clear-cart').click(PizzaCart.clearCart);

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

var filters = {
    noFilter: noFilter,
    dessertFilter: dessertFilter,
    veganFilter: veganFilter,
    drinkFilter: drinkFilter,
    newFilter: newFilter
};

function noFilter(pizza) { return true; }
    
function veganFilter(pizza) {
    if (pizza.type.toLowerCase().indexOf('vegan') > -1)
        return true;
    return false;
}

function drinkFilter(pizza) {
 //   alert(JSON.stringify(pizza));
    if (pizza.type.toLowerCase().indexOf('drink') > -1)
        return true;
    return false;
}

function newFilter(pizza) {
    if (pizza.is_new || pizza.is_popular) return true;
    return false;
}

function dessertFilter(pizza) {
    if (pizza.type.toLowerCase().indexOf('dessert') > -1) 
        return true;
    return false;
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        if (filter(pizza))
            pizza_shown.push(pizza);
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List);
    
    var $navigation = $('.nav.filter-nav');
    $('.nav.filter-nav > li').each(function (i, el) {
        switch(i) {
            case 0: 
                $(el).click(function () { 
                    filterPizza(filters.noFilter);
                    $('.nav-title').text($(this).text());
                });
                break;
            case 1: 
                $(el).click(function () { 
                    filterPizza(filters.dessertFilter);
                    $('.nav-title').text($(this).text());
                });
                break;
            case 2: 
                $(el).click(function () { 
                    filterPizza(filters.newFilter); 
                    $('.nav-title').text($(this).text());
                });
                break;
            case 3: 
                $(el).click(function () { 
                    filterPizza(filters.veganFilter); 
                    $('.nav-title').text($(this).text());
                });
                break;
            case 4: 
                $(el).click(function () { 
                    filterPizza(filters.drinkFilter);
                    $('.nav-title').text($(this).text());
                });
                break;
        }
    });
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;