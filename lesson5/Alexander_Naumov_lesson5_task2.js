// 2. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре.
// Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
// 2.1. Пустая корзина должна выводить строку «Корзина пуста»;
// 2.2. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».
'use strict';

let products = {
    apple: {
        name: 'apple',
        cost: 100,
        stock: 12,
    },
    orange: {
        name: 'orange',
        cost: 150,
        stock: 20,
    },
    banana: {
        name: 'banana',
        cost: 80,
        stock: 40,
    },
    takeOrder(product, amount) {
        switch (product) {
            case 'apple':
                this.apple.stock -= amount;
                return [product, amount, this.apple.cost * amount]
            case 'orange':
                this.orange.stock -= amount;
                return [product, amount, this.orange.cost * amount]
            case 'banana':
                this.banana.stock -= amount;
                return [product, amount, this.banana.cost * amount]
        }

    }
}


let basket = {
    containerElement: document.getElementById('basket'),
    order: [],
    add(product, amount) {
        this.order.push(products.takeOrder(product, amount))
    },
    totalCost() {
        let amount = 0;
        let total = 0;
        if (this.order.length === 0) {
            this.containerElement.innerText = 'корзина пуста';
            return 'корзина пуста'
        } else {
            for (let i = 0; i < this.order.length; i++) {
                amount += this.order[i][1];
                total += this.order[i][2]
            }
            this.containerElement.innerText = `В корзине: ${amount} товаров на сумму ${total} рублей`;
            return [amount, total]
        }

    }
}


basket.totalCost();
console.log(basket.totalCost());
alert('Добавить 10 яблок, 5 бананов и 15 апельсинов?');
basket.add('apple', 10);
basket.add('banana', 5);
basket.add('orange', 15);
basket.totalCost()
console.log(basket.totalCost());

// Почему то из-за алерта сообщение "корзина пуста" не успевает отобразится. однако в консоле видно, что строчка скрипта
// выполнена. реализация добавления продуктов в корзину кривая, так как если мы добавим товар уже лежащий в корзине, он
// отобразится отдельным элементом в массиве.