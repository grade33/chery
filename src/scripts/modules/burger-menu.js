import { classNames } from '../utils/classNames';

export function burgerMenu() {
  const classBurgerBtn = classNames.burgerMenu.burger;
  const classMenu = classNames.burgerMenu.menu;
  const classMenuActive = classNames.burgerMenu.menuActive;

  const menu = document.querySelector(`.${classMenu}`);
  document.querySelectorAll(`.${classBurgerBtn}`).forEach((burgerBtn) => {
    burgerBtn.addEventListener('click', () => {
      if (document.body.style.overflow) {
        document.body.style.overflow = null;
      } else {
        document.body.style.overflow = 'hidden';
      }
      menu.classList.toggle(classMenuActive);
    });
  });
}
