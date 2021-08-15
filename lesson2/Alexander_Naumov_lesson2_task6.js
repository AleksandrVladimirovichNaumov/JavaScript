// Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation),
// где arg1, arg2 — значения аргументов, operation — строка с названием операции.
// В зависимости от переданного значения выполнить одну из арифметических операций (использовать функции из пункта 5)
// и вернуть полученное значение (применить switch).

function simpleAddition(a, b) {
    return a + b;
}

function simpleDiminution(a, b) {
    return a - b;
}

function simpleMultiplication(a, b) {
    return a * b;
}

function simpleDivision(a, b) {
    return a / b;
}

function simpleCalc(arg1, arg2, operation){
    switch(operation){
        case '+':
            return simpleAddition(arg1, arg2)
        case '-':
            return simpleDiminution(arg1, arg2)
        case '*':
            return simpleMultiplication(arg1, arg2)
        case '/':
            return simpleDivision(arg1, arg2)
    }
}

console.log(simpleCalc(4, 2, '+'))
console.log(simpleCalc(4, 2, '-'))
console.log(simpleCalc(4, 2, '*'))
console.log(simpleCalc(4, 2, '/'))




