import IMask from 'imask';
import { Range } from './vendor/range/Range';
import { initSwiperGoods, initSwiperHero } from './modules/swiper';
import { burgerMenu } from './modules/burger-menu';
import { initYMap } from './modules/ymap';
import { classNames } from './utils/classNames';

import 'normalize.css';

// Range
const classRange = classNames.range;
new Range(`.${classRange}`); // eslint-disable-line

// Burger
burgerMenu();

// Input Tel Mask
const classInputPhoneMask = classNames.inputPhoneMask;
const inputs = document.querySelectorAll(`.${classInputPhoneMask}`);
const maskOptions = {
  mask: '+{7}(000)000-00-00',
};
inputs.forEach((input) => {
  IMask(input, maskOptions);
  input.setAttribute('placeholder', '+7 (xxx) xxx-xx-xx');
});

// Swiper
initSwiperHero();
initSwiperGoods();

// YMap
initYMap();
