import './index.css';
import Card from '../components/Card.js';
import PopupWidthImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../utils/initial-cards.js';
import {
  placeSectionSelector,
  popupProfileSelector,
  popupPlaceSelector,
  profileFullNameSelector,
  profileDescSeletor,
  profileAddBtn,
  profileEditBtn,
  popupProfileFullName,
  popupProfileDescription,
  popupPlaceLink,
  popupPlaceName,
  validationConfiguration,
  popupPhotoSelector
} from '../utils/constants.js';

// *function declarations


/**
 * Initislaize profile  form
 */
function initProfileForm(userInfo) {

  popupProfileFullName.value = userInfo.fullName;
  popupProfileDescription.value = userInfo.description;

  formValidator.updateFormValidationState(document.querySelector(popupProfileSelector));
}

/**
 * Initislaize place form
 */
function initPlaceForm() {
  popupPlaceName.value = '';
  popupPlaceLink.value = '';

  formValidator.updateFormValidationState(document.querySelector(popupPlaceSelector));
}

/**
 * Handle submit event for popup-save button
 * @param {object} formData contanin field values from form
 */
function formProfileSubmitHandler(formData) {

  userInfo.setUserIfno({
    fullName: formData['full-name'].trim(),
    description: formData.description.trim()
  });

}

/**
 * Handle submit event for popup-save button
 * @param {object} formData contanin field values from form
 */
function formPlaceSubmitHandler(formData) {

  const placeElement = new Card({
    name: formData['place-name'].trim(),
    link: formData['place-link'].trim(),
  }, '#place-template', handleCardClick).generateCard();

  placeSection.addItem(placeElement);
}

/**
   * Handle click on place object
   */
function handleCardClick(link, name) {
  const popup = new PopupWidthImage(popupPhotoSelector);
  popup.setEventListeners();
  popup.open({ link, name });
}

// *main
const placeSection = new Section({
  items: initialCards,
  renderer: (place) => {
    const placeElement = new Card(place, '#place-template', handleCardClick).generateCard();
    placeSection.addItem(placeElement);
  }
}, placeSectionSelector);

const profilePopup = new PopupWithForm(popupProfileSelector, formProfileSubmitHandler, initProfileForm);
const placePopup = new PopupWithForm(popupPlaceSelector, formPlaceSubmitHandler, initPlaceForm);
const formValidator = new FormValidator(validationConfiguration);
const userInfo = new UserInfo(profileFullNameSelector, profileDescSeletor);

profilePopup.setEventListeners();
placePopup.setEventListeners();
profileEditBtn.addEventListener('click', () => profilePopup.open(userInfo.getUserInfo()));
profileAddBtn.addEventListener('click', () => placePopup.open());

formValidator.enableValidation();
placeSection.renderItems();
