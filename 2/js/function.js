/**
 * проверка количества символов строки
 * @param {string} myString - строка для проверки
 * @param {int} count - количество символов проверки
 * @return {boolean} - возврат истины
 */
function checkStringLength(myString, count) {
  return myString <= count;
}

checkStringLength('jnbvdjbvdivbdivdj', 10);
checkStringLength('yegfyegbyibeubfiuebfb', 10);


/**
 * Проверяет.является ли строка палиндромом
 * @param {string} isPalindrome - проверяемая строка
 * @param {reversed} isPalindrome - читается ли одинаково с конца
 * @return {boolean} - возврат истины
 */
function isPalindrome(string = '') {
  string = string.replaceAll(' ', '').toLowerCase();
  let reversed = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversed += string[i]; // reversed = reversed + string[i];
    return string === reversed;
  }
}

isPalindrome('topot');


/**
 * принимает строку и извлекает из неё числа
 * @param {*} str - строка
 * @return {number} - возврат истины
 */
function stringToNumber(str) {
  return Number(
    str.split('').filter((char) => !isNaN(parseInt(char, 10))).join('')
|| NaN
  );
}

stringToNumber('rwgdh663');
