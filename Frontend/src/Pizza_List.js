/**
 * Created by diana on 12.01.16.
 */

var pizza_info = [
    {
        id:1,
        icon:'assets/images/rsz_1noodles1.png',
        title: "Braingetti",
        type: 'Vegan',
        content: {
            brain: ['college student (Culturology)', 'Italian chef'],
            sauce: ['Sriracha', 'Worchestershire'],
            toppings: ['paprika'],
            additional: ['palm sugar']
        },
        small_size:{
            weight: 370,
            size: 30,
            price: 99
        },
        big_size:{
            weight: 660,
            size: 40,
            price: 169
        },
        is_new:true,
        is_popular:true

    },
    {
        id:2,
        icon:'assets/images/ramen.png',
        title: "Blue Ramen",
        type: 'Zombified Classic',
        content: {
            brain: ['pianist', 'kendo master'],
            sauce: ['Royal Blue'],
            meat: ['duck'],
            bodyparts: ['curdled blood'],
            additional: ['nori', 'ramen noodles', 'sesame']
        },
        small_size:{
            weight: 460,
            size: 30,
            price: 139
        },
        big_size:{
            weight: 840,
            size: 40,
            price: 199
        },
        is_popular:true
    },
    {
        id:3,
        icon:'assets/images/eyeballs.png',
        title: "Міксовий поло",
        type: 'М’ясна піца',
        content: {
            meat: ['вітчина', 'куриця копчена'],
            cheese: ['сир моцарелла'],
            pineapple: ['ананаси'],
            additional: ['кукурудза', 'петрушка', 'соус томатний']
        },
        small_size:{
            weight: 430,
            size: 30,
            price: 115
        },
        big_size:{
            weight: 780,
            size: 40,
            price: 179
        }
    },
    {
        id:4,
        icon:'assets/images/cocktail.png',
        title: "Сициліано",
        type: 'М’ясна піца',
        content: {
            meat: ['вітчина', 'салямі'],
            cheese: ['сир моцарелла'],
            mushroom: ['шампінйони'],
            additional: ['перець болгарський',  'соус томатний']
        },
        small_size:{
            weight: 450,
            size: 30,
            price: 111
        },
        big_size:{
            weight: 790,
            size: 40,
            price: 169
        }
    },
    {
        id:5,
        icon:'assets/images/cupcake.png',
        title: "Маргарита",
        type: 'Вега піца',
        content: {
            cheese: ['сир моцарелла', 'сир домашній'],
            tomato: ['помідори'],
            additional: ['базилік', 'оливкова олія', 'соус томатний']
        },
        small_size:{
            weight: 370,
            size: 30,
            price: 89
        },
        big_size:{
            weight: 780,
            size: 40,
            price: 179
        }
    }
];

module.exports = pizza_info;