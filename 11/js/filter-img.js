import {photos, clearContainerPictures, renderPhotos} from './thumbnails.js';
import {debounce} from './utils.js';

const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const RANDOM_PHOTOS_QUANTITY = 10;

const filterElement = document.querySelector('.img-filters');
let currentFilter = FILTER.default;

const debounceRender = debounce(renderPhotos);

const onFilterClick = (evt) => {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (!targetButton.matches('button')) {
    return;
  }
  if (activeButton === targetButton) {
    if (targetButton.getAttribute('id') !== FILTER.random) {
      return;
    }
  }
  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.getAttribute('id');

  applyFilter();
};

function applyFilter () {
  let filteredPictures = [];
  switch (currentFilter) {
    case FILTER.default:
      filteredPictures = photos;
      break;
    case FILTER.random:
      filteredPictures = photos.toSorted(() => 0.5 - Math.random()).slice(0, RANDOM_PHOTOS_QUANTITY);
      break;
    case FILTER.discussed:
      filteredPictures = photos.toSorted((a, b) => b.comments.length - a.comments.length);
      break;
  }
  clearContainerPictures();
  debounceRender(filteredPictures);
}

const configFilter = () => {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', onFilterClick);
};

export {configFilter};
