
/**
 *  Class represent user information element
 */
export default class UserInfo {
  constructor(fullNameSelector, descriptionSelector, avatarSelector) {
    this._fullName = document.querySelector(fullNameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  /**
   *  Gets user info
   */
  getUserInfo() {
    return {
      fullName: this._fullName.textContent.trim(),
      description: this._description.textContent.trim(),
      avatar: this._avatar.src,
      id: this._fullName.id
    }
  }

  /**
   * Sets user infomation
   * @param {object} param0 objects contains next properties user full name and user description
   */
  setUserInfo({ fullName, description, avatar, id }) {
    this._fullName.textContent = fullName;
    this._fullName.id = id;
    this._description.textContent = description;
    this._avatar.src = avatar;
    this._avatar.alt = `Аватар: ${fullName}`;
  }
}
