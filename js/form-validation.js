const form = document.querySelector('.img-upload__form');
const pristine = new window.Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

// Валидация хэштегов
const validateHashtags = (value) => {
  if (!value.trim()) {
    return true; // Пустая строка — валидно
  }

  const hashtags = value.toLowerCase().trim().split(/\s+/).filter(Boolean);

  // Проверка на максимальное количество
  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }

  // Проверка формата каждого хэштега
  const isValidFormat = hashtags.every((tag) => HASHTAG_REGEX.test(tag));
  if (!isValidFormat) {
    return false;
  }

  // Проверка на дубликаты
  const uniqueHashtags = new Set(hashtags);
  return uniqueHashtags.size === hashtags.length;
};

// Валидация комментария
const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

// Инициализация валидации
const initValidation = () => {
  pristine.addValidator(
    form.querySelector('.text_hashtags'),
    validateHashtags,
    'Некорректный хэштег (максимум 5, формат: #пример, без повторов)'
  );

  pristine.addValidator(
    form.querySelector('.text_description'),
    validateComment,
    'Максимум 140 символов'
  );
};

export { initValidation };
