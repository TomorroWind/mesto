/**
 *  Represent place card object
 */
export default class Card {

  constructor(data, cardSelector, handlers) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._isMyCard = data.isMyCard;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._photoClickHandler = handlers.photoClickHandler;
    this._removeClickHandler = handlers.removeClickHandler;
    this._likeClickHandler = handlers.likeClickHandler;
  }

  /**
   *  Gets TML template for place object
   */
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);

    return cardElement;
  }

  /**
   *  Creates card HTML element
   */
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.id = this._id;

    const cardPhoto = this._element.querySelector('.place__photo');
    const cardName = this._element.querySelector('.place__name');

    if (!this._isMyCard) {
      this._element.querySelector('.place__remove-btn').remove();
    }

    if (this._isLiked) {
      this._toggleLike();
    }

    cardPhoto.src = this._link;
    cardPhoto.alt = `Фотография места: ${this._name}`;
    cardName.textContent = this._name;

    this._updateLikeCount(this._likes.length);

    return this._element;
  }

  /**
   *  Sets event listener for card object
   */
  _setEventListeners() {
    const cardLike = this._element.querySelector('.place__like');
    const cardPhoto = this._element.querySelector('.place__photo');

    if (this._isMyCard) {
      const cardRemoveBtn = this._element.querySelector('.place__remove-btn');
      cardRemoveBtn.addEventListener('click', e => this._removeClickHandler(this._id));
    }

    cardLike.addEventListener('click', e => this._likeClickHandler());
    cardPhoto.addEventListener('click', () => this._photoClickHandler(this._link, this._name));
  }

  /**
   * Update like information for current card
   * @param {Array} likes list of likes
   * @param {boolean} isLiked true, if card liked by current user
   */
  _updateLike(likes, isLiked) {
    this._likes = likes;
    this._isLiked = isLiked;
    this._toggleLike();

    this._updateLikeCount(likes.length);
  }

  /**
   * Update total count of likes for current card
   * @param {int} count number of likes
   */
  _updateLikeCount(count) {
    this._element.querySelector('.place__like-count').textContent = count;
  }

  /**
   * Set/unset like on place
   * @param {Object} likeElement represent DOM element for like
   */
  _toggleLike() {
    this._element.querySelector('.place__like').classList.toggle('place__like_checked');
  }

  /**
   * Remove place
   * @param {object} removePlaceBtn represent button in DOM
   */
  _removeCard(removeCardBtn) {
    removeCardBtn.closest('.place').remove();
  }
}
