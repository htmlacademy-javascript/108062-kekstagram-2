const REMOVE_MESSAGE_TIMEOUT = 5000;
const DEBOUNCE_DELAY = 500;

const errorLoadDataTemplate = document.querySelector('#data-error').content;
const body = document.querySelector('body');

const showErrorMessage = (message) => {
  const errorArea = errorLoadDataTemplate.cloneNode(true);

  if (message) {
    errorArea.querySelector('.data-error__title').textContent = message;
  }

  body.append(errorArea);

  const errorLoadDataArea = body.querySelector('.data-error');

  setTimeout(() => {
    errorLoadDataArea.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

function debounce (callback, timeoutDelay = DEBOUNCE_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {isEscapeKey, showErrorMessage, debounce};
