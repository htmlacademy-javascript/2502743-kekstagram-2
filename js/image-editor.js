// image-editor.
const EFFECTS = [
  { name: 'none', filter: 'none', min: 0, max: 100, step: 1, unit: '' },
  { name: 'chrome', filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  { name: 'sepia', filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  { name: 'marvin', filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  { name: 'phobos', filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  { name: 'heat', filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' }
];

const previewImg = document.querySelector('.img-upload__preview img');
const effectsContainer = document.querySelector('.img-upload__effects');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

let currentEffect = EFFECTS[0];
let slider;
// Инициализация слайдера
const initSlider = () => {
  sliderContainer.classList.add('hidden');
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
export const resetEffects = () => {
  currentEffect = EFFECTS[0];
  previewImg.style.filter = 'none';
  sliderContainer.classList.add('hidden');

};

// Обработчик выбора эффекта
effectsContainer.addEventListener('change', (evt) => {
  const currentButton = evt.target.closest('.effects__radio');
  currentEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  currentButton.checked = true;
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

});

initSlider();
