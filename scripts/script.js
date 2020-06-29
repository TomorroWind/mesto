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
const popup = document.querySelector(".popup");
const popupCloseBtn = document.querySelector(".popup__close-btn");
const popupFullName = document.querySelector(".popup__input_el_full-name");
const popupDescription = document.querySelector(".popup__input_el_description");

// *profile elements
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileFullName = document.querySelector(".profile__full-name");
const profileDescription = document.querySelector(".profile__description");

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
 * Initislaize form
 */
function initForm() {
  let profile = getProfile();

  popupFullName.value = profile.fullName;
  popupDescription.value = profile.description;
}

/**
 *  Open/close popup form
 */
function togglePopup() {
  popup.classList.toggle("popup_opened");

  if (popup.classList.contains("popup_opened")) {
    initForm();
  }
}

/**
 * Handle submit event for popup-save button
 * @param {object} evt contanin event infomration
 */
function formSubmitHandler(evt) {
  evt.preventDefault();

  profileFullName.textContent = popupFullName.value.trim();
  profileDescription.textContent = popupDescription.value.trim();

  togglePopup();
}


function addPlace(place) {
  const placeElement = document.querySelector('#place-template').content.cloneNode(true);
  const placePhoto = placeElement.querySelector('.place__photo');
  placePhoto.src = place.imageURL;

  const placeName = placeElement.querySelector('.place__name');
  placeName.textContent = place.name;

  places.prepend(placeElement);

}

function initPlaces(...places) {
  places.forEach(place => addPlace({ name: place.name, imageURL: place.link }));
}

// *main
popupCloseBtn.addEventListener("click", togglePopup);
profileEditBtn.addEventListener("click", togglePopup);
popup.addEventListener("submit", formSubmitHandler);

initPlaces(...initialCards);
