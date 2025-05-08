import { renderThumbnails } from './thumbnail.js';
import './image-editor.js';
import { generatePhotos } from './data.js';
import './zoom.js';
import './filter.js';
import './image-editor.js';


const mockPhotos = generatePhotos();
renderThumbnails(mockPhotos);

