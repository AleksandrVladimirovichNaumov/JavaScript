// С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
'use strict'
let number = 0;
let trigger = 2;
let flag = false;
console.log(2)
while (number <= 100) {
    while (trigger < number) {
        if (number % trigger === 0) {
            flag = false;
            break
        }
        flag = true
        trigger++
    }
    if (flag) {
        console.log(number)
    }
    flag = false
    number++
    trigger = 2
}
