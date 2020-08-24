import Popup from './Popup.js';
import { popupImageSelector, popupPhotoDescriptionSelector } from '../utils/constants.js';

/**
 *  Class represents popup with uimage element
 */
export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);

    this._image = this._popup.querySelector(popupImageSelector);
    this._description = this._popup.querySelector(popupPhotoDescriptionSelector);
  }

  /**
   * Override parent method open to add extra logic
   * @param {object} param0 containes values link to get image and image name
   */
  open({ link, name }) {

    this._image.src = link;
    this._image.alt = `Фотография места: ${name}`;
    this._description.textContent = name;

    super.open();
  }
}
