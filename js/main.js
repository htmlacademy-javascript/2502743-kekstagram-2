import { renderThumbnails } from './thumbnail.js';
import { initValidation } from './form-validation.js';
import './zoom.js';
import {initFilters,applyFilters} from'./filter.js';
import './image-editor.js';
import { loadPhotos } from './api.js';
import { initForm } from './form-upload.js';
import { showErrorMessage } from './util.js';
const filterContainer = document.querySelector('.img-filters');
initFilters(loadPhotos);
try {
  initForm();
  initValidation();
  const photoData = await loadPhotos(renderThumbnails);
  renderThumbnails(photoData);
  filterContainer.classList.remove('img-filters--inactive');
  applyFilters(photoData);
} catch (error) {
  showErrorMessage('Не удалось загрузить фотографии. Попробуйте обновить страницу');
  //console.error('Ошибка загрузки фотографий:', error);
}
