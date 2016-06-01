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
        title: "Eye-Catcher",
        type: 'Vegan Zombie Dessert',
        content: {
            brain: ['flight attendant', 'actress'],
            sauce: ['blackberry sauce'],
            bodyparts: ['eyeballs'],
            additional: ['aquafaba cream', 'blackberries', 'blackcurrant']
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
        icon:'assets/images/cupcake.png',
        title: "Sweet tooth",
        type: 'Zombie Dessert',
        content: {
            meat: ['schoolgirl'],
            toppings: ['whipped cream', 'strawberry syrup'],
            additional: ['muffin']
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
        icon:'assets/images/cocktail.png',
        title: "Oneshot",
        type: 'Vegan Zombie Drink',
        content: {
            brain: ['fraternity brother', 'sorority sister'],
            toppings: ['gin', 'tonic water', 'lime juice'],
            bodyparts: ['eyeballs'],
            additional: ['syrup']
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