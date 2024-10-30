import {createPhotosArray} from './data.js';
import {isEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentTemplate = socialComments.querySelector('.social__comment');
const commentsCaption = bigPicture.querySelector('.social__caption');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const onbigPictureCancelClick = () => {
  closeBigPicture();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  bigPictureCancel.removeEventListener('click', onbigPictureCancelClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openBigPicture = (pictureId) => {
  const carrentPhoto = createPhotosArray().find(photo => photo.id === Number(pictureId));
  const socialCommentsFragment = document.createDocumentFragment();

  bigPictureImg.src = carrentPhoto.url;
  likesCount.textContent = carrentPhoto.likes;
  socialComments.innerHTML = '';

  carrentPhoto.comments.forEach ((comment) => {
    const socialPicture = socialComment.querySelector('.social__picture');

    socialPicture.src = comment.avatar;
    socialPicture.alt = comment.name;
    socialComment.querySelector('.social__text').textContent = comment.message;

    const socialComment = socialCommentTemplate.cloneNode(true);

    socialCommentsFragment.append(socialComment);
  });

  socialComments.append(socialCommentsFragment);
  commentsCaption.textContent = carrentPhoto.description;
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPicture.classList.remove('hidden');
  bigPictureCancel.addEventListener('click', onbigPictureCancelClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
};

export {openBigPicture};
