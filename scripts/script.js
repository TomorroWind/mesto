// *popup elements
let popup = document.querySelector(".popup");
let popupCloseBtn = document.querySelector(".popup__close-btn");
let popupFullName = document.querySelector(".popup__input_el_full-name");
let popupDescription = document.querySelector(".popup__input_el_description");

// *profile elements
let profileEditBtn = document.querySelector(".profile__edit-btn");
let profileFullName = document.querySelector(".profile__full-name");
let profileDescription = document.querySelector(".profile__description");

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

// *main
popupCloseBtn.addEventListener("click", togglePopup);
profileEditBtn.addEventListener("click", togglePopup);
popup.addEventListener("submit", formSubmitHandler);
