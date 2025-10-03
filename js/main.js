import { renderThumbnails, clearThumbnails } from './thumbnail.js';
import { initValidation } from './form-validation.js';
import './zoom.js';
import {initFilters,applyFilters} from'./filter.js';
import './image-editor.js';
import { loadPhotos } from './api.js';
import { initForm } from './form-upload.js';
import './util.js';
initFilters(loadPhotos);
try {
  initForm();
  initValidation();
  const photoData = await loadPhotos(renderThumbnails);
  renderThumbnails(photoData);
  clearThumbnails();
  applyFilters(photoData);
} catch {
  window.postMessage('ошибка загрузки файла');

}
