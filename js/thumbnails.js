import {createPhotosArray} from './data.js';

const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const containerPictures = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();

createPhotosArray().forEach(({id, url, description, comments, likes}) => {
  const image = templatePicture.querySelector('.picture__img');

  templatePicture.dataset.pictureId = id;
  image.src = url;
  image.alt = description;
  templatePicture.querySelector('.picture__comments').textContent = comments.length;
  templatePicture.querySelector('.picture__likes').textContent = likes;

  const thumbnail = templatePicture.cloneNode(true);

  picturesFragment.append(thumbnail);
});

containerPictures.append(picturesFragment);

export {containerPictures};
