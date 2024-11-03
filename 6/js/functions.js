const checkStringLength = (string = '', maxLength = 1) => string.length <= maxLength;

checkStringLength();

// console.log(checkStringLength())
// console.log(checkStringLength('Магнитогорск', 11))
// console.log(checkStringLength('Магнитогорск', 12))
// console.log(checkStringLength('Магнитогорск', 13))

const checkStringPalindrome = (string = '') => {
  const normalisedString = string.replaceAll(' ', '').toLowerCase();

  let reversedString = '';

  for (let i = normalisedString.length - 1; i >= 0; i--) {
    reversedString += normalisedString[i];
  }

  return reversedString === normalisedString;
};

checkStringPalindrome();

// console.log(checkStringPalindrome())
// console.log(checkStringPalindrome('Коту тащат уток'))
// console.log(checkStringPalindrome('Лёша на Полке клопа наШёл '))
// console.log(checkStringPalindrome('Это не палиндром'))

const extractNumbers = (string = '') => {
  let result = '';

  string = string.toString();

  for (let i = 0; i <= string.length - 1; i++) {
    if (Number.isNaN(parseInt(string[i], 10)) === false) {
      result += string[i];
    }
  }

  return result === '' ? NaN : Number(result);
};

extractNumbers();

// console.log(extractNumbers())
// console.log(extractNumbers(''))
// console.log(extractNumbers('текст 10'))
// console.log(extractNumbers('-8'))
// console.log(extractNumbers('22.5'))
// console.log(extractNumbers('-25.56'))
// console.log(extractNumbers(-32.82))
// console.log(extractNumbers('а я томат'))

/*
Напишите функцию, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки
рабочего дня, и false, если выходит.
Время указывается в виде строки в формате часы:минуты. Для указания часов и минут могут использоваться как две цифры, так и одна. Например, 8 часов 5 минут могут быть указаны по-разному:
08:05, 8:5, 08:5 или 8:05.
Продолжительность задаётся числом. Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки.

'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
имяФункции('08:00', '17:30', '14:00', 90); // true
имяФункции('8:0', '10:0', '8:0', 120);     // true
имяФункции('08:00', '14:30', '14:00', 90); // false
имяФункции('14:00', '17:30', '08:0', 90);  // false
имяФункции('8:00', '17:30', '08:00', 900); // false
*/

