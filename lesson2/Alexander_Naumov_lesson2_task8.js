// * С помощью рекурсии организовать функцию возведения числа в степень. Формат: function power(val, pow),
// где val — заданное число, pow –— степень.

function recursionPowerOf(val, pow){
    if (pow>1)
        val *= recursionPowerOf(val, pow-1)
    return val
}

console.log(recursionPowerOf(2, 10))




