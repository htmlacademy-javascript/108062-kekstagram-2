import {containerPictures} from './thumbnails.js';
import {openBigPicture} from './big-pictures.js';
import {openUploadModal} from './upload-img-form.js';

containerPictures.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    evt.preventDefault();
    openBigPicture(currentPicture.dataset.pictureId);
  }
});

openUploadModal();
