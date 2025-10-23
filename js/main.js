import { renderThumbnails,clearThumbnails } from './thumbnail.js';
import './zoom.js';
import { initFilters } from'./filter.js';
import './image-editor.js';
import { loadPhotos } from './api.js';
import { initForm } from './form-upload.js';
initFilters(loadPhotos);
try {
  initForm();
  const photoData = await loadPhotos(renderThumbnails);
  renderThumbnails(photoData);
  clearThumbnails(photoData);
} catch {
  window.postMessage('ошибка загрузки файла');

}
