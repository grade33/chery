import { classNames } from '../utils/classNames';

export function burgerMenu() {
  const classBurgerBtn = classNames.burgerMenu.burger;
  const classClose = classNames.burgerMenu.close;
  const classMenu = classNames.burgerMenu.menu;
  const classMenuActive = classNames.burgerMenu.menuActive;

  const menu = document.querySelector(`.${classMenu}`);
  document.querySelectorAll(`.${classBurgerBtn}`).forEach((burgerBtn) => {
    burgerBtn.addEventListener('click', () => {
      menu.classList.toggle(classMenuActive);
    });
  });

  document.querySelectorAll(`.${classClose}`).forEach((closeEl) => {
    closeEl.addEventListener('click', () => {
      menu.classList.remove(classMenuActive);
    });
  });
}
