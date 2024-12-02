// import {photos} from './data.js';

const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const containerPictures = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();
const image = templatePicture.querySelector('.picture__img');
const pictureComments = templatePicture.querySelector('.picture__comments');
const pictureLikes = templatePicture.querySelector('.picture__likes');

const renderPhotos = (photos) => {

  photos.forEach(({id, url, description, comments, likes}) => {

    templatePicture.dataset.pictureId = id;
    image.src = url;
    image.alt = description;
    pictureComments.textContent = comments.length;
    pictureLikes.textContent = likes;

    const thumbnail = templatePicture.cloneNode(true);

    picturesFragment.append(thumbnail);
  });

  containerPictures.append(picturesFragment);
};

export {containerPictures, renderPhotos};
