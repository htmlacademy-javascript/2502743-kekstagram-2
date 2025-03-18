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

/**
 * @param checkMeetingTime - регистрирует продолжительность встречи в рабочее время
 * @param {*} str - строка
 * @param toMinutes - разбивает строку времени на часы и минуты и переводит в общее количество с начала суток
 * @return {number} - проверяем что встреча начинается не раьше рабочего дня и заканчивается не позже его окончания
 */

function checkMeetingTime(workStartStr, workEndStr, meetingStartStr, duration) {
  const toMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const workStart = toMinutes(workStartStr);
  const workEnd = toMinutes(workEndStr);
  const meetingStart = toMinutes(meetingStartStr);
  const meetingEnd = meetingStart + duration;

  return meetingStart >= workStart && meetingEnd <= workEnd;
}
