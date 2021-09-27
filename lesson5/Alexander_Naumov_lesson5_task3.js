// 3*. Сделать так, чтобы товары в каталоге выводились при помощи JS:
// 3.1. Создать массив товаров (сущность Product);
// 3.2. При загрузке страницы на базе данного массива генерировать вывод из него. HTML-код должен содержать только
// div id=”catalog” без вложенного кода. Весь вид каталога генерируется JS.
'use strict';

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

    toCatalog() {
        let resultArray = Object.values(this).map(v => Object.values(v));
        let count = 1;
        for (let i = 0; i < resultArray.length; i++) {
            if (resultArray[i].length === 3) {
                this.catalogDiv.innerHTML += `${count}) ${resultArray[i][0]}: ${resultArray[i][1]} руб/шт (в наличие ${resultArray[i][2]} шт.) <br>`;
                count++
            }
        }
    }
}

products.toCatalog()
