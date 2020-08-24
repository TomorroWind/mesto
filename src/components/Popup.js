import { popupCloseBtnSelector } from '../utils/constants.js';

/**
 *  Class represents popup element
 */
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  /**
   *  Opens popup form
   */
  open() {
    this._popup.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    this._popup.classList.add('popup_opened');
  }

  /**
   *  Closes popup form
   */
  close() {
    this._popup.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
    this._popup.classList.remove('popup_opened');
  }

  /**
   * Handles Esc key for popup
   * @param {Object} evt event data
   */
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  /**
   *  Set popup event listeners
   */
  setEventListeners() {
    const closeBtn = this._popup.querySelector(popupCloseBtnSelector);
    closeBtn.addEventListener('click', () => this.close());

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
