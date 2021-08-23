// Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, мы должны получить на выходе
// объект, в котором в соответствующих свойствах описаны единицы, десятки и сотни. Например, для числа 245 мы должны
// получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать
// соответствующее сообщение с помощью console.log и вернуть пустой объект.
'use strict'

function numberToObject(number) {
    let propName = ['еденицы', 'десятки', 'сотни'];
    let object_1 = {};
    let i = 0;
    if (number > 999) {
        console.log('number is bigger than 999');
        return object_1
    } else {
        while (number > 0) {
            object_1[propName[i]] = number % 10;
            number -= number % 10;
            number /= 10;
            i += 1
        }
        return object_1
    }
}

console.log(numberToObject(123))
console.log(numberToObject(12))
console.log(numberToObject(1))
console.log(numberToObject(1234))