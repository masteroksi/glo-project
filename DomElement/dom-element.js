/**
 *
 * @param {string} selector
 * @param {number} height
 * @param {number} width
 * @param {string} bg
 * @param {number} fontSize
 * @constructor
 */
function DomElement(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

DomElement.prototype.createElement = function () {
    let element;
    if (this.selector.startsWith('.')) {
        element = document.createElement('div');
        element.className = this.selector.substr(1);
    } else if (this.selector.startsWith('#')) {
        element = document.createElement('p');
        element.id = this.selector.substr(1);
    } else {
        return;
    }
    element.style.cssText = `height: ${this.height}px;
    width: ${this.width}px;
    background: ${this.bg};
    font-size: ${this.fontSize}px;`;
    element.innerText = 'Lorem ipsum dolor sit amet.';

    document.body.append(element);
};

const divElement = new DomElement('.block', 200, 200, '#f00', 16);
divElement.createElement();
const pElement = new DomElement('#best', 600, 600, '#00f', 20);
pElement.createElement();

const errorElement = new DomElement('sfdsfd', 10, 10, '#000', 10);
errorElement.createElement();
