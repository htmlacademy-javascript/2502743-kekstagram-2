// image-editor.js
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const previewImg = document.querySelector('.img-upload__preview img');
const cancelButton = document.querySelector('.img-upload__cancel');
const effectsContainer = document.querySelector('.img-upload__effects');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const textDescription = document.querySelector('.text__description');
const textHashtags = document.querySelector('.text__hashtags');

const EFFECTS = [
  { name: 'none', filter: 'none', min: 0, max: 100, step: 1, unit: '' },
  { name: 'chrome', filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  { name: 'sepia', filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  { name: 'marvin', filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  { name: 'phobos', filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  { name: 'heat', filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' }
];

let currentEffect = EFFECTS[0];
let slider;

// Масштабирование изображения
const scaleImage = (value) => {
  previewImg.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = `${value}%`;
};

scaleControlSmaller.addEventListener('click', () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  const newValue = Math.max(currentValue - 25, 25);
  scaleImage(newValue);
});

scaleControlBigger.addEventListener('click', () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  const newValue = Math.min(currentValue + 25, 100);
  scaleImage(newValue);
});

// Инициализация слайдера
const initSlider = () => {
  slider = noUiSlider.create(sliderElement, {
    range: {
      min: currentEffect.min,
      max: currentEffect.max
    },
    start: currentEffect.max,
    step: currentEffect.step,
    connect: 'lower'
  });

  slider.on('update', () => {
    const value = slider.get();
    effectLevelValue.value = value;
    previewImg.style.filter = `${currentEffect.filter}(${value}${currentEffect.unit})`;
  });
};

// Сброс эффектов
const resetEffects = () => {
  currentEffect = EFFECTS[0];
  previewImg.style.filter = 'none';
  sliderContainer.classList.add('hidden');
  if (slider) {
    slider.destroy();
  }
};

// Обработчик выбора файла
uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewImg.src = reader.result;

      // Обновляем превью во всех эффектах
      document.querySelectorAll('.effects__preview').forEach((preview) => {
        preview.style.backgroundImage = `url(${reader.result})`;
      });

      uploadOverlay.classList.remove('hidden');
      document.body.classList.add('modal-open');

      resetEffects();
      initSlider();
      scaleImage(100);
    });

    reader.readAsDataURL(file);
  }
});

// Закрытие формы
const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = '';
  textDescription.value = '';
  textHashtags.value = '';
  resetEffects();
};

// Обработчики закрытия
cancelButton.addEventListener('click', closeForm);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' &&
      !textDescription.matches(':focus') &&
      !textHashtags.matches(':focus')) {
    closeForm();
  }
});

// Обработчик выбора эффекта
effectsContainer.addEventListener('change', (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    currentEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
    previewImg.className = `img-upload__preview-img effects__preview--${currentEffect.name}`;

    if (currentEffect.name === 'none') {
      sliderContainer.classList.add('hidden');
      previewImg.style.filter = 'none';
    } else {
      sliderContainer.classList.remove('hidden');
      slider.updateOptions({
        range: {
          min: currentEffect.min,
          max: currentEffect.max
        },
        step: currentEffect.step,
        start: currentEffect.max
      });
    }
  }
});

// Валидация хэштегов
const validateHashtags = (value) => {
  if (!value.trim()) return true;

  const hashtags = value.toLowerCase().split(' ').filter(Boolean);
  const regex = /^#[a-zа-яё0-9]{1,19}$/i;

  // Не более 5 хэштегов
  if (hashtags.length > 5) return false;

  // Проверка каждого хэштега
  const valid = hashtags.every(hashtag => regex.test(hashtag));

  // Проверка на дубликаты
  const unique = new Set(hashtags);
  return valid && unique.size === hashtags.length;
};

// Валидация комментария
const validateComment = (value) => value.length <= 140;

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
  // Создаем радиокнопки для эффектов
  EFFECTS.forEach((effect) => {
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'effect';
    radio.value = effect.name;
    radio.id = `effect-${effect.name}`;

    const label = document.createElement('label');
    label.htmlFor = `effect-${effect.name}`;
    label.innerHTML = `
      <span class="effects__preview effects__preview--${effect.name}"></span>
      ${effect.name.charAt(0).toUpperCase() + effect.name.slice(1)}
    `;

    effectsContainer.append(radio, label);
  });

  // Устанавливаем оригинал по умолчанию
  document.getElementById('effect-none').checked = true;
});

export {}
