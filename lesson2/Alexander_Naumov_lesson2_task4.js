// Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.

number = 3;

function logAndIncrease(number) {
    console.log(number);
    return ++number;
}

switch (number) {
    case 0:
        number = logAndIncrease(number);
    case 1:
        number = logAndIncrease(number);
    case 2:
        number = logAndIncrease(number);
    case 3:
        number = logAndIncrease(number);
    case 4:
        number = logAndIncrease(number);
    case 5:
        number = logAndIncrease(number);
    case 6:
        number = logAndIncrease(number);
    case 7:
        number = logAndIncrease(number);
    case 8:
        number = logAndIncrease(number);
    case 9:
        number = logAndIncrease(number);
    case 10:
        number = logAndIncrease(number);
    case 11:
        number = logAndIncrease(number);
    case 12:
        number = logAndIncrease(number);
    case 13:
        number = logAndIncrease(number);
    case 14:
        number = logAndIncrease(number);
    case 15:
        number = logAndIncrease(number);
}
