import Popup from './Popup.js';
import { popupImageSelector, popupPhotoDescriptionSelector } from '../utils/constants.js';

/**
 *  Class represents popup with uimage element
 */
export default class PopupWithImage extends Popup {

  /**
   * Override parent method open to add extra logic
   * @param {object} param0 containes values link to get image and image name
   */
  open({ link, name }) {

    this._popup.querySelector(popupImageSelector).src = link;
    this._popup.querySelector(popupPhotoDescriptionSelector).textContent = name;

    super.open();
  }
}
