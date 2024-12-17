import {isEscapeKey} from './utils.js';
import {onEffectsChange} from './img-effects-slider.js';
import {sendData} from './api.js';
import {appendNotification} from './notification.js';

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
const imgUploadSubmitButton = uploadForm.querySelector('.img-upload__submit');
const effects = document.querySelector('.effects');
const effectsPreview = effects.querySelectorAll('.effects__preview');
const templateSuccess = document.querySelector('#success').content;
const templateError = document.querySelector('#error').content;
const effectLevel = document.querySelector('.img-upload__effect-level');

const FILE_TYPES = ['.jpg', '.jpeg', '.png'];
const MAX_COMMENT_SYMBOLS = 140;
const MAX_HASHTAG_SYMBOLS = 20;
const MAX_HASHTAGS = 5;
const SCALE_STEP = 0.25;

let errorMessage = '';
let imgScale = 1;

const error = () => errorMessage;

const onImgEditorResetBtnClick = (evt) => {
  evt.preventDefault();
  closeImgEditor();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      closeImgEditor();
    }
  }
};

const changeImgScale = () => {
  img.style.transform = `scale(${imgScale})`;
  scaleControl.value = `${imgScale * 100}%`;
};

function closeImgEditor () {
  imgEditorForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgEditorResetBtn.removeEventListener('click', onImgEditorResetBtnClick);
  effects.removeEventListener('change', onEffectsChange);
  effectLevel.classList.add('hidden');
  img.style.filter = 'none';
  uploadForm.reset();
  changeImgScale(imgScale = 1);
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

const onFileInputChange = () => {
  const file = uploadFileInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const url = URL.createObjectURL(file);
    img.src = url;
    effectsPreview.forEach((item) => {
      item.style.backgroundImage = `url(${url})`;
    });
  }
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const blockSubmitButton = () => {
  imgUploadSubmitButton.disabled = true;
  imgUploadSubmitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  imgUploadSubmitButton.disabled = false;
  imgUploadSubmitButton.textContent = 'Опубликовать';
};

const setUploadFormSubmit = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, ' ');
      blockSubmitButton();

      sendData(new FormData(evt.target))
        .then(
          () => {
            appendNotification(templateSuccess, () => closeImgEditor());
          })
        .catch(
          () => {
            appendNotification(templateError);
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

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
    changeImgScale();
  }
};

const onImgScaleBiggerClick = () => {
  if (imgScale < 1) {
    imgScale += SCALE_STEP;
    changeImgScale();
  }
};

hashtagInput.addEventListener('input', onHashtagInput);
imgScaleSmaller.addEventListener('click', onImgScaleSmallerClick);
imgScaleBigger.addEventListener('click', onImgScaleBiggerClick);
uploadFileInput.addEventListener('change', onFileInputChange);

export {openUploadModal, closeImgEditor, setUploadFormSubmit};
