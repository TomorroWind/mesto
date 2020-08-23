/**
 *  Represent place card object
 */
export default class Card {

  constructor(data, cardSelector, photoClickHandler) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._photoClickHandler = photoClickHandler;
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

    const cardPhoto = this._element.querySelector('.place__photo');
    const cardName = this._element.querySelector('.place__name');

    cardPhoto.src = this._link;
    cardPhoto.alt = `Фотография места: ${this._name}`;
    cardName.textContent = this._name;

    return this._element;
  }

  /**
   *  Sets event listener for card object
   */
  _setEventListeners() {
    const cardLike = this._element.querySelector('.place__like');
    const cardRemoveBtn = this._element.querySelector('.place__remove-btn');
    const cardPhoto = this._element.querySelector('.place__photo');

    cardLike.addEventListener('click', e => this._toggleLike(e.target));
    cardRemoveBtn.addEventListener('click', e => this._removeCard(e.target));
    cardPhoto.addEventListener('click', () => this._photoClickHandler(this._link, this._name));
  }

  /**
   * Set/unset like on place
   * @param {Object} likeElement represent DOM element for like
   */
  _toggleLike(likeElement) {
    likeElement.classList.toggle('place__like_checked');
  }

  /**
   * Remove place
   * @param {object} removePlaceBtn represent button in DOM
   */
  _removeCard(removeCardBtn) {
    removeCardBtn.closest('.place').remove();
  }
}
