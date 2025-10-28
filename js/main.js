import { renderThumbnails,clearThumbnails } from './thumbnail.js';
import './zoom.js';
import { initFilters } from'./filter.js';
import './image-editor.js';
import { loadPhotos } from './api.js';
import { initForm } from './form-upload.js';
import { showErrorMessage,successButtonForm } from './util.js';
initFilters(loadPhotos);
try {
  initForm();
  const photoData = await loadPhotos(renderThumbnails);
  renderThumbnails(photoData);
  clearThumbnails(photoData);
} catch {
  showErrorMessage();
  successButtonForm();
}
