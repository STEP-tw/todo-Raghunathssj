const Item = require('./item.js');

class TODO {
  constructor(title,description) {
    this.title = title;
    this.description = description;
    this.items = [];
  }
  makeItem(description){
    let item = new Item(description);
    this.items.push(item);
  }
  addItem(description){
    this.makeItem(description);
  }
  getItemsHtml(){
    let html = this.items.reduce((prev,item)=>{return prev + item.toHtml()},'');
    return html;
  }
  titleHtml(){
    return `<h1>${this.title}</h1>`;
  }
  descriptionHtml(){
    return `<p>${this.description}</p>`;
  }
  toHtml(){
    let titleHtml = this.titleHtml();
    let descriptionHtml = this.descriptionHtml();
    let itemsHtml = this.items.map(item=>{return item.toHtml()});
    itemsHtml.unshift(`<div class="item">`);
    itemsHtml.push(`</div>`);
    let itemHtml = itemsHtml.join('<br>');
    return titleHtml+descriptionHtml+itemHtml;
  }
}

module.exports = TODO;
