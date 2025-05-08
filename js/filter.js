import { onEffectChange } from './form-upload.js';

const effectItems = effectItems.forEach((item) => {
  item.addEventListener('click', () => {
    onEffectChange(item.dataset.effect);
  });
});

reader.addEventListener('error', () => {
  showErrorMessage('Ошибка чтения файла');
});

if (file.size > 5 * 1024 * 1024) {
  showErrorMessage('Файл слишком большой (макс. 5МБ)');

}
