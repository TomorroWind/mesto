
export default class UserInfo {
  constructor(fullNameSelector, descriptionSelector) {
    this._fullName = document.querySelector(fullNameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      fullName: this._fullName.textContent.trim(),
      description: this._description.textContent.trim()
    }
  }

  setUserIfno({ fullName, description }) {
    this._fullName.textContent = fullName;
    this._description.textContent = description;
  }
}
