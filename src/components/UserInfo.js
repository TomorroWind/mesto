
/**
 *  Class represent user information element
 */
export default class UserInfo {
  constructor(fullNameSelector, descriptionSelector) {
    this._fullName = document.querySelector(fullNameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  /**
   *  Gets user info
   */
  getUserInfo() {
    return {
      fullName: this._fullName.textContent.trim(),
      description: this._description.textContent.trim()
    }
  }

  /**
   * Sets user infomation
   * @param {object} param0 objects contains next properties user full name and user description
   */
  setUserIfno({ fullName, description }) {
    this._fullName.textContent = fullName;
    this._description.textContent = description;
  }
}
