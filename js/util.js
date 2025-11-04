const TIMEOUT = 5000;
const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const body = document.body;

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export const showNotification = (element, cbKeyDown) => {
  const messageTemplate = document.querySelector(`#${element}`).content.querySelector(`.${element}`);
  const messageContainer = messageTemplate.cloneNode(true);
  const button = messageContainer.querySelector('button');
  body.append(messageContainer);

  function closeNotification (evt) {
    evt.stopPropagation();
    const hasElementTarget = [messageContainer,button].includes(evt.target);
    if (hasElementTarget || isEscapeKey(evt)) {
      messageContainer.remove();
      body.removeEventListener('keydown',closeNotification);
      body.removeEventListener('click',closeNotification);
      if (element === 'error') {
        document.addEventListener('keydown'.cbKeyDown);
      }
    }
  }

  button.addEventListener('click',closeNotification);
  body.addEventListener('keydown',closeNotification);
  body.addEventListener('click',closeNotification);
};

export const showErrorMessage = () => {
  const errorElement = errorTemplate.cloneNode(true);
  document.body.appendChild(errorElement);

  setTimeout(() => {
    errorElement.remove();
  },TIMEOUT);

};

export { debounce, isEscapeKey };
