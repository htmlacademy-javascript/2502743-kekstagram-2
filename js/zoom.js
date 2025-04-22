import { onScaleControlChange } from './form.js/form-upload.js';

scaleControl.addEventListener('input', (evt) => {
  onScaleControlChange(parseInt(evt.target.value, 10));
});
