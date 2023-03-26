export class SingleRange {
  constructor(rangeElement) {
    this.range = rangeElement;
    this.rangeInput = this.range.querySelector('.range__input');
    this.rangeProgress = this.range.querySelector('.range__progress');
    this.rangeThumb = this.range.querySelector('.range__thumb');
    this.rangeValue = this.range.querySelector('.range__value');
    this.isActive = false;

    this.init();
  }

  init() {
    this.rangeValue.textContent = this.rangeInput.value;
    this.updateProgress();
    this.updateThumbPosition();
    this.addEventListeners();
  }

  updateProgress() {
    const max = this.rangeInput.getAttribute('max');
    const { value } = this.rangeInput;
    const percentage = (value / max) * 100;
    this.rangeProgress.style.width = `${percentage}%`;
  }

  updateThumbPosition() {
    const maxValue = +this.rangeInput.getAttribute('max');
    const minValue = +this.rangeInput.getAttribute('min');
    const value = +this.rangeInput.value;
    const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
    this.rangeThumb.style.left = `calc(${percentage}% - 15px)`;
  }

  addEventListeners() {
    this.rangeInput.addEventListener('input', () => {
      this.rangeValue.textContent = this.rangeInput.value;
      this.updateProgress();
      this.updateThumbPosition();
    });

    this.rangeThumb.addEventListener('mousedown', (event) => {
      event.preventDefault();
      this.isActive = true;
      document.addEventListener('mousemove', this.onMouseMove.bind(this));
      document.addEventListener('mouseup', this.onMouseUp.bind(this));
      document.addEventListener('mouseleave', this.onMouseUp.bind(this));
    });
  }

  onMouseMove(event) {
    if (!this.isActive) return;

    const inputRect = this.rangeInput.getBoundingClientRect();
    const inputX = inputRect.left;
    const inputWidth = inputRect.width;
    const clickX = event.clientX;
    let newValue = Math.round(((clickX - inputX) / inputWidth) * 70);

    const minValue = parseInt(this.rangeInput.min, 10);
    const maxValue = parseInt(this.rangeInput.max, 10);

    newValue = Math.min(Math.max(newValue, minValue), maxValue);

    this.rangeInput.value = newValue;
    this.rangeValue.textContent = newValue;
    this.updateProgress();
    this.updateThumbPosition();
  }

  onMouseUp() {
    this.isActive = false;
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('mouseup', this.onMouseUp.bind(this));
    document.removeEventListener('mouseleave', this.onMouseUp.bind(this));
  }
}