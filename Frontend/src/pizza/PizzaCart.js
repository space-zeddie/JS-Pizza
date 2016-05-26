/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

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
    console.log('addToCart');
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

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...

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
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);
        
        function removeItem() {
            
        }

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

}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;