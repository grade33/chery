export class SingleSelect {
  constructor(selectElement) {
    this.originalSelect = selectElement;
    this.customSelect = null;
    this.selectHead = null;
    this.selectBody = null;
    this.optionsCollection = [];

    this.currentHeadOption = null;

    this.#initializeStructure();

    document.addEventListener('click', this.toggleSelect.bind(this));
    this.optionsCollection.forEach((option) => {
      option.addEventListener('click', this.changeOption.bind(this, option));
    });
  }

  toggleSelect(event) {
    if (!this.selectHead.contains(event.target)) {
      this.customSelect.classList.toggle('is-open', false);
      return;
    }

    this.customSelect.classList.toggle('is-open');
  }

  changeOption(optionElement) {
    this.optionsCollection.forEach((option) => {
      option.classList.toggle('is-selected', option === optionElement);
    });

    const newHeadOption = optionElement.cloneNode(true);
    newHeadOption.classList.replace('select__option_body', 'select__option_head');
    this.currentHeadOption.replaceWith(newHeadOption);
    this.currentHeadOption = newHeadOption;
  }

  #initializeStructure() {
    this.customSelect = document.createElement('div');
    this.customSelect.className = this.originalSelect.className;

    this.selectHead = document.createElement('div');
    this.selectHead.classList.add('select__head');
    this.customSelect.append(this.selectHead);

    this.selectBody = document.createElement('div');
    this.selectBody.classList.add('select__body');
    this.customSelect.append(this.selectBody);

    this.optionsCollection = Array.from(this.originalSelect.querySelectorAll('option')).map(
      ({ textContent, value }, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('select__option', 'select__option_body');

        optionElement.textContent = textContent;
        optionElement.dataset.value = value;
        optionElement.dataset.id = index + 1;

        this.selectBody.append(optionElement);
        return optionElement;
      }
    );

    const firstOption = this.optionsCollection[0].cloneNode(true);
    this.optionsCollection[0].classList.add('is-selected');
    firstOption.classList.replace('select__option_body', 'select__option_head');
    this.currentHeadOption = firstOption;
    this.selectHead.append(this.currentHeadOption);

    this.originalSelect.replaceWith(this.customSelect);
  }
}
