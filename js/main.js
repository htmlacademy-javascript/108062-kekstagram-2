import {containerPictures, renderPhotos, photos} from './thumbnails.js';
import {openBigPicture} from './big-pictures.js';
import {openUploadModal, setUploadFormSubmit, closeImgEditor} from './upload-img-form.js';
import {activateFilters} from './filter-img.js';

containerPictures.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    evt.preventDefault();
    openBigPicture(currentPicture.dataset.pictureId);
  }
});

renderPhotos(photos);
activateFilters(photos);
openUploadModal();
setUploadFormSubmit(closeImgEditor);
