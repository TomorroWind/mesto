import Popup from './Popup.js';
import { popupImageSelector, popupPhotoDescriptionSelector } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  open({ link, name }) {

    this._popup.querySelector(popupImageSelector).src = link;
    this._popup.querySelector(popupPhotoDescriptionSelector).textContent = name;

    super.open();
  }
}
