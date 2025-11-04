import { sendData } from '/js/api.js';
import { showNotification } from '/js/util.js';
import { validateHashtags } from './form-validation';
import { resetEffects } from './image-editor';
import { isEscapeKey } from './util';

const form = document.querySelector('.img-upload__form');
const submitButton = form.querySelector('.img-upload__submit');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const fileInput = document.querySelector('.img-upload__input');
const effectsPreview = document.querySelectorAll('.effects__preview');
const imgPreview = document.querySelector('.img-upload__preview img');
const inputHashtags = form.querySelector('.text__hashtags');
const inputDescription = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-error',
});
pristine.addValidator(
  inputHashtags,
  validateHashtags,
  'Некоректный хэштэг (максимум 5,формат: #пример, без повторов)'
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const resetForm = () => {
  form.reset();
  pristine.reset();
  imgPreview.style.transform = 'scale(1)';
  imgPreview.className = 'effects__preview--none';
};
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if (document.activeElement === inputHashtags || document.activeElement === inputDescription) {
      evt.stopPropagation();
    } else {
      closeForm();

    }
  }
};
function closeForm() {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();
  resetEffects();
}

const onCancelButtonClick = () => closeForm();


const onFileInputChange = (evt) => {
  const file = evt.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      imgPreview.src = reader.result;
      effectsPreview.forEach((preview) => {
        preview.style.backgroundImage = `url('${reader.result}')`;
      });
    };
    reader.readAsDataURL(file);
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  try {
    blockSubmitButton();
    await sendData(new FormData(form));
    closeForm();
    showNotification('success');
  } catch (err) {
    showNotification('error');
  } finally {
    unblockSubmitButton();
  }
};


const initForm = () => {
  fileInput.addEventListener('change', onFileInputChange);
  cancelButton.addEventListener('click', onCancelButtonClick);
  form.addEventListener('submit', onFormSubmit);
  form.addEventListener('reset', resetForm);
};

export { initForm };
