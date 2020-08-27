/**
 *  Class represent page section element
 */
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  /**
   * Adds element to section
   * @param {Object} element element to add
   */
  addItem(element) {
    this._container.prepend(element);
  }

  removeItem(itemId) {
    document.getElementById(itemId).remove();
  }

  /**
   *  Clears section from elements
   */
  clear() {
    this._container.innerHTML = '';
  }

  /**
   *  Creates elements in the section
   */
  renderItems(items = null) {
    if (items !== undefined) {
      this._renderedItems = items;
    }

    this.clear();

    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
