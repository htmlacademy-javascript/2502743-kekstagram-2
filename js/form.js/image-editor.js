// image-editor.js

import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
const Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100
};

const Effects = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const EffectConfig = {
  [Effects.NONE]: null,
  [Effects.CHROME]: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  [Effects.SEPIA]: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  [Effects.MARVIN]: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  [Effects.PHOBOS]: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  [Effects.HEAT]: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

const form = document.querySelector('.img-upload__form');
const image = form.querySelector('.img-upload__preview img');
const scaleControl = form.querySelector('.scale__control--value');
const effectLevel = form.querySelector('.effect-level__value');
const effectSlider = form.querySelector('.effect-level__slider');
const effectsList = form.querySelector('.effects__list');

let currentEffect = Effects.NONE;

// Масштабирование изображения
const updateScale = (value) => {
  scaleControl.value = `${value}%`;
  image.style.transform = `scale(${value / 100})`;
};

const onScaleSmallerClick = () => {
  const currentValue = parseInt(scaleControl.value, 10);
  updateScale(Math.max(currentValue - Scale.STEP, Scale.MIN));
};

const onScaleBiggerClick = () => {
  const currentValue = parseInt(scaleControl.value, 10);
  updateScale(Math.min(currentValue + Scale.STEP, Scale.MAX));
};

// Инициализация слайдера
noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
  connect: 'lower'
});

// Обновление эффекта
const updateEffect = (effect) => {
  currentEffect = effect;
  const config = EffectConfig[effect];

  if (effect === Effects.NONE) {
    effectSlider.parentElement.classList.add('hidden');
    image.style.filter = '';
    return;
  }

  effectSlider.parentElement.classList.remove('hidden');
  effectSlider.noUiSlider.updateOptions({
    range: { min: config.min, max: config.max },
    start: config.max,
    step: config.step
  });
};

// Обработчик изменения слайдера
effectSlider.noUiSlider.on('update', (values) => {
  const value = values[0];
  const config = EffectConfig[currentEffect];

  if (currentEffect === Effects.NONE) {
    return;
  }

  effectLevel.value = value;
  image.style.filter = `${config.filter}(${value}${config.unit})`;
});

// Обработчик изменения эффекта
const onEffectChange = (evt) => {
  const effect = evt.target.value;
  updateEffect(effect);
};

// Сброс эффектов
const resetEffects = () => {
  updateEffect(Effects.NONE);
  image.style.filter = '';
  effectLevel.value = '';
  form.querySelector('#effect-none').checked = true;
};

// Инициализация модуля
const initImageEditor = () => {
  form.querySelector('.scale__control--smaller').addEventListener('click', onScaleSmallerClick);
  form.querySelector('.scale__control--bigger').addEventListener('click', onScaleBiggerClick);
  effectsList.addEventListener('change', onEffectChange);

  // Инициализация масштаба
  updateScale(Scale.MAX);
  resetEffects();
};

// Закрытие редактора
const closeImageEditor = () => {
  updateScale(Scale.MAX);
  resetEffects();
};

const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const previewImg = document.querySelector('.img-upload__preview-img');
const cancelButton = document.querySelector('.img-upload__cancel');
const effectsContainer = document.querySelector('.img-upload__effects');
const sliderContainer = document.querySelector('.img-upload__slider');
const textDescription = document.querySelector('.text__description');
const textHashtags = document.querySelector('.text__hashtags');

// Эффекты для изображения
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

// Инициализация слайдера
const initSlider = () => {
  slider = noUiSlider.create(sliderContainer, {
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
    previewImg.style.filter = `${currentEffect.filter}(${value}${currentEffect.unit})`;
  });
};

// Сброс эффектов
const resetEffects = () => {
  currentEffect = EFFECTS[0];
  previewImg.style.filter = 'none';
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
  if (evt.key === 'Escape' && !document.activeElement.matches('.text__description, .text__hashtags')) {
    closeForm();
  }
});

// Обработчик выбора эффекта
effectsContainer.addEventListener('change', (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    currentEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
    previewImg.className = `img-upload__preview-img effects__preview--${currentEffect.name}`;

    slider.updateOptions({
      range: {
        min: currentEffect.min,
        max: currentEffect.max
      },
      step: currentEffect.step,
      start: currentEffect.max
    });
  }
});

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
});

export { initImageEditor, closeImageEditor };
