
/**
 *  Implements validation for forms
 */
export default class FormValidator {
  constructor(configuration, formSelector) {
    this._config = configuration;
    this._form = document.querySelector(formSelector);
  }

  /**
 * Switch on data validation on all forms
 */
  enableValidation() {
    if (this._form === undefined) {
      const formList = Array.from(document.querySelectorAll(this._config.formSelector));
      formList.forEach((formElement) => this._setEventListeners(formElement));
    }
    else {
      this._setEventListeners(this._form);
    }
  }

  /**
 * Re-check form data validity and update element state accordingly
 * @param {HTMLElement} formElement form HTML element to validate
 */
  updateFormValidationState() {

    const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    const buttonElement = this._form.querySelector(this._config.submitButtonSelector);

    if (buttonElement) {
      this._toggleButtonState(inputList, buttonElement);
    }

    inputList.forEach((inputElement) => {
      this._hideInputError(this._form, inputElement);
    });
  }

  /**
   * Set validation event listeners on form
   * @param {HTMLElement} formElement form HTML element to validate
   */
  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
    const buttonElement = formElement.querySelector(this._config.submitButtonSelector);

    if (buttonElement) {
      this._toggleButtonState(inputList, buttonElement);
    }

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  /**
   * Enable/disable submit button based on data validation
   * @param {Array} inputList list of inputs
   * @param {HTMLElement} buttonElement submit button HTML element
   */
  _toggleButtonState(inputList, buttonElement) {

    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }

  /**
   * Check that all input element have valid data status
   * @param {Array} inputList list of input elements
   */
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  /**
   * Checks that input element contains valid data
   * @param {HTMLElement} formElement form HTML element
   * @param {HTMLElement} inputElement input HYML element
   */
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  /**
   * Hides input error from user
   * @param {HTMLElement} formElement form HTML element
   * @param {HTMLElement} inputElement input HYML element
   */
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  /**
   * Shows input error to user
   * @param {HTMLElement} formElement form HTML element
   * @param {HTMLElement} inputElement input HYML element
   * @param {string} errorMessage error message to show
   */
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }
}
