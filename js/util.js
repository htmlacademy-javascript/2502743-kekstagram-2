function getRandomInteger(min, max) {
  return Math.floor(Math.random()
    * (max - min + 1)) + min;
}

function getRandomArrayElement(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;
const TIMEOUT = 5000;

export const showSuccessMessage = () => {
  const successElement = successTemplate.cloneNode(true);
  document.body.appendChild(successElement);
  setTimeout(() => {
    successElement.remove();
  }, TIMEOUT);
};

export const showErrorMessage = (message) => {
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.querySelector('.error__tittle').textContent = message;
  document.body.appendChild(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, TIMEOUT);
};

export { getRandomInteger, getRandomArrayElement };

export const closeModal = (element) => {
  element.classList.add('hidden');
  document.body.classList.remove('modal-open');
};
