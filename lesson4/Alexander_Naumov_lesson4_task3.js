// 3.* Подумать над глобальными сущностями. К примеру, сущность «Продукт» в интернет-магазине актуальна не только для
// корзины, но и для каталога. Стремиться нужно к тому, чтобы объект «Продукт» имел единую структуру для различных
// модулей сайта, но в разных местах давал возможность вызывать разные методы.
'use strict'

// объект продукта яблоко
let productApple = {
    name: 'Apple',
    description: "Red apples from babushka's farm",
    cost: 110,
    //функция для подсчета итоговой стоимости продукта в корзине
    getTotalPrice(quantity) {
        return [this.name, this.cost, this.cost * quantity]
    },
    // функция для вывода данных для каталога
    getCatalogData(){
        return [this.name, this.description, this.cost]
    }
}

// объект продукта апельсин
let productOrange = {
    name: 'Orange',
    description: "Fruit from south of Africa",
    cost: 150,
    //функция для подсчета итоговой стоимости продукта в корзине
    getTotalPrice(quantity) {
        return [this.name, this.cost, this.cost * quantity]
    },
    // функция для вывода данных для каталога
    getCatalogData(){
        return [this.name, this.description, this.cost]
    }
}

// объект продукта банан
let productBanana = {
    name: 'Banana',
    description: "Fruit from north of Africa",
    cost: 150,
    //функция для подсчета итоговой стоимости продукта в корзине
    getTotalPrice(quantity) {
        return [this.name, this.cost, this.cost * quantity]
    },
    // функция для вывода данных для каталога
    getCatalogData(){
        return [this.name, this.description, this.cost]
    }
}

// составление каталога из продуктов
let catalog = {
    position_1: productOrange.getCatalogData(),
    position_2: productBanana. getCatalogData(),
    position_3: productApple.getCatalogData()
}

// составление корзины из продуктов и их количества (аргумент в функции)
let basket_1 = {
    good_1: productApple.getTotalPrice(7),
    good_2: productBanana.getTotalPrice(1),
    good_3: productOrange.getTotalPrice(2),
}

// функция подсчета полной стоимости корзины
function getBasketPrice(basket_obj){
    let listOfGoods = Object.keys(basket_obj);
    let totalPrice = 0;
    for (let i = 0; i<listOfGoods.length; i++){
        totalPrice += basket_obj[listOfGoods[i]][2]
    }
    return totalPrice
}

console.log(catalog);
console.log(basket_1);
console.log(getBasketPrice(basket_1));

// в коде для каждого продукта происходит дублирование фунции подсчета продукта и предоставления данных для каталога.
// в ООП такого не будет, так как мы будем создавать экземпляры класса.