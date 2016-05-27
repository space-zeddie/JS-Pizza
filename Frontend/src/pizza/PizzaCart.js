/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage	= require('./storage');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

function addToCart(pizza, size) {
    var item = {
        pizza: pizza,
        size: size,
        quantity: 1
    };
    var hasItem = false;
    Cart.forEach(function(val) {
        if (val.pizza === pizza && val.size === size) {
            hasItem = true;
            val.quantity++;
        }
    });
    
    if (!hasItem)
        Cart.push(item);

    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    Cart.splice(Cart.indexOf(cart_item), 1);
    //Після видалення оновити відображення
    updateCart();
}

function clearCart() {
    Cart = [];
    updateCart();
}

function initialiseCart() {
    Cart = Storage.get('order');
    
    if (!Cart)
        Cart = [];
        
    else if (Cart.length < 1) {
        $('.panel-footer .total').css('visibility', 'hidden');
        $('.panel-footer .total .price').css('visibility', 'hidden');
    }
    
    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function incItem(cart_item) {
    cart_item.quantity += 1;
    updateCart();
}

function updateCart() {
    var $price = $('.panel-footer .total.price');
    var $quantity = $('.cart-count.number-badge');
    var price = 0;
    var quantity = 0;
    
    $cart.html("");
    $price.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);
        price += cart_item.quantity * parseInt(cart_item.pizza[cart_item.size].price);
        quantity += cart_item.quantity;

        $node.find(".plus").click(function() {
            incItem(cart_item);
        });
        
        $node.find(".minus").click(function(){
            if (cart_item.quantity <= 1)
                removeFromCart(cart_item);
            else {
                cart_item.quantity -= 1;
                updateCart();
            }            
        });
        
        $node.find(".remove").click(function(){
            removeFromCart(cart_item);
        });

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
    $price.html(price + " USD");
    $quantity.html(quantity);
    
    Storage.set('order', Cart);
    
    if (Cart.length > 0) {
        $('.panel-footer .total').css('visibility', 'visible');
    }

}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;
exports.clearCart = clearCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;