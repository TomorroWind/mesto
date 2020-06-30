// *data
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// *popup elements
const popupProfile = document.querySelector('.popup_type_edit-profile');
const popupProfileCloseBtn = popupProfile.querySelector('.popup__close-btn');
const popupProfileFullName = popupProfile.querySelector('.popup__input_el_full-name');
const popupProfileDescription = popupProfile.querySelector('.popup__input_el_description');


const popupPlace = document.querySelector('.popup_type_new-place');
const popupPlaceCloseBtn = popupPlace.querySelector('.popup__close-btn');
const popupPlaceName = popupPlace.querySelector('.popup__input_el_place-name');
const popupPlaceLink = popupPlace.querySelector('.popup__input_el_place-link');

const popupPhoto = document.querySelector('.popup_type_photo');
const popupPhotoCloseBtn = popupPhoto.querySelector('.popup__close-btn');
const popupImage = popupPhoto.querySelector('.popup__photo');
const popupPhotoDescription = popupPhoto.querySelector('.popup__photo-description');

// *profile elements
const profileAddBtn = document.querySelector('.profile__add-btn')
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
  let profile = getProfile();

  popupProfileFullName.value = profile.fullName;
  popupProfileDescription.value = profile.description;

  togglePopup(popupProfile)
}

/**
 * Initislaize place form
 */
function initPlaceForm() {
  popupPlaceName.value = '';
  popupPlaceLink.value = '';

  togglePopup(popupPlace)
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
function formSubmitHandler(evt) {
  evt.preventDefault();

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
    const placeElement = createPlaceElement({ name: place.name, imageURL: place.link })
    addPlaceToProfile(placeElement);
  });
}


// *main
profileEditBtn.addEventListener('click', initProfileForm);
popupProfileCloseBtn.addEventListener('click', e => togglePopup(popupProfile));
popupProfile.addEventListener('submit', formSubmitHandler);

profileAddBtn.addEventListener('click', initPlaceForm)
popupPlaceCloseBtn.addEventListener('click', e => togglePopup(popupPlace));
popupPlace.addEventListener('submit', formPlaceSubmitHandler);

popupPhotoCloseBtn.addEventListener('click', e => togglePopup(popupPhoto));

initPlaces(...initialCards);
