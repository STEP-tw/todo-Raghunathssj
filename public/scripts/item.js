class Item {
  constructor(description) {
    this.description = description;
  }
  toHtml(){
    return `<p>${this.description}</p>`;
  }
  mark(){
    return `<strike>${this.description}</strike>`;
  }
}

module.exports = Item;
