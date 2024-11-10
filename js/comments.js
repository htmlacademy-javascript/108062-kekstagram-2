const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentTemplate = socialComments.querySelector('.social__comment');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
socialComments.innerHTML = '';

const renderNextComments = () => {
  const socialCommentsFragment = document.createDocumentFragment();
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const renderedCommentsLength = renderedComments.length + currentCount;

  renderedComments.forEach (({avatar, name, message}) => {
    const socialComment = socialCommentTemplate.cloneNode(true);
    const socialPicture = socialComment.querySelector('.social__picture');

    socialPicture.src = avatar;
    socialPicture.alt = name;
    socialComment.querySelector('.social__text').textContent = message;

    socialCommentsFragment.append(socialComment);
  });

  socialComments.append(socialCommentsFragment);
  commentsCount.firstChild.textContent = `${renderedCommentsLength}`;
  commentsCount.querySelector('.social__comment-total-count').textContent = comments.length;

  if (renderedCommentsLength >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
  currentCount += COUNT_STEP;
};

const clearComments = () => {
  currentCount = 0;
  socialComments.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', renderNextComments);
};

const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  renderNextComments();

  commentsLoader.addEventListener('click', renderNextComments);
};

export {clearComments, renderComments};
