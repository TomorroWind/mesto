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
const popup = document.querySelector('.popup_type_edit-profile');
const popupCloseBtn = popup.querySelector('.popup__close-btn');
const popupFullName = popup.querySelector('.popup__input_el_full-name');
const popupDescription = popup.querySelector('.popup__input_el_description');


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

  popupFullName.value = profile.fullName;
  popupDescription.value = profile.description;
}

/**
 * Initislaize place form
 */
function initPlaceForm() {
  popupPlaceName.value = '';
  popupPlaceLink.value = '';
}

function initPhotoForm(photo) {
  popupImage.src = photo.imageURL;
  popupPhotoDescription.textContent = photo.description;
}

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

  profileFullName.textContent = popupFullName.value.trim();
  profileDescription.textContent = popupDescription.value.trim();

  togglePopup(popup);
}

/**
 * Handle submit event for popup-save button
 * @param {object} evt contanin event infomration
 */
function formPlaceSubmitHandler(evt) {
  evt.preventDefault();

  addPlace({ name: popupPlaceName.value.trim(), imageURL: popupPlaceLink.value.trim() });
  togglePopup(popupPlace);
}

function toggleLike(likeElement) {
  likeElement.classList.toggle('place__like_checked');
}

function removePlace(removePlaceBtn) {
  removePlaceBtn.closest('.place').remove();
}


function addPlace(place) {
  const placeElement = document.querySelector('#place-template').content.cloneNode(true);
  const placePhoto = placeElement.querySelector('.place__photo');
  const placeLike = placeElement.querySelector('.place__like');
  const placeName = placeElement.querySelector('.place__name');
  const placeRemoveBtn = placeElement.querySelector('.place__remove-btn');


  placePhoto.src = place.imageURL;
  placeName.textContent = place.name;
  placeLike.addEventListener('click', e => toggleLike(e.target));
  placeRemoveBtn.addEventListener('click', e => removePlace(e.target));
  placePhoto.addEventListener('click', placePhotoClickHandler);

  places.prepend(placeElement);

}

function initPlaces(...places) {
  places.forEach(place => addPlace({ name: place.name, imageURL: place.link }));
}


// *main
profileEditBtn.addEventListener('click', e => togglePopup(popup));
profileEditBtn.addEventListener('click', initProfileForm);
popupCloseBtn.addEventListener('click', e => togglePopup(popup));
popup.addEventListener('submit', formSubmitHandler);

profileAddBtn.addEventListener('click', e => togglePopup(popupPlace));
profileAddBtn.addEventListener('click', initPlaceForm)
popupPlaceCloseBtn.addEventListener('click', e => togglePopup(popupPlace));
popupPlace.addEventListener('submit', formPlaceSubmitHandler);
popupPhotoCloseBtn.addEventListener('click', e => togglePopup(popupPhoto));


initPlaces(...initialCards);
