import { sendPhotoData } from './api.js';
import { closeModal, showSuccessMessage, showErrorMessage } from './util.js';

  // Удалите все импорты Pristine
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.img-upload__form');
    const pristine = new window.Pristine(form, {
      classTo: 'img-upload__field-wrapper',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextClass: 'img-upload__error-text'
    });

    // Валидация хэштегов
    pristine.addValidator(
      form.querySelector('.text__hashtags'),
      value => {
        if (!value.trim()) return true;
        const tags = value.split(' ').filter(tag => tag.trim());
        return tags.every(tag => /^#[a-zа-яё0-9]{1,19}$/i.test(tag));
      },
      'Некорректный хэштег'
    );

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (pristine.validate()) {
        try {
          await sendPhotoData(new FormData(form));
          showSuccessMessage();
          closeModal();
        } catch {
          showErrorMessage();
        }
      }
    });


  // Инициализация при загрузке
  document.addEventListener('DOMContentLoaded', initFormValidation);  // Ваш код
});

// form-validation.js - минимальная рабочая версия
console.log('Form validation loaded successfully!');

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.img-upload__form');
  if (form) {
    console.log('Form element found:', form);
  } else {
    console.error('Form element not found!');
  }
});

