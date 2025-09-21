const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const renderComments = (comments, container) => {
  container.innerHTML = '';
  comments.forEach(({ avatar, name, message }) => {
    const comment = document.createElement('li');
    comment.classList.add('social__comment');
    const img = document.createElement('img');
    img.src = avatar;
    img.alt = name;
    img.comments = message;
    img.description = comment;

    container.appendChild(comment);
  });
};
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = (data) => {
  const { url, likes, comments, description } = data;

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = comments.length;
  bigPicture.querySelector('.social__comment-shown-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  const commentsContainer = bigPicture.querySelector('.social__comments');
  renderComments(comments, commentsContainer);

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  const onCloseButtonClick = () => closeBigPicture();

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);

};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

}

export { openBigPicture, closeBigPicture };
