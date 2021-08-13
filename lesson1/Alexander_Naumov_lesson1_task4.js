// * Самостоятельно разобраться с атрибутами тега script (async и defer).
// оба атрибута позволяют выполнять скрипты когда загрузится страница и не ждать их долгой загрузки
// Различия:
// 1) при defer браузер гарантирует, что относительный порядок скриптов с defer будет сохранён, при async первым
//    сработает тот скрипт, который раньше загрузится.
// 2) скрипт с defer сработает, когда весь HTML-документ будет обработан браузером.
alert('Я скрипт с атрибутом async или defer. если ansync - выполнюсь когда загружусь и на порядок других ' +
    'скриптов мне всеравно. Если defer - выполнюсь когда загружусь, когда загрузится страница и в строгом порядке')