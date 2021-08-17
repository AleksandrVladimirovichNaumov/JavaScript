// *Нарисовать пирамиду с помощью console.log, как показано на рисунке, только у вашей пирамиды должно быть 20 рядов,
// а не 5:
// x
// xx
// xxx
// xxxx
// xxxxx
'use strict'

let layer = 'x'
while (layer !== 'xxxxxxxxxxxxxxxxxxxx') {
    console.log(layer);
    layer += 'x'
}


