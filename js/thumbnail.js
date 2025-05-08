import { openBigPicture,closeBigPicture } from './big-picture.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');
const createThumbnail = ({ url, description, likes, comments }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const image = thumbnail.querySelector('.picture img');
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  image.src = url;
  image.alt = description;
  thumbnail.addEventListener('click', () => openBigPicture(photo));

  return thumbnail;
};

const renderThumbnails = (photos) => {
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

export { renderThumbnails };
