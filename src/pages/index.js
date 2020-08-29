import './index.css';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import { initialCards } from '../utils/initial-cards.js';
import {
  placeSectionSelector,
  popupProfileSelector,
  popupPlaceSelector,
  popupDeletePlaceSelector,
  popupEditAvatarSelector,
  profileFullNameSelector,
  profileDescSeletor,
  profileAvatarSelector,
  validationConfiguration,
  popupPhotoSelector,
  token, groupId
} from '../utils/constants.js';

// * const declaration
const profileAddBtn = document.querySelector('.profile__add-btn');
const profileEditBtn = document.querySelector('.profile__edit-btn');
const profileEditAvatarBtn = document.querySelector('.profile__edit-avatar-btn');
const popupProfileFullName = document.querySelector('.popup__input_el_full-name');
const popupProfileDescription = document.querySelector('.popup__input_el_description');
const popupPlaceName = document.querySelector('.popup__input_el_place-name');
const popupPlaceLink = document.querySelector('.popup__input_el_place-link');
const popupAvatar = document.querySelector('.popup__input_el_avatar');

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
 * Initialize delete card form
 * @param {string} cardId card identifier to delete
 */
function initDeletePlaceForm(cardId) {
  document.querySelector(popupDeletePlaceSelector).elements.card.value = cardId;
}

/**
 * Handle submit event for popup-save button
 * @param {object} formData contanin field values from form
 */
function formProfileSubmitHandler(formData) {

  return api.updateUserInfo({
    name: formData['full-name'].trim(),
    about: formData.description.trim()
  })
    .then(data => userInfo.setUserInfo({
      fullName: data.name,
      description: data.about,
      avatar: data.avatar,
      id: data._id
    }));

}

/**
 * Handle submit event for popup-save button
 * @param {object} formData contanin field values from form
 */
function formPlaceSubmitHandler(formData) {

  return api.addNewCard({
    name: formData['place-name'].trim(),
    link: formData['place-link'].trim()
  })
    .then(place => createPlaceCard(place));
}

/**
 * Handle submit event for delete place form
 * @param {object} formData containes data from delete place form
 */
function formDeletePlaceSubmitHandler(formData) {
  return api.deleteCard(formData.card)
    .then(() => placeSection.removeItem(formData.card));
}

/**
   * Handle click on place object
   */
function handleCardClick(link, name) {
  popupPhoto.open({ link, name });
}

/**
 * Handle click event on delete card button
 * @param {string} cardId card identifier to delete
 */
function handleRemoveCardClick(cardId) {
  deletePlacePopup.open(cardId);
}

/**
 * Handle click event on like card button
 */
function handleLikeCardClick() {
  if (this._isLiked) {
    return api.removeLike(this._id)
      .then(card => this._updateLike(card.likes, false));
  }
  else {
    return api.sendLike(this._id)
      .then(card => this._updateLike(card.likes, true));
  }
}

/**
 * Create HTML element for place and add to page
 * @param {object} place contains infomation about place card
 */
function createPlaceCard(place) {
  const currentUserInfo = userInfo.getUserInfo();

  place.isMyCard = place.owner._id === currentUserInfo.id;
  place.isLiked = place.likes.some(like => like._id == currentUserInfo.id);

  const cardHandlers = {
    photoClickHandler: handleCardClick,
    removeClickHandler: handleRemoveCardClick,
    likeClickHandler: handleLikeCardClick
  };

  const placeElement = new Card(place, '#place-template', cardHandlers).generateCard();
  placeSection.addItem(placeElement);

  return placeElement;
}

/**
 * Inititalize edit avatar form
 * @param {url} avatar link to picture to avatar
 */
function initEditAvatarForm(avatar) {

  popupAvatar.value = avatar;
  avatarFormValidator.updateFormValidationState();
}

/**
 * Handle submit event for edit avatar form
 * @param {object} formData contains data from edit avatar form
 */
function formEditAvatarSubmitHandler(formData) {
  return api.updateAvatar(formData.avatar)
    .then(data => userInfo.setUserInfo({
      fullName: data.name,
      description: data.about,
      avatar: data.avatar,
      id: data._id
    }));
}

// *main
const placeSection = new Section({
  items: null,
  renderer: (place) => {
    createPlaceCard(place);
  }
}, placeSectionSelector);

// component inialization
const popupPhoto = new PopupWithImage(popupPhotoSelector);
const profilePopup = new PopupWithForm(popupProfileSelector, formProfileSubmitHandler, initProfileForm);
const placePopup = new PopupWithForm(popupPlaceSelector, formPlaceSubmitHandler, initPlaceForm);
const deletePlacePopup = new PopupWithForm(popupDeletePlaceSelector, formDeletePlaceSubmitHandler, initDeletePlaceForm);
const editAvatarPopup = new PopupWithForm(popupEditAvatarSelector, formEditAvatarSubmitHandler, initEditAvatarForm);
const profileFormValidator = new FormValidator(validationConfiguration, popupProfileSelector);
const placeFormValidator = new FormValidator(validationConfiguration, popupPlaceSelector);
const avatarFormValidator = new FormValidator(validationConfiguration, popupEditAvatarSelector);
const userInfo = new UserInfo(profileFullNameSelector, profileDescSeletor, profileAvatarSelector);
const api = new Api(token, groupId);

// set evetn listeners
profilePopup.setEventListeners();
placePopup.setEventListeners();
deletePlacePopup.setEventListeners();
editAvatarPopup.setEventListeners();
popupPhoto.setEventListeners();

profileEditBtn.addEventListener('click', () => profilePopup.open(userInfo.getUserInfo()));
profileAddBtn.addEventListener('click', () => placePopup.open());
profileEditAvatarBtn.addEventListener('click', () => editAvatarPopup.open(userInfo.getUserInfo().avatar));

// enable form valiadtion
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// page content inialization
Promise.all([
  api.getUserInfo(),
  api.getCards()
])
  .then(([userData, cards]) => {

    userInfo.setUserInfo({
      fullName: userData.name,
      description: userData.about,
      avatar: userData.avatar,
      id: userData._id
    });

    placeSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });




