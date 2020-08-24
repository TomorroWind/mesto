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
    this._formInitHandler(initData);
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
      this._formSubmitHandler(this._getInputValues());

      this.close();
    });
  }
}

