import {getRandomInteger} from './utils.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Драгомир',
  'Ратибор',
  'Добронрав',
  'Ярослав',
  'Велимудр',
  'Зоран',
  'Бажена',
  'Любомила',
  'Велислава',
  'Забава',
  'Деяна',
  'Злата',
];

const PHOTO_ID_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_ID_AVATAR = 1;
const MAX_ID_AVATAR = 6;
let idComment = 0;
let idPhoto = 0;

// Создание объекта с комментарием.

const createComment = () => ({
  id: ++idComment,
  avatar: `img/avatar-${getRandomInteger(MIN_ID_AVATAR, MAX_ID_AVATAR)}.svg`,
  message: `${MESSAGES[getRandomInteger(0, MESSAGES.length - 1)]}`,
  name: `${NAMES[getRandomInteger(0, NAMES.length - 1)]}`,
});

// Создание объекта с описанием фотографии.

const createDescriptionPhoto = () => ({
  id: ++idPhoto,
  url: `photos/${idPhoto}.jpg`,
  description: `Фотография № ${idPhoto}`,
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from({ length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS) }, createComment),
});

// Создание массива с описанием фото.

const createPhotosArray = () => Array.from({ length: PHOTO_ID_COUNT }, createDescriptionPhoto);
const photos = createPhotosArray();

export {photos};