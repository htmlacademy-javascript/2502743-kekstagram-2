import { renderThumbnails } from './thumbnail.js';
import { initImageEditor, closeImageEditor } from './form.js/image-editor.js';
import { initFormValidation } from './form.js/form-validation.js';

const mockPhotos = generatePhotos();
renderThumbnails(mockPhotos);
initFormValidation();

// При открытии формы
const openImageEditor = () => {
  initImageEditor();
  // ... другая логика инициализации
};

// При закрытии формы
const onCloseButtonClick = () => {
  closeImageEditor();
  // ... другая логика закрытия
};

