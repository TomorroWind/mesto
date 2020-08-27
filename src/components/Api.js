/**
 *  Class implements Api class to Mesto's server
 */
export default class Api {
  constructor(token, groupId) {
    this._token = token;
    this._groupId = groupId;
  }

  /**
   *  Creates defalt header for HTTP request
   */
  _createDefaultHeaders() {
    return {
      authorization: this._token,
      'Content-Type': 'application/json'
    }
  }

  /**
   *  Gets base url
   */
  _getBaseUrl() {
    return `https://mesto.nomoreparties.co/v1/${this._groupId}/`;
  }

  /**
   *  Wraps fetch operation with standard logic like status and error handling
   * @param {Promise} fetchPromise fetch promise to wrap
   */
  _fetchWrapper(fetchPromise) {
    return fetchPromise
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(`Ошибка: ${response.status}`);
        }
      })
      .catch(err => console.log(err));
  }

  /**
   *  Gets current user info from server
   */
  getUserInfo() {
    const fetchPromise = fetch(this._getBaseUrl() + 'users/me', {
      headers: this._createDefaultHeaders()
    });

    return this._fetchWrapper(fetchPromise);
  }

  /**
   *  Gets card from all users
   */
  getCards() {
    const fetchPromise = fetch(this._getBaseUrl() + 'cards', {
      headers: this._createDefaultHeaders()
    });

    return this._fetchWrapper(fetchPromise);
  }

  /**
   *  Updates current user information
   * @param {name, about} param0 information to update
   */
  updateUserInfo({ name, about }) {
    const fetchPromise = fetch(this._getBaseUrl() + 'users/me', {
      headers: this._createDefaultHeaders(),
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about
      })
    });

    return this._fetchWrapper(fetchPromise);
  }

  /**
   * Update current user avatar
   * @param {string} avatar link to picture for current user avatar
   */
  updateAvatar(avatar) {
    const fetchPromise = fetch(this._getBaseUrl() + 'users/me/avatar', {
      headers: this._createDefaultHeaders(),
      method: 'PATCH',
      body: JSON.stringify({
        avatar
      })
    });

    return this._fetchWrapper(fetchPromise);
  }

  /**
   * Create a new card for current user
   * @param {name, link} param0 new card data
   */
  addNewCard({ name, link }) {
    const fetchPromise = fetch(this._getBaseUrl() + 'cards', {
      headers: this._createDefaultHeaders(),
      method: 'POST',
      body: JSON.stringify({
        name,
        link
      })
    });

    return this._fetchWrapper(fetchPromise);
  }

  /**
   * Deletes card
   * @param {string} cardId card identifier
   */
  deleteCard(cardId) {
    const fetchPromise = fetch(this._getBaseUrl() + `cards/${cardId}`, {
      headers: this._createDefaultHeaders(),
      method: 'DELETE'
    });

    return this._fetchWrapper(fetchPromise);
  }

  /**
   * Send like to provided card y current user
   * @param {string} cardId card identifier to like
   */
  sendLike(cardId) {
    const fetchPromise = fetch(this._getBaseUrl() + `cards/likes/${cardId}`, {
      headers: this._createDefaultHeaders(),
      method: 'PUT'
    });

    return this._fetchWrapper(fetchPromise);
  }

  /**
   * Remove like from provided card
   * @param {string} cardId card identifier to remove like
   */
  removeLike(cardId) {
    const fetchPromise = fetch(this._getBaseUrl() + `cards/likes/${cardId}`, {
      headers: this._createDefaultHeaders(),
      method: 'DELETE'
    });

    return this._fetchWrapper(fetchPromise);
  }

}
