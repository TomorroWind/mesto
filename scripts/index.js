import { Card, popupPhoto, popupPhotoCloseBtn } from './Card.js'
import { FormValidator, validationConfiguration } from './FormValidator.js'
import { initialCards } from './initial-cards.js'

// *popup elements
const popupProfile = document.querySelector('.popup_type_edit-profile');
const popupProfileCloseBtn = popupProfile.querySelector('.popup__close-btn');
const popupProfileFullName = popupProfile.querySelector('.popup__input_el_full-name');
const popupProfileDescription = popupProfile.querySelector('.popup__input_el_description');
const popupProfileSaveBtn = popupProfile.querySelector('.popup__save-btn');


const popupPlace = document.querySelector('.popup_type_new-place');
const popupPlaceCloseBtn = popupPlace.querySelector('.popup__close-btn');
const popupPlaceName = popupPlace.querySelector('.popup__input_el_place-name');
const popupPlaceLink = popupPlace.querySelector('.popup__input_el_place-link');
const popupPlaceSaveBtn = popupPlace.querySelector('.popup__save-btn');

// *profile elements
const profileAddBtn = document.querySelector('.profile__add-btn');
const profileEditBtn = document.querySelector('.profile__edit-btn');
const profileFullName = document.querySelector('.profile__full-name');
const profileDescription = document.querySelector('.profile__description');

//* place elements
const places = document.querySelector('.places');

//* other
const formValidator = new FormValidator(validationConfiguration);

// *function declarations

/**
 * Get profile information
 */
function getProfile() {
  return {
    fullName: profileFullName.textContent.trim(),
    description: profileDescription.textContent.trim(),
  };
}

/**
 * Initislaize profile  form
 */
function initProfileForm() {
  const profile = getProfile();

  popupProfileFullName.value = profile.fullName;
  popupProfileDescription.value = profile.description;

  formValidator.updateFormValidationState(popupProfile);
  togglePopup(popupProfile);
}

/**
 * Initislaize place form
 */
function initPlaceForm() {
  popupPlaceName.value = '';
  popupPlaceLink.value = '';

  formValidator.updateFormValidationState(popupPlace);
  togglePopup(popupPlace);
}

/**
 *  Open/close popup form
 */
function togglePopup(popupElement) {
  popupElement.classList.toggle('popup_opened');
}

/**
 * Handle submit event for popup-save button
 * @param {object} evt contanin event infomration
 */
function formProfileSubmitHandler(evt) {
  evt.preventDefault();

  if (popupProfileSaveBtn.classList.contains('popup__save-btn_disabled')) {
    return;
  }

  profileFullName.textContent = popupProfileFullName.value.trim();
  profileDescription.textContent = popupProfileDescription.value.trim();

  togglePopup(popupProfile);
}

/**
 * Handle submit event for popup-save button
 * @param {object} evt contanin event infomration
 */
function formPlaceSubmitHandler(evt) {
  evt.preventDefault();

  if (popupPlaceSaveBtn.classList.contains('popup__save-btn_disabled')) {
    return;
  }

  const placeElement = new Card({ name: popupPlaceName.value.trim(), link: popupPlaceLink.value.trim() }, '#place-template').generateCard();
  addPlaceToProfile(placeElement);

  togglePopup(popupPlace);
}


/**
 * Remove place
 * @param {object} removePlaceBtn represent button in DOM
 */
function removePlace(removePlaceBtn) {
  removePlaceBtn.closest('.place').remove();
}

/**
 * Add place to profile
 * @param {Object} placeElement is a html node represented place block
 */
function addPlaceToProfile(placeElement) {
  places.prepend(placeElement);
}

/**
 *  Initialize profile with provided places
 * @param  {...object} places list of places
 */
function initPlaces(...places) {
  places.forEach(place => {
    const placeElement = new Card(place, '#place-template').generateCard();
    addPlaceToProfile(placeElement);
  });
}

/**
 * Handles popup form key pressing
 * @param {Object} evt event object
 */
function popupKeyHandler(evt) {
  if (evt.key === 'Escape') {
    togglePopup(evt.currentTarget);
  }
}

/**
 * Inititalizes popup form event listeners
 * @param {HTMLElement} popup popup form HTML element
 * @param {HTMLElement} closeBtn close button HTML element
 * @param {Function} sabmitHandler callback for submit event
 */
function setPopupEventListeners(popup, closeBtn, sabmitHandler) {
  closeBtn.addEventListener('click', () => togglePopup(popup));
  popup.addEventListener('keydown', popupKeyHandler);

  if (sabmitHandler) {
    popup.addEventListener('submit', sabmitHandler);
  }

  popup.addEventListener('transitionend', e => {
    if (e.currentTarget === e.target) {
      closeBtn.focus();
    }
  });

  popup.addEventListener('click', e => {
    if (e.currentTarget === e.target) {
      togglePopup(popup);
    }
  });
}

// *main
formValidator.enableValidation();

profileEditBtn.addEventListener('click', initProfileForm);
setPopupEventListeners(popupProfile, popupProfileCloseBtn, formProfileSubmitHandler);

profileAddBtn.addEventListener('click', initPlaceForm);
setPopupEventListeners(popupPlace, popupPlaceCloseBtn, formPlaceSubmitHandler);

setPopupEventListeners(popupPhoto, popupPhotoCloseBtn);

initPlaces(...initialCards);
