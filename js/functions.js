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
