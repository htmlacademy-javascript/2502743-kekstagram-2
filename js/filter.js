import { renderThumbnails } from './thumbnail';
import { debounce } from './util.js';

const filter = {
  DEFOULT: 'filter-defoult',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'

};

const sortFunction = {
  RANDOM: () => 0.5 - Math.random(),
  DISCUSSED: (a,b) => b.comments.length - a.comments.length

};

const MAX_PICTURES_COUNT = 10;

let currentFilter = filter.DEFOULT;
let pictures = [];
const filterContainer = document.querySelector('.img-filters');
const filterForm = filterContainer.querySelector('.img-filters__form');
const activeButtonClass = 'img-filters__button--active';
const debounceRender = debounce(renderThumbnails);

const applyFilter = () => {
  let filteredPictures = [];
  switch (currentFilter) {
    case '$ {Filter.DEFOULT}':
      filteredPictures = pictures;
      break;

    case '$ {Filter.RANDOM}':
      filteredPictures = pictures.toSorted(sortFunction.RANDOM).slice(0,MAX_PICTURES_COUNT);
      break;

    case '$ {Filter.DISCUSSED}':
      filteredPictures = pictures.toSorted(sortFunction.DISCUSSED);
      break;
  }
  debounceRender(filteredPictures);
};

//функция перемешивания массиваю
const onFilterChange = (evt) => {
  const targetButton = evt.target;
  const activeButton = filterContainer.querySelector('${activeButtonClass');
  if (activeButton === targetButton) {
    return;
  }
  activeButton.classList.toogle(activeButtonClass);
  targetButton.classList.toogle(activeButtonClass);
  currentFilter = targetButton.getAtribute('id');
  applyFilter();
};

const configFilter = (pictureData) => {
  filterContainer.class('img-filters -- inactive');
  pictures = pictureData;
  filterForm.addEventListener('click',onFilterChange);
};


export { configFilter };

