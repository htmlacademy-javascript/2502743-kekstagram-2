// form-validation.js

import { sendPhotoData } from '../api.js';
import { closeModal, showSuccessMessage, showErrorMessage } from '../util.js';

const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const fileInput = form.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');

// Конфигурация формы
form.method = 'POST';
form.action = 'https://31.javascript.htmlacademy.pro/kekstagram';
form.enctype = 'multipart/form-data';

// Валидация хештегов
const validateHashtags = (value) => {
  if (value === '') return true;

  const hashtags = value.toLowerCase().split(' ');
  const rules = {
    maxCount: 5,
    pattern: /^#[a-zа-яё0-9]{1,19}$/i,
    unique: new Set(hashtags).size === hashtags.length
  };

  return hashtags.length <= rules.maxCount &&
         hashtags.every((tag) => rules.pattern.test(tag)) &&
         rules.unique;
};

// Валидация комментария
const validateComment = (value) => value.length <= 140;

// Инициализация Pristine
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-error'
});

pristine.addValidator(
  hashtagInput,
  validateHashtags,
  'Некорректный формат хештегов (максимум 5, уникальные, начинаются с #)'
);

pristine.addValidator(
  commentInput,
  validateComment,
  'Комментарий не должен превышать 140 символов'
);

// Обработчики событий
const onFormSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

const onFileInputChange = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const onCloseButtonClick = () => {
  form.reset();
  closeModal(overlay);
};

const onDocumentKeydown = (evt) => {
  const isTextFieldFocused = document.activeElement === hashtagInput ||
                            document.activeElement === commentInput;

  if (evt.key === 'Escape' && !isTextFieldFocused) {
    evt.preventDefault();
    onCloseButtonClick();
  }
};

// Инициализация модуля
const initFormValidation = () => {
  fileInput.addEventListener('change', onFileInputChange);
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  form.addEventListener('submit', onFormSubmit);
};

const form = document.querySelector('.img-upload__overlay');
const submitButton = form.querySelector('.img-upload__submit');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  const formData = new FormData(form);

  try {
    blockSubmitButton();
    await sendPhotoData(formData);
    closeForm();
    showSuccessMessage();
  } catch (error) {
    showErrorMessage(error.message);
  } finally {
    unblockSubmitButton();
  }
};

const closeForm = () => {
  form.reset();
  closeModal();
  resetEffects();
};

export { initFormValidation };
