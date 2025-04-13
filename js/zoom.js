import { onScaleControlChange } from './form-upload.js';

scaleControl.addEventListener('input', (evt) => {
  onScaleControlChange(parseInt(evt.target.value, 10));
});
