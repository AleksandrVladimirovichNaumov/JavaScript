// 1. Доработать модуль корзины.
// a. Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы
// b. Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида
'use strict';

// вывод элемента каталога
const catalogItem = {
    render(good) {
        return `<div class="good">
                    <div><b>Наименование</b>: ${good[0]}</div>
                    <div><b>Цена за шт.</b>: ${good[1]}</div>
                    <div><b>В наличии</b>: ${good[2]}</div>
                    <button id="${good[0]}Button">Купить</button>
                </div>`;
    }
}

// объект со всеми доступными продуктами. из него составляется каталог на странице. каждый продукт можно добавить в
// корзину, причем доступное количество продуктов в каталоге уменьшается
let products = {
    catalogDiv: document.getElementById('catalog'),
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
    // метод для забора товара из каталога (уменьшается доступное количество в каталоге)
    takeOrder(product, amount) {
        switch (product) {
            case 'apple':
                this.apple.stock -= amount;
                this.init();
                return [product, amount, this.apple.cost * amount]
            case 'orange':
                this.orange.stock -= amount;
                this.init();
                return [product, amount, this.orange.cost * amount]
            case 'banana':
                this.banana.stock -= amount;
                this.init();
                return [product, amount, this.banana.cost * amount]
        }

    },
    init() {
        this.catalogDiv.innerHTML = '';
        let resultArray = Object.values(this).map(v => Object.values(v));
        // выбираем именно товары и каталога (отсортировываем методы)
        for (let i = 0; i < resultArray.length; i++) {
            if (resultArray[i].length === 3) {
                this.catalogDiv.innerHTML += catalogItem.render(resultArray[i])
            }
        }

    },
    initListener() {
        this.catalogDiv.addEventListener('click', event => {
            // если кликнули не на тот элемент что нам нужен — выходим
            if (!event.target.matches('button, button *')) {
                return null;
            }
            switch (event.target.id) {
                case 'appleButton':
                    basket.add('apple', 1)
                    basket.init()
                    basket.totalCost()
                    break;
                case 'orangeButton':
                    basket.add('orange', 1)
                    basket.init()
                    basket.totalCost()
                    break;
                case 'bananaButton':
                    basket.add('banana', 1)
                    basket.init()
                    basket.totalCost()
                    break;
            }
        })
    }
}

products.init();
products.initListener();

let basket = {
    containerElement: document.getElementById('basket'),
    containerTotal: document.getElementById('basketTotal'),
    order: [],
    add(product, amount) {
        let index = this.order.findIndex(item => item[0] == product)
        // если продукта нет в корзине - добавляем, если есть - увеличиваем количество и итоговую стоимость
        if (index<0){
            this.order.push(products.takeOrder(product, amount))
        }
        else{
            this.order[index][1] += products.takeOrder(product, amount)[1]
            this.order[index][2] += products.takeOrder(product, amount)[2]
        }

    },
    // выводим товары из корзины
    init() {
        this.containerElement.innerHTML = '';
        for (let i = 0; i < this.order.length; i++) {

            this.containerElement.innerHTML += `${i+1}) ${this.order[i][0]} (${this.order[i][1]} шт.): ${this.order[i][2]}<br>`;

        }
    },
    // подсчитываем общую стоимость
    totalCost() {
        let qnty = 0;
        let total = 0;
        if (this.order.length === 0) {
            this.containerTotal.innerText = 'Корзина пуста';
            return 'корзина пуста'
        } else {
            for (let i = 0; i < this.order.length; i++) {
                qnty += this.order[i][1];
                total += this.order[i][2]
            }
            this.containerTotal.innerText = `В корзине: ${qnty} товаров на сумму ${total} рублей`;
            return [qnty, total]
        }

    }
}
basket.totalCost()
