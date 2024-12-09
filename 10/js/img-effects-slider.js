const img = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelInput = document.querySelector('.effect-level__value');
const effectSlider = document.querySelector('.effect-level__slider');

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value)
      ? value.toFixed(0)
      : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

effectSlider.noUiSlider.on('update', () => {
  effectLevelInput.value = effectSlider.noUiSlider.get();
});

effectLevel.classList.add('hidden');

const onEffectsChange = (evt) => {
  const effect = evt.target.value;

  if (effect === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }

  switch (effect) {
    case 'none':
      img.style.filter = 'none';
      break;
    case 'chrome':
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      effectSlider.noUiSlider.on('update', () => {
        img.style.filter = `grayscale(${effectLevelInput.value})`;
      });
      break;
    case 'sepia':
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      effectSlider.noUiSlider.on('update', () => {
        img.style.filter = `sepia(${effectLevelInput.value})`;
      });
      break;
    case 'marvin':
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      effectSlider.noUiSlider.on('update', () => {
        img.style.filter = `invert(${effectLevelInput.value}%)`;
      });
      break;
    case 'phobos':
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      effectSlider.noUiSlider.on('update', () => {
        img.style.filter = `blur(${effectLevelInput.value}px)`;
      });
      break;
    case 'heat':
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      effectSlider.noUiSlider.on('update', () => {
        img.style.filter = `brightness(${effectLevelInput.value})`;
      });
      break;
  }
};

export {onEffectsChange};
