import { SingleSelect } from './SingleSelect';

export class Select {
  constructor(selector) {
    this.selects = document.querySelectorAll(selector);
    this.selectInstances = [];

    this.init();
  }

  init() {
    this.selects.forEach((select) => {
      this.selectInstances.push(new SingleSelect(select));
    });
  }
}
