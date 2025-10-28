import { isEscapekey } from './util.js';
import { renderComments,clearComments } from './render-comments';

const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const onCloseButtonClick = () => closeBigPicture();

const onDocumentKeydown = (evt) => {
  if(isEscapekey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = (data) => {
  const { url,likes,comments,description } = data;
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__comment-shown-count').textContent = comments.length;
  bigPicture.querySelector('.social__comment-total-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  renderComments(comments);

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);

};

function closeBigPicture() {
  clearComments();
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

}

export { openBigPicture, closeBigPicture };
