const ZOOM_STEP = 25;
const uploadForm = document.querySelector('.img-upload__form');
const previewImg = uploadForm.querySelector('.img-upload__preview img');

// Обработчики для масштабирования и фильтров

const scaleControl = document.querySelector('.scale__control--value');
const scaleMinus = document.querySelector('.scale__control--smaller');
const scalePlus = document.querySelector('.scale__control--bigger');

// Масштабирование изображения
const scaleImage = (value) => {
  previewImg.style.transform = `scale(${value / 100 })`;
  scaleControl.value = `${value}%`;
};

scaleMinus.addEventListener('click', () => {
  const currentValue = parseInt(scaleControl.value, 10);
  const newValue = Math.max(currentValue - ZOOM_STEP, ZOOM_STEP);
  scaleImage(newValue);
});

scalePlus.addEventListener('click', () => {
  const currentValue = parseInt(scaleControl.value, 10);
  const newValue = Math.min(currentValue + ZOOM_STEP, 100);
  scaleImage(newValue);
});

export {scaleImage};
