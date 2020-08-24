import './index.css';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
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
  validationConfiguration,
  popupPhotoSelector
} from '../utils/constants.js';

// * const declaration
const profileAddBtn = document.querySelector('.profile__add-btn');
const profileEditBtn = document.querySelector('.profile__edit-btn');
const popupProfileFullName = document.querySelector('.popup__input_el_full-name');
const popupProfileDescription = document.querySelector('.popup__input_el_description');
const popupPlaceName = document.querySelector('.popup__input_el_place-name');
const popupPlaceLink = document.querySelector('.popup__input_el_place-link');


// *function declarations


/**
 * Initislaize profile  form
 */
function initProfileForm(userInfo) {

  popupProfileFullName.value = userInfo.fullName;
  popupProfileDescription.value = userInfo.description;

  profileFormValidator.updateFormValidationState(document.querySelector(popupProfileSelector));
}

/**
 * Initislaize place form
 */
function initPlaceForm() {
  popupPlaceName.value = '';
  popupPlaceLink.value = '';

  placeFormValidator.updateFormValidationState();
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

  createPlaceCard({
    name: formData['place-name'].trim(),
    link: formData['place-link'].trim(),
  });

}

/**
   * Handle click on place object
   */
function handleCardClick(link, name) {
  popupPhoto.open({ link, name });
}

/**
 * Create HTML element for place and add to page
 * @param {object} place contains infomation about place card
 */
function createPlaceCard(place) {
  const placeElement = new Card(place, '#place-template', handleCardClick).generateCard();
  placeSection.addItem(placeElement);

  return placeElement;
}

// *main
const placeSection = new Section({
  items: initialCards,
  renderer: (place) => {
    createPlaceCard(place);
  }
}, placeSectionSelector);

const popupPhoto = new PopupWithImage(popupPhotoSelector);
const profilePopup = new PopupWithForm(popupProfileSelector, formProfileSubmitHandler, initProfileForm);
const placePopup = new PopupWithForm(popupPlaceSelector, formPlaceSubmitHandler, initPlaceForm);
const profileFormValidator = new FormValidator(validationConfiguration, popupProfileSelector);
const placeFormValidator = new FormValidator(validationConfiguration, popupPlaceSelector);
const userInfo = new UserInfo(profileFullNameSelector, profileDescSeletor);

profilePopup.setEventListeners();
placePopup.setEventListeners();
popupPhoto.setEventListeners();
profileEditBtn.addEventListener('click', () => profilePopup.open(userInfo.getUserInfo()));
profileAddBtn.addEventListener('click', () => placePopup.open());

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

placeSection.renderItems();
