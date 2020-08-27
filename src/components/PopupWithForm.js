import Popup from './Popup.js';

/**
 *  Class represents popup with form element
 */
export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler, formInitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._formInitHandler = formInitHandler;
  }

  /**
   *  Gets values from all fields in form
   */
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');

    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  /**
   * Override of parent method open to add extra logic
   * @param {object} initData data to iniitialize form
   */
  open(initData) {

    if (this._formInitHandler !== undefined) {
      this._formInitHandler(initData);
    }

    super.open();
  }

  /**
   *  Override parent method close to add extra logic
   */
  close() {
    this._popup.reset();
    super.close();
  }

  /**
   *  Override parent method setEventListeners to add extra listeners
   */
  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (evt) => {

      evt.preventDefault();

      this._setSubmitStatusInProcess();

      this._formSubmitHandler(this._getInputValues())
        .then(() => this.close())
        .then(() => this._setSubmitStatusCompleted());
    });
  }

  /**
   *  Updates popup design according progress status
   */
  _setSubmitStatusInProcess() {
    const submitBtn = this._popup.querySelector('.popup__save-btn');

    switch (submitBtn.textContent) {
      case 'Сохранить':
        submitBtn.textContent = 'Сохранение...';
        break;

      case 'Да':
        submitBtn.textContent = 'Выполняется...';
        break;

      case 'Создать':
        submitBtn.textContent = 'Создание...';
        break;
    }
  }

  /**
   *  Updates popup design according complete status
   */
  _setSubmitStatusCompleted() {
    const submitBtn = this._popup.querySelector('.popup__save-btn');

    switch (submitBtn.textContent) {
      case 'Сохранение...':
        submitBtn.textContent = 'Сохранить';
        break;

      case 'Выполняется...':
        submitBtn.textContent = 'Да';
        break;

      case 'Создание...':
        submitBtn.textContent = 'Создать';
        break;
    }
  }
}

