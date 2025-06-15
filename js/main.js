import { renderThumbnails } from './thumbnail.js';
import { initValidation } from './form-validation.js';
import './zoom.js';
import './filter.js';
//import './image-editor.js';
import { loadPhotos } from './api.js';

const filterContainer = document.querySelector('.img-filters');

try {
  const photoData = await loadPhotos();
  renderThumbnails(photoData);
  filterContainer.classList.remove('img-filters--inactive');
} catch {
  console.error('ошибка загрузки фотографий');

}

initValidation();

