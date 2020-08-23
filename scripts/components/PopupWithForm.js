import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler, formInitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._formInitHandler = formInitHandler;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');

    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  open(initData) {
    this._formInitHandler(initData);
    super.open();
  }

  close() {
    this._popup.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (evt) => {

      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());

      this.close();
    });
  }
}

