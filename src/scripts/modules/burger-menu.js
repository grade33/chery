import { classNames } from "../utils/classNames";

export function burgerMenu() {
  const classBurgerBtn = classNames.burgerMenu.burger;
  const classCloseBtn = classNames.burgerMenu.close;
  const classMenu = classNames.burgerMenu.menu;
  const classMenuContent = classNames.burgerMenu.menuContent;
  const classMenuActive = classNames.burgerMenu.menuActive;

  const burgerBtn = document.querySelector(`.${classBurgerBtn}`);
  const closeBtn = document.querySelector(`.${classCloseBtn}`);
  const menu = document.querySelector(`.${classMenu}`);
  const menuContent = document.querySelector(`.${classMenuContent}`);

  burgerBtn.addEventListener('click', () => {
    document.body.style.overflow = 'hidden';
    menu.classList.add(classMenuActive);
  });

  menu.addEventListener('click', (e) => {
    if (menuContent.contains(e.target) && !closeBtn.contains(e.target)) return;
    
    document.body.style.overflow = 'auto';
    menu.classList.remove(classMenuActive);
  });
}