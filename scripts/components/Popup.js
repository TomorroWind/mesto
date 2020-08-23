import { popupCloseBtnSelector } from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    const closeBtn = this._popup.querySelector(popupCloseBtnSelector);
    closeBtn.addEventListener('click', () => this.close());

    this._popup.addEventListener('keydown', (evt) => this._handleEscClose(evt));

    this._popup.addEventListener('transitionend', e => {
      if (e.currentTarget === e.target) {
        closeBtn.focus();
      }
    });

    this._popup.addEventListener('click', e => {
      if (e.currentTarget === e.target) {
        this.close();
      }
    });
  }
}
