// 2.Продолжить работу с интернет-магазином:
// 2.1. В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
// 2.2. Реализуйте такие объекты.
// 2.3. Перенести функционал подсчета корзины на объектно-ориентированную базу.
'use strict'

//товары в магазине и их стоимость
let goods = {
    'бананы': 50,
    'апельсины': 120,
    'арбузы': 20,
    'виноград': 170,
    'яблоки': 110
}

// корзины [позиция из каталога, количество]
let basket_1 = {
    'арбузы': 3,
    'бананы': 10,
    'виноград': 4
}

let basket_2 = {
    'яблоки': 7,
    'апельсины': 1,
    'арбузы': 2,
    'бананы': 5

}

// в цикле умножаем стоимость товара на количество в корзине
function countBasketPrice(basket) {
    let total_price = 0;
    let goods_list = Object.keys(basket)
    for (let i = 0; i < goods_list.length; i++) {
        total_price += goods[goods_list[i]] * basket[goods_list[i]]
    }
    return total_price;
}

console.log(countBasketPrice(basket_1));
console.log(countBasketPrice(basket_2));