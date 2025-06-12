const uploadForm = document.querySelector('.img-upload__form');
const fileInput = uploadForm.querySelector('.img-upload__input');
const previewImage = uploadForm.querySelector('.img-upload__preview-image');
const scaleControl = uploadForm.querySelector('.scale__control--value');
const effectsPreview = document.querySelectorAll('.effects__preview');

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

const resetImageEditor = () => {
  previewImage.style.transform = 'scale(1)';
  previewImage.style.filter = 'none';
  scaleControl.value = '100%';
};

const showPreview = (file) => {
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewImage.src = reader.result;
      effectsPreview.forEach((preview) => {
        preview.style.backgroundImage = `url(${reader.result})`;
      });
      resetImageEditor();
    });

    reader.readAsDataURL(file);
  }
};

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
    showPreview(file);

  }
});

export { resetImageEditor };
