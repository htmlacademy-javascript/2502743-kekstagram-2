const MAX_HASHTAGS = 5;
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

export { validateHashtags };
