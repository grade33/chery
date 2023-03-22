export class SingleSelect {
  constructor(select) {
    this.rawSelect = select;
    this.select = null;
    this.head = null;
    this.body = null;
    this.optionsCol = [];

    this.headOption = null;

    this.#initStructure();

    document.addEventListener('click', this.openClose.bind(this));
    this.optionsCol.forEach((optionBody) => {
      optionBody.addEventListener('click', this.change.bind(this, optionBody));
    });
  }

  openClose(e) {
    if (!this.head.contains(e.target)) {
      if (this.select.classList.contains('is-open')) {
        this.select.classList.remove('is-open');
      }
      return;
    }

    this.select.classList.add('is-open');
  }

  change(optionBody) {
    this.optionsCol.forEach((option) => {
      if (!option.classList.contains('is-selected')) return;
      option.classList.remove('is-selected');
    });
    optionBody.classList.add('is-selected');

    const currentHeadOption = optionBody.cloneNode(true);
    currentHeadOption.classList.remove('select__option_body');
    currentHeadOption.classList.add('select__option_head');
    this.headOption.replaceWith(currentHeadOption);
    this.headOption = currentHeadOption;
  }

  #initStructure() {
    this.select = document.createElement('div');
    this.select.className = this.rawSelect.className;

    this.head = document.createElement('div');
    this.head.classList.add('select__head');
    this.select.append(this.head);

    this.body = document.createElement('div');
    this.body.classList.add('select__body');
    this.select.append(this.body);

    this.optionsCol = Array.from(this.rawSelect.querySelectorAll('option')).map(
      ({ textContent, value }, idx) => {
        const optionEl = document.createElement('div');
        optionEl.classList.add('select__option', 'select__option_body');

        optionEl.textContent = textContent;
        optionEl.dataset.value = value;
        optionEl.dataset.id = idx + 1;

        this.body.append(optionEl);
        return optionEl;
      }
    );

    const headOption = this.optionsCol[0].cloneNode(true);
    this.optionsCol[0].classList.add('is-selected');
    headOption.classList.remove('select__option_body');
    headOption.classList.add('select__option_head');
    this.headOption = headOption;
    this.head.append(this.headOption);

    this.rawSelect.replaceWith(this.select);
  }
}
