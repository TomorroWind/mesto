// *data

const validationConfiguration = {
  formSelector: '.popup',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_state_error',
  errorClass: 'popup__error_visible'
};

//* function declarations

/**
 * Shows input error to user
 * @param {HTMLElement} formElement form HTML element
 * @param {HTMLElement} inputElement input HYML element
 * @param {string} errorMessage error message to show
 * @param {Object} config validation configuration
 */
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

/**
 * Hides input error from user
 * @param {HTMLElement} formElement form HTML element
 * @param {HTMLElement} inputElement input HYML element
 * @param {Object} config validation configuration
 */
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

/**
 * Checks that input element contains valid data
 * @param {HTMLElement} formElement form HTML element
 * @param {HTMLElement} inputElement input HYML element
 * @param {Object} config validation configuration
 */
function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

/**
 * Check that all input element have valid data status
 * @param {Array} inputList list of input elements
 */
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

/**
 * Enable/disable submit button based on data validation
 * @param {Array} inputList list of inputs
 * @param {HTMLElement} buttonElement submit button HTML element
 * @param {Object} config validation configuration
 */
function toggleButtonState(inputList, buttonElement, config) {

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

/**
 * Set validation event listeners on form
 * @param {HTMLElement} formElement form HTML element to validate
 * @param {Object} config validation configuration
 */
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  if (buttonElement) {
    toggleButtonState(inputList, buttonElement, config);
  }

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

/**
 * Re-check form data validity and update element state accordingly
 * @param {HTMLElement} formElement form HTML element to validate
 * @param {Object} config validation configuration
 */
function updateFormValidationState(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  if (buttonElement) {
    toggleButtonState(inputList, buttonElement, config);
  }

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });
}

/**
 * Switch on data validation on all forms
 * @param {Object} config validation configuration
 */
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => setEventListeners(formElement, config));
}


// *main

enableValidation(validationConfiguration);

