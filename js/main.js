import './upload-img.js';
import './redact-img.js';
import './send-data.js';
import './view-img.js';
import './filter-img.js';
import {containerPictures} from './thumbnails.js';
import {openBigPicture} from './big-pictures.js';

containerPictures.addEventListener('click', (evt) => {
  const carrentPicture = evt.target.closest('.picture');

  if (carrentPicture) {
    openBigPicture(carrentPicture.dataset.pictureId);
  }
});
