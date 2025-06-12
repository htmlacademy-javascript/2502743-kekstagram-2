// Декоратор для устранения дребезга
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// Функция перемешивания массива
const shuffleArray = (array) => {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Обработчик изменения фильтра
const onFilterChange = debounce((photos, filterType, renderPhotos) => {
  let filteredPhotos = photos.slice();

  switch (filterType) {
    case 'random':
      filteredPhotos = shuffleArray(filteredPhotos).slice(0, 10);
      break;
    case 'discussed':
      filteredPhotos.sort((a, b) => b.comments.length - a.comments.length);
      break;
  }

  const picturesContainer = document.querySelector('.pictures');
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());

  renderPhotos(filteredPhotos);
});

// Инициализация фильтров
const initFilters = (photos, renderPhotos) => {
  const filtersContainer = document.querySelector('.img-filters');
  const filtersForm = filtersContainer.querySelector('.img-filters__form');
  const defaultFilter = filtersContainer.querySelector('#filter-default');

  filtersContainer.classList.remove('img-filters--inactive');
  defaultFilter.classList.add('img-filters__button--active');

  filtersForm.addEventListener('click', (evt) => {
    const selectedFilter = evt.target.closest('.img-filters__button');
    if (!selectedFilter) return;

    const activeFilter = filtersForm.querySelector('.img-filters__button--active');
    activeFilter.classList.remove('img-filters__button--active');
    selectedFilter.classList.add('img-filters__button--active');

    onFilterChange(photos, selectedFilter.id.replace('filter-', ''), renderPhotos);
  });
};

export {initFilters};
