const TIMEOUT = 5000;
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

function getRandomInteger(min, max) {
  return Math.floor(Math.random()
    * (max - min + 1)) + min;
}

function getRandomArrayElement(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

// Декоратор для устранения дребезга
export const showSuccessMessage = () => {
  const successElement = successTemplate.cloneNode(true);
  document.body.appendChild(successElement);
  setTimeout(() => {
    if (successElement && successElement.parentNode) {
      successElement.remove();
    }
  }, TIMEOUT);

};

export const showErrorMessage = (message) => {
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.querySelector('img-upload__field-wrapper--error').showErrorMessage = message;
  document.body.appendChild(errorElement);

  setTimeout(() => {
    if (errorElement && errorElement.parentNode) {
      errorElement.remove();
    }
  }, TIMEOUT);

};

export { getRandomInteger, getRandomArrayElement };
export { debounce };
export const closeModal = (element) => {
  element.classList.add('hidden');
  document.body.classList.remove('modal-open');
};
