import {createPhotosArray} from './data.js';

const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const containerPictures = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();

createPhotosArray().forEach((photo) => {
  const image = templatePicture.querySelector('.picture__img');

  image.src = photo.url;
  image.alt = photo.description;
  templatePicture.querySelector('.picture__comments').textContent = photo.comments.length;
  templatePicture.querySelector('.picture__likes').textContent = photo.likes;

  const thumbnail = templatePicture.cloneNode(true);

  picturesFragment.append(thumbnail);
});

containerPictures.append(picturesFragment);
