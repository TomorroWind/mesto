

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

const popupPhoto = document.querySelector('.popup_type_photo');
const popupPhotoCloseBtn = popupPhoto.querySelector('.popup__close-btn');
const popupImage = popupPhoto.querySelector('.popup__photo');
const popupPhotoDescription = popupPhoto.querySelector('.popup__photo-description');

// *profile elements
const profileAddBtn = document.querySelector('.profile__add-btn');
const profileEditBtn = document.querySelector('.profile__edit-btn');
const profileFullName = document.querySelector('.profile__full-name');
const profileDescription = document.querySelector('.profile__description');

//* place elements
const places = document.querySelector('.places');

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

  updateFormValidationState(popupProfile, validationConfiguration);
  togglePopup(popupProfile);
}

/**
 * Initislaize place form
 */
function initPlaceForm() {
  popupPlaceName.value = '';
  popupPlaceLink.value = '';

  updateFormValidationState(popupPlace, validationConfiguration);
  togglePopup(popupPlace);
}

/**
 * Inititliaze photo popup
 * @param {Object represents photo data} photo
 */
function initPhotoForm(photo) {
  popupImage.src = photo.imageURL;
  popupPhotoDescription.textContent = photo.description;
}

/**
 *  Handle click event on place's photo
 * @param {Object} evt represent event
 */
function placePhotoClickHandler(evt) {
  const imageURL = evt.target.src;
  const description = evt.target.closest('.place').querySelector('.place__name').textContent.trim();

  initPhotoForm({ imageURL, description });
  togglePopup(popupPhoto);
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

  const placeEmenent = createPlaceElement({ name: popupPlaceName.value.trim(), imageURL: popupPlaceLink.value.trim() });
  addPlaceToProfile(placeEmenent);

  togglePopup(popupPlace);
}

/**
 * Set/unset like on place
 * @param {Object} likeElement represent DOM element for like
 */
function toggleLike(likeElement) {
  likeElement.classList.toggle('place__like_checked');
}

/**
 * Remove place
 * @param {object} removePlaceBtn represent button in DOM
 */
function removePlace(removePlaceBtn) {
  removePlaceBtn.closest('.place').remove();
}

/**
 * Create place block
 * @param {Object} place represent place data
 */
function createPlaceElement(place) {
  const placeElement = document.querySelector('#place-template').content.cloneNode(true);
  const placePhoto = placeElement.querySelector('.place__photo');
  const placeLike = placeElement.querySelector('.place__like');
  const placeName = placeElement.querySelector('.place__name');
  const placeRemoveBtn = placeElement.querySelector('.place__remove-btn');


  placePhoto.src = place.imageURL;
  placePhoto.alt = `Фотография места: ${place.name}`;
  placeName.textContent = place.name;
  placeLike.addEventListener('click', e => toggleLike(e.target));
  placeRemoveBtn.addEventListener('click', e => removePlace(e.target));
  placePhoto.addEventListener('click', placePhotoClickHandler);

  return placeElement;
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
    const placeElement = createPlaceElement({ name: place.name, imageURL: place.link });
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

profileEditBtn.addEventListener('click', initProfileForm);
setPopupEventListeners(popupProfile, popupProfileCloseBtn, formProfileSubmitHandler);

profileAddBtn.addEventListener('click', initPlaceForm);
setPopupEventListeners(popupPlace, popupPlaceCloseBtn, formPlaceSubmitHandler);

setPopupEventListeners(popupPhoto, popupPhotoCloseBtn);

initPlaces(...initialCards);
