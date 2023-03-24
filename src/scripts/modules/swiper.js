import Swiper from 'swiper';
import { classNames } from '../utils/classNames';

import 'swiper/css'; // eslint-disable-line import/no-unresolved

export function initSwiperGoods() {
  const classSwiper = classNames.swiper.goods.swiper;

  const mySwiper = new Swiper(`.${classSwiper}`, {
    slidesPerView: 1,
    spaceBetween: 12,
    speed: 1000,
    keyboard: {
      enabled: true,
    },
    grabCursor: true,
  });

  const classBtn = classNames.swiper.goods.btn;
  const classBtnActive = classNames.swiper.goods.btnActive;
  const buttons = document.querySelectorAll(`.${classBtn}`);

  let currentBtn = buttons[0];

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const {slideIndex} = button.dataset;
      currentBtn.classList.remove(classBtnActive);
      button.classList.add(classBtnActive);
      currentBtn = button;
      mySwiper.slideTo(slideIndex);
    });
  });

  mySwiper.on('slideChange', () => {
    const { activeIndex } = mySwiper;
    buttons.forEach((button) => {
      const {slideIndex} = button.dataset;
      if (+slideIndex === activeIndex) {
        button.classList.add(classBtnActive);
      } else {
        button.classList.remove(classBtnActive);
      }
    });
  });

  currentBtn.click();
}
