import { renderThumbnails } from './thumbnail.js';
import './zoom.js';
import './image-editor.js';
import { configFilter } from './filter.js';
import { loadPhotos } from './api.js';
import { initForm } from './form-upload.js';
import { showErrorMessage } from './util.js';

try {
  initForm();
  const photoData = await loadPhotos(renderThumbnails);
  renderThumbnails(photoData);
  configFilter(photoData);
} catch {
  showErrorMessage();

}
