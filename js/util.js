const TIMEOUT = 5000;
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#data-error').content;
const successButton = document.querySelector('#button');
const closeSuccessButton = document.querySelector('.success__button');

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscapekey = (evt) => evt.key === 'Escape';

// Закрытие успешной отправки формы
export const successButtonForm = () => {
  successButton();
  closeSuccessButton.addEventListener('click',() => {
    successButtonForm(close);
  });

};

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
  errorElement.querySelector('error-title').showErrorMessage = message;
  document.body.appendChild(errorElement);

  setTimeout(() => {
    if (errorElement && errorElement.parentNode) {
      errorElement.remove();
    }
  }, TIMEOUT);

};

export { debounce, isEscapekey };
