const ZOOM_STEP = 25;
const uploadForm = document.querySelector('img-upload_form');
const previewImage = uploadForm.querySelector('.img-upload_preview-image');
// Обработчики для масштабирования и фильтров
const changeScaleControlChange = (value) => {
  previewImage.style.transform = `scale(${value / 100})`;
};
const scaleControl = document.querySelector(.scale_control-value );
const scaleMinus = document.querySelector('scale-control-smaller ');
const scalePlus = document.querySelector('scale-control-bigger' );

// Масштабирование изображения
const scaleImage = (value) => {
  previewImg.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = `${value}%`;
};

scaleControlSmaller.addEventListener('click', () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  const newValue = Math.max(currentValue - ZOOM_STEP, ZOOM_STEP);
  scaleImage(newValue);
});

scaleControlBigger.addEventListener('click', () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  const newValue = Math.min(currentValue + ZOOM_STEP, 100);
  scaleImage(newValue);
});

export {scaleImage};
