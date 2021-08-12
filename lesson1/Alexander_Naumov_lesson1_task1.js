// Задать температуру в градусах по Цельсию. Вывести в alert соответствующую температуру в градусах по Фаренгейту.
// Подсказка: расчет идет по формуле Tf = (9 / 5) * Tc + 32, где Tf — температура по Фаренгейту, Tc — по Цельсию.

let Tc = 36;

function fahrenheitConverter(temperature) {
    alert(`${temperature} degrees celsius is ${(9 / 5) * temperature + 32} degrees fahrenheit`)
}

fahrenheitConverter(Tc);