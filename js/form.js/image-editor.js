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

export { initImageEditor, closeImageEditor };
