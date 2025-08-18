import { sendData } from '/js/api.js';
import { showSuccessMessage, showErrorMessage } from '/js/util.js';

const form = document.querySelector('.img-upload__form');
const submitButton = form.querySelector('.img-upload__submit');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const fileInput = document.querySelector('.img-upload__input');
const effectsPreview = document.querySelectorAll('.effects__preview');
const imgPreview = document.querySelector('.img-upload__preview img');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

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

const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown');
  resetForm();
};

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
    document.addEventListener('keydown');
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
    showSuccessMessage();
  } catch (err) {
    showErrorMessage(err.message);
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
