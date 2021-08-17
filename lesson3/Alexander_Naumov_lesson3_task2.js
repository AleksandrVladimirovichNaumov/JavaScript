// Товары в корзине хранятся в массиве. Задачи:
// Организовать такой массив для хранения товаров в корзине;
// Организовать функцию countBasketPrice, которая будет считать стоимость корзины.
'use strict'
//товары в магазине и их стоимость
let goods = [
    ['бананы', 50],
    ['апельсины', 120],
    ['арбузы', 20],
    ['виноград', 170],
    ['яблоки', 110]
]

// корзины корзины [позиция из каталога, количество]
let basket_1 = [
    [goods[2], 3],
    [goods[0], 10],
    [goods[3], 4]
]

let basket_2 = [
    [goods[4], 7],
    [goods[1], 1],
    [goods[2], 2],
    [goods[0], 5]
]

// в цикле умножаем стоимость товара на количество в корзине
function countBasketPrice(basket) {
    let total_price = 0;
    for (let i = 0; i < basket.length; i++) {
        total_price += basket[i][0][1] * basket[i][1]
    }
    return total_price;
}

console.log(countBasketPrice(basket_1));
console.log(countBasketPrice(basket_2));


