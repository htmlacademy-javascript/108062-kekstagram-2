import {isEscapeKey} from './utils.js';
import {onEffectsChange} from './img-effects-slider.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFileInput = uploadForm.querySelector('#upload-file');
const imgEditorForm = uploadForm.querySelector('.img-upload__overlay');
const imgEditorResetBtn = imgEditorForm.querySelector('#upload-cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const imgScaleSmaller = uploadForm.querySelector('.scale__control--smaller');
const imgScaleBigger = uploadForm.querySelector('.scale__control--bigger');
const img = uploadForm.querySelector('.img-upload__preview img');
const scaleControl = uploadForm.querySelector('.scale__control--value');
const effects = document.querySelector('.effects');

const MAX_COMMENT_SYMBOLS = 140;
const MAX_HASHTAG_SYMBOLS = 20;
const MAX_HASHTAGS = 5;
const SCALE_STEP = 0.25;

let errorMessage = '';
let imgScale = 1;

const error = () => errorMessage;

const onImgEditorResetBtnClick = (evt) => {
  evt.preventDefault();
  uploadForm.reset();
  closeImgEditor();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      closeImgEditor();
    }
  }
};

function closeImgEditor () {
  imgEditorForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgEditorResetBtn.removeEventListener('click', onImgEditorResetBtnClick);
  effects.removeEventListener('change', onEffectsChange);
  uploadFileInput.value = '';
}

const openUploadModal = () => {
  uploadFileInput.addEventListener('change', () => {
    imgEditorForm.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    imgEditorResetBtn.addEventListener('click', onImgEditorResetBtnClick);
    effects.addEventListener('change', onEffectsChange);
  });
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, ' ');
    // uploadForm.submit();
    const formData = new FormData(evt.target);

    fetch(
      'https://31.javascript.htmlacademy.pro/kekstagram',
      {
        method: 'POST',
        body: formData,
      },
    )
  }
});

const isHashtagsValid = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хештег не может состоять только из одной решётки',
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хэштеги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэштег должен начинеться с символа \'#\'',
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Один и тот же хэштег не может быть использован дважды',
    },
    {
      check: inputArray.some((item) => item.length > MAX_HASHTAG_SYMBOLS),
      error: `Максимальная длина одного хэштега ${MAX_HASHTAG_SYMBOLS} символов, включая решётку`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `нельзя указать больше ${MAX_HASHTAGS} хэштегов`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэштег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

const onHashtagInput = () => {
  isHashtagsValid(hashtagInput.value);
};

pristine.addValidator(
  hashtagInput,
  isHashtagsValid,
  error
);

pristine.addValidator (
  commentInput,
  (value) => {
    const hasNumber = value.length <= MAX_COMMENT_SYMBOLS;
    return hasNumber;
  },
  `длина комментария не может составлять больше ${MAX_COMMENT_SYMBOLS} символов`
);

const onImgScaleSmallerClick = () => {
  if (imgScale > SCALE_STEP) {
    imgScale -= SCALE_STEP;
    img.style.transform = `scale(${imgScale})`;
    scaleControl.value = `${imgScale * 100}%`;
  }
};

const onImgScaleBiggerClick = () => {
  if (imgScale < 1) {
    imgScale += SCALE_STEP;
    img.style.transform = `scale(${imgScale})`;
    scaleControl.value = `${imgScale * 100}%`;
  }
};

hashtagInput.addEventListener('input', onHashtagInput);
// uploadForm.addEventListener('submit', onUploadFormSubmit);
imgScaleSmaller.addEventListener('click', onImgScaleSmallerClick);
imgScaleBigger.addEventListener('click', onImgScaleBiggerClick);

export {openUploadModal};
