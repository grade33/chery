import { Range } from './vendor/range/Range';
import { Select } from './vendor/select/Select';
import { initSwiperGoods, initSwiperHero } from './modules/swiper';
import { classNames } from './utils/classNames';

import 'normalize.css';

// Range
const classRange = classNames.range;
new Range(`.${classRange}`); // eslint-disable-line

// Select
const classSelect = classNames.select;
new Select(`.${classSelect}`); // eslint-disable-line

// Swiper
initSwiperHero();
initSwiperGoods();
