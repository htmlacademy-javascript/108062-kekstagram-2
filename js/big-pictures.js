import {photos} from './data.js';
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

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  bigPictureCancel.removeEventListener('click', onbigPictureCancelClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
}

const openBigPicture = (pictureId) => {
  const currentPhoto = photos.find((photo) => photo.id === Number(pictureId));
  const socialCommentsFragment = document.createDocumentFragment();

  bigPictureImg.src = currentPhoto.url;
  likesCount.textContent = currentPhoto.likes;
  socialComments.innerHTML = '';

  currentPhoto.comments.forEach (({avatar, name, message}) => {
    const socialComment = socialCommentTemplate.cloneNode(true);
    const socialPicture = socialComment.querySelector('.social__picture');

    socialPicture.src = avatar;
    socialPicture.alt = name;
    socialComment.querySelector('.social__text').textContent = message;


    socialCommentsFragment.append(socialComment);
  });

  socialComments.append(socialCommentsFragment);
  commentsCaption.textContent = currentPhoto.description;
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPicture.classList.remove('hidden');
  bigPictureCancel.addEventListener('click', onbigPictureCancelClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
};

export {openBigPicture};
