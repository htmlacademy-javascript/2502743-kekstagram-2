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

import {photoArray} from './main.js4';

function getRandomInteger(min, max) {
  return Math.floor(Math.random()
    * (max - min + 1)) + min;
}

function getRandomArrayElement(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

function generatePhotos() {
  const desscriptions = [
    'Прекрасный закат на фоне гор',
    'Милый щенок играет в парке',
    'Вкусный домашний обед',
    'Абстрактное художественное произведение',
    'Компания друзей весело проводит время',
    'Спокойный пляжный пейзаж',
    'Огромная горная вершина',
    'Тихие лесные тропы',
    'Оживленная городская улица',
    'Макро снимок цветка',
    'Звездное ночное небо',
    'Винтажный автомобиль на дороге',
    'Уютное озеро в лесу',
    'Старинный исторический дом',
    'Яркий граффити на стене',
    'Зимний снежный пейзаж',
    'Бабочка в полном разнообразии',
    'Толпа на рынке',
    'Спортивный экшн-снимок',
    'Портрет незнакомца',
    'Семейный праздник',
    'Концертное выступление',
    'Встреча с дикой природой',
    'Восход над океаном',
    'Современная архитектура'
  ];
  const messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];

  const names = ['Артём','Ира','Вася','Петя','Коля','Саша','Ваня','Порфирий','Антон','Клим'];

  const photos = [];
  let commentId = 1;

  for (let photoId = 1; photoId <= 25; photoId++) {
    const photo = {
      id: photoId,
      url: `photos/${photoId}.jpg`,
      desscription: getRandomArrayElement(desscriptions),
      likes: getRandomInteger(15,200),
      comments: []
    };

    const commentCount = getRandomInteger(0,30);
    for (let i = 0; i < commentCount; i++) {
      photo.comments.push({
        id: commentId++,
        avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
        message: getRandomArrayElement(messages),
        name: getRandomArrayElement(names)

      });
    }

    photos.push(photo);
  }

  return photos;
}

const photoArray = generatePhotos();

export const photoArray = photoArray
