// * Сравнить null и 0. Объяснить результат.

if (null > 0) {
    console.log('null>0')
} else if (null < 0) {
    console.log('null<0')
} else if (null == 0) {
    console.log('null==0')
} else if (null === 0) {
    console.log('null===0')
} else if (null >= 0) {
    console.log('null>=0')
} else if (null <= 0) {
    console.log('null<=0')
}

// как выяснилось в JavaScript (с просторов интернета):
// если логическое выражение null<0 является ложным, то выражение null>=0 автоматически является истинным





