import { onScaleControlChange } from './form-upload.js';

const scaleControl = scaleControl.addEventListener('input', (evt) => {
  onScaleControlChange(parseInt(evt.target.value, 10));
});
