import { SingleSelect } from "./SingleSelect";

export class Select {
  constructor(selector) {
    this.selects = [];
    document.querySelectorAll(selector).forEach((select) => {
      this.selects.push(new SingleSelect(select));
    });
  }
}


