function togglePopup() {
  let popup = document.querySelector(".popup");
  popup.classList.toggle("popup_opened");
  initForm();
}

function getProfile() {
  return {
    fullName: document.querySelector(".profile__full-name").textContent.trim(),
    description: document
      .querySelector(".profile__description")
      .textContent.trim(),
  };
}

function initForm() {
  let profile = getProfile();

  document.querySelector(".popup__full-name").value = profile.fullName;
  document.querySelector(".popup__description").value = profile.description;
}

function updateProfile(profile) {
  document.querySelector(".profile__full-name").textContent = profile.fullName;
  document.querySelector(".profile__description").textContent =
    profile.description;
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  updateProfile({
    fullName: document.querySelector(".popup__full-name").value.trim(),
    description: document.querySelector(".popup__description").value.trim(),
  });

  togglePopup();
}

let profileEditBtn = document.querySelector(".profile__edit-btn");
profileEditBtn.addEventListener("click", togglePopup);

let popupCloseBtn = document.querySelector(".popup__close-btn");
popupCloseBtn.addEventListener("click", togglePopup);

let popup = document.querySelector(".popup");
popup.addEventListener("submit", formSubmitHandler);
