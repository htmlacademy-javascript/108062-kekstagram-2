const checkStringLength = (string = '', maxLength = 1) => string.length <= maxLength;

// console.log(checkStringLength())
// console.log(checkStringLength('Магнитогорск', 11))
// console.log(checkStringLength('Магнитогорск', 12))
// console.log(checkStringLength('Магнитогорск', 13))


const checkStringPalindrome = (string = '') => {
  const normalisedString = string.replaceAll(' ', '').toLowerCase();

  let reversedString = '';

  for (let i = normalisedString.length - 1; i >= 0; i--) {
    reversedString+= normalisedString[i];
  }

  return reversedString === normalisedString;
};

// console.log(checkStringPalindrome())
// console.log(checkStringPalindrome('Коту тащат уток'))
// console.log(checkStringPalindrome('Лёша на Полке клопа наШёл '))
// console.log(checkStringPalindrome('Это не палиндром'))

const extractNambers = (string = '') => {
  let result = '';

  string = string.toString();

  for (let i = 0; i <= string.length - 1; i++) {
    if (Number.isNaN(parseInt(string[i], 10)) === false) {
      result += string[i];
    }
  }

  return result === '' ? NaN : Number(result);
}

// console.log(extractNambers())
// console.log(extractNambers(''))
// console.log(extractNambers('текст 10'))
// console.log(extractNambers('-8'))
// console.log(extractNambers('22.5'))
// console.log(extractNambers('-25.56'))
// console.log(extractNambers(-32.82))
// console.log(extractNambers('а я томат'))



