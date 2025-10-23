import { openBigPicture,closeBigPicture } from './big-picture.js/';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');
const createThumbnail = ({ url, description, likes, comments }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  image.src = url;
  image.alt = description;
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture({ url, description, likes, comments });

  });

  return thumbnail;
};

const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    fragment.appendChild(thumbnail);
  });
  container.appendChild(fragment);

};

const clearThumbnails = () => {
  thumbnailTemplate.querySelectorAll('.picture').forEach((thumbnailElement) => {
    thumbnailElement.remove();
    closeBigPicture();
  });
};


export { renderThumbnails,clearThumbnails };
