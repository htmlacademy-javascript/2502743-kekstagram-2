import { sendPhotoData } from './api.js';
import { closeModal, showSuccessMessage, showErrorMessage } from './util.js';

const form = document.querySelector('.img-upload__form');
const pristine = new window.Pristine(form, {
      classTo: 'img-upload__field-wrapper',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextClass: 'img-upload__error-text'
    });
const MAX_HASHTAGS = 5;
const MAX_COMMENT_LEHGTH = 140;
const hashtags = value.toLLowerCase().split('').filter(Boolean);
const regex = /^#[a-zа-яё0-9]{1,19}$/i;

// Проверка хэштэга
const isValidTags = hashtags.every((hashtag) =>
  regex.test(hashtag));


// не более 5 хэштегов
 (hashtags.length > MAX_HASHTAGS) {
  return false;
}

// Проверка на дупликаты
const unique = new Set(hashtags);
return isValidTags && unique.size === hashtags.length;
    pristine.addValidator(
      form.querySelector('.text__hashtags'),
      value => {
        if (!value.trim()) return true;
        const tags = value.split(' ').filter(tag => tag.trim());
        return tags.every(tag => test(tag));
      },
      'Некорректный хэштег'
    );

const initValidation = () => {
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

      // Валидация хэштегов
pristine.addValidator(
  form.querySelector('.text_hashtags'),
  validateHashtags,
  'некоректный хэштег'
);

    //валидация комменгариев
pristine.addValidator(
  form.querySelector('.text_description'),
  validateComment,
      'Максимум 140 символов'
)}

export {initValidation};
