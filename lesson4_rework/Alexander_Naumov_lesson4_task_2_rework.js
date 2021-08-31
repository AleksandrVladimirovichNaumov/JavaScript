// 2.Продолжить работу с интернет-магазином:
// 2.1. В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
// 2.2. Реализуйте такие объекты.
// 2.3. Перенести функционал подсчета корзины на объектно-ориентированную базу.
'use strict'


// корзины [имя, стоимость, количество]
let basket_1 = {
    goods: [
        {
            name: 'арбузы',
            cost: 20,
            quantity: 3
        },
        {
            name: 'бананы',
            cost: 50,
            quantity: 10
        }
    ],
    countBasketPrice() {
        let total_price = 0;
        for (let i = 0; i < this.goods.length; i++) {
            total_price += this.goods[i].cost * this.goods[i].quantity
        }
        return total_price;
    }

}


console.log(basket_1.countBasketPrice());
