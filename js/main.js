import { renderThumbnails } from './thumbnail.js';
import { initValidation } from './form-validation.js';
import './zoom.js';
import { initFilters } from'./filter.js';
import './image-editor.js';
import { loadPhotos } from './api.js';
import { initForm } from './form-upload.js';
initFilters(loadPhotos);
try {
  initForm();
  initValidation();
  const photoData = await loadPhotos(renderThumbnails);
  renderThumbnails(photoData);
} catch {
  window.postMessage('ошибка загрузки файла');

}
