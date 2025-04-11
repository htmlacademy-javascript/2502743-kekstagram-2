/**
 * генерация фотографий из массива
 * есть 25 объектов фотографий со своим id
 * для каждого фото генерируем случайный коментарий(0-30)
 * каждый коментарий получает свой id,случайную аватарку,уведомпение и имя
 * @param {getRandomInteger} : boolean - функция генерирующая случайное число в заданом диапазоне
 * @param {getRandomArrayElement} - функция которая возвращает случайный элемент с массива
 * @param {generateFotos} - создаёт массивы с возможными описаниями,коментариями и именами
 * @return {boolean} - возвращает случайный елемент из массива
 * @param {photoArray} - генерирует случайный объект из массива
 */

import { generatePhotos } from 'js/data.js';

import { renderThumbnails } from 'js/thumbnail.js';

import {renderPictures} from 'js/pictures.js';

import {mockPhotos} from 'js/mock-data.js';

// Вызов функции рендеринга при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  renderPictures(mockPhotos);
});
const picturesContainer = document.querySelector('.pictures');
const mockPhotos = [
  {
    url: 'photos/photo1.jpg',
    description: 'Прекрасный закат',
    likes: 150,
    comments: [
      { id: 1, message: 'Отличный кадр!' },
      { id: 2, message: 'Супер!' }
    ]
  },
  // ... другие тестовые данные
];

renderThumbnails(mockPhotos, picturesContainer);

const photoArray = generatePhotos();

import { initFormValidation } from 'js/form.js/form-validation.js';

initFormValidation();

import { initImageEditor, closeImageEditor } from 'js/form.js/image-editor.js';

// При открытии формы
const openImageEditor = () => {
  initImageEditor();
  // ... другая логика инициализации
};

// При закрытии формы
const onCloseButtonClick = () => {
  closeImageEditor();
  // ... другая логика закрытия
};
