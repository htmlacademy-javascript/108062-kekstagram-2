import {isEscapeKey} from './utils.js';

const body = document.querySelector('body');

const onBodyClick = (evt) => {
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = document.querySelector('.success__button') || existElement.querySelector('.error__button');

  if (evt.target === existElement || evt.target === closeButton) {
    closeNotification(evt);
  }
};

const onBodyKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    closeNotification(evt);
  }
};

function closeNotification (evt) {
  evt.preventDefault();
  const existElement = document.querySelector('.success') || document.querySelector('.error');

  existElement.remove();
  body.removeEventListener('click', onBodyClick);
  body.removeEventListener('keydown', onBodyKeydown);
}

const appendNotification = (template, trigger = null) => {
  trigger?.();
  const notificationNode = template.cloneNode(true);
  body.append(notificationNode);
  body.addEventListener('click', onBodyClick);
  body.addEventListener('keydown', onBodyKeydown);
};

export {appendNotification};
