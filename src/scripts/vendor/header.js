import { classNames } from "../utils/classNames";

export function headerBlur() {
  const classBlock = classNames.header.block;
  const classBlur = classNames.header.blur;

  const header = document.querySelector(`.${classBlock}`);

  if (window.scrollY > 0) {
    header.classList.add(classBlur);
    return;
  }

  document.addEventListener('scroll', () => {
    if (header.classList.contains(classBlur) && window.scrollY > 0) return;

    if (window.scrollY > 0) {
      header.classList.add(classBlur);
      return;
    }
    header.classList.remove(classBlur);
  });
}
export function headerHide() {
  const classBlock = classNames.header.block;
  const classHide = classNames.header.hide;

  const header = document.querySelector(`.${classBlock}`);
  let lastScrollY = window.scrollY;

  document.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY !== 0) {
      header.classList.add(classHide);
      lastScrollY = window.scrollY;
    } else {
      header.classList.remove(classHide);
      lastScrollY = window.scrollY;
    }
  });
}