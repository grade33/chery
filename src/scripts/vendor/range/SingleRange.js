export class SingleRange {
  constructor(rangeInputElement) {
    this.rangeInput = rangeInputElement;
    this.range = document.createElement('div');
    this.range.classList.add('range');

    this.rangeTrack = document.createElement('div');
    this.rangeTrack.classList.add('range__track');

    this.rangeProgress = document.createElement('span');
    this.rangeProgress.classList.add('range__progress');

    this.rangeOverlay = document.createElement('div');
    this.rangeOverlay.classList.add('range__overlay');

    this.rangeThumb = document.createElement('span');
    this.rangeThumb.classList.add('range__thumb');

    this.rangeValue = document.createElement('span');
    this.rangeValue.classList.add('range__value');

    this.isActive = false;

    this.init();
  }

  init() {
    this.rangeInput.classList.add('visually-hidden');
    this.rangeInput.setAttribute('id', 'myInput')

    this.rangeInput.parentNode.insertBefore(this.range, this.rangeInput);
    this.range.appendChild(this.rangeInput);
    this.range.appendChild(this.rangeTrack);
    this.range.appendChild(this.rangeProgress);
    this.range.appendChild(this.rangeOverlay);
    this.rangeThumb.appendChild(this.rangeValue);
    this.range.appendChild(this.rangeThumb);

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

    this.rangeOverlay.addEventListener('click', (event) => {
      this.handleRangeClick(event);
    });

    this.rangeThumb.addEventListener('mousedown', (event) => {
      event.preventDefault();
      this.isActive = true;
      document.addEventListener('mousemove', this.onPointerMove);
      document.addEventListener('mouseup', this.onPointerUp);
      document.addEventListener('mouseleave', this.onPointerUp);
    });

    this.rangeThumb.addEventListener('touchstart', (event) => {
      event.preventDefault();
      this.isActive = true;
      document.addEventListener('touchmove', this.onPointerMove);
      document.addEventListener('touchend', this.onPointerUp);
    });
  }

  handleRangeClick(event) {
    const trackRect = this.rangeTrack.getBoundingClientRect();
    const trackX = trackRect.left;
    const trackWidth = trackRect.width;
    const clickX = event.clientX;
    let newValue = Math.round(((clickX - trackX) / trackWidth) * 70);

    const minValue = parseInt(this.rangeInput.min, 10);
    const maxValue = parseInt(this.rangeInput.max, 10);

    newValue = Math.min(Math.max(newValue, minValue), maxValue);

    this.rangeInput.value = newValue;
    this.rangeValue.textContent = newValue;
    this.updateProgress();
    this.updateThumbPosition();
  }

  onPointerMove = (event) => {
    if (!this.isActive) return;

    const trackRect = this.rangeTrack.getBoundingClientRect();
    const trackX = trackRect.left;
    const trackWidth = trackRect.width;
    const pointerX = event.clientX || event.touches[0].clientX;
    const minValue = parseInt(this.rangeInput.min, 10);
    const maxValue = parseInt(this.rangeInput.max, 10);
    let newValue = minValue + Math.round(((pointerX - trackX) / trackWidth) * (maxValue - minValue));

    newValue = Math.min(Math.max(newValue, minValue), maxValue);

    this.rangeInput.value = newValue;
    this.rangeValue.textContent = newValue;
    this.updateProgress();
    this.updateThumbPosition();
  };

  onPointerUp = () => {
    this.isActive = false;
    document.removeEventListener('mousemove', this.onPointerMove);
    document.removeEventListener('mouseup', this.onPointerUp);
    document.removeEventListener('mouseleave', this.onPointerUp);
    document.removeEventListener('touchmove', this.onPointerMove);
    document.removeEventListener('touchend', this.onPointerUp);
  };
}
