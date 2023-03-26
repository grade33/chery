import { SingleRange } from './SingleRange';

export class Range {
  constructor(selector) {
    this.ranges = document.querySelectorAll(selector);
    this.rangesInstances = [];

    this.init();
  }

  init() {
    this.ranges.forEach((range) => {
      this.rangesInstances.push(new SingleRange(range));
    });
  }
}
