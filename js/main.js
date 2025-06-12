import { renderThumbnails } from './thumbnail.js';
//import { generatePhotos } from './data.js';
import { initValidation } from './form-validation.js';
import './zoom.js';
import './filter.js';
import './image-editor.js';
import { loadPhotos } from './api.js';


const photoData = await loadPhotos();
renderThumbnails(photoData);

initValidation();

