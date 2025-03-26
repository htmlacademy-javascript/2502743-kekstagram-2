// big-picture.js

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const commentTemplate = socialComments.querySelector('.social__comment');

// Очистка предыдущих комментариев
const clearComments = () => {
  socialComments.innerHTML = '';
};

// Генерация комментариев
const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach(({ avatar, name, message }) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').textContent = message;
    fragment.appendChild(comment);
  });

  socialComments.appendChild(fragment);
};

// Заполнение данных фотографии
const fillPictureData = ({ url, likes, comments, description }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  // Временное скрытие блоков (задание 7.2)
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
};

// Открытие модального окна
const openBigPicture = (photoData) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  fillPictureData(photoData);
  clearComments();
  renderComments(photoData.comments);

  // Обработчики закрытия
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
};

// Закрытие модального окна
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
};

// Обработчики событий
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onCloseButtonClick(evt) {
  evt.preventDefault();
  closeBigPicture();
}

export { openBigPicture };

// thumbnail.js (дополнение)
const renderThumbnails = (photos, container) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(photo); // Импортированная функция из big-picture.js
    });
    fragment.appendChild(thumbnail);
  });

  container.appendChild(fragment);
};
