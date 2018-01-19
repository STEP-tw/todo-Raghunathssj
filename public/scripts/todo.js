const Item = require('./item.js');

const TODO = function(title,description,id) {
  this.title = title;
  this.itemId = 0;
  this.id = id;
  this.description = description;
  this.items = [];
};

TODO.prototype = {
  getTitle: function(){
    return this.title;
  },
  makeItem: function(description){
    let item = new Item(description,this.itemId);
    ++this.itemId;
    this.items.push(item);
  },
  addItem: function(description){
    this.makeItem(description);
  },
  getItemsHtml: function(){
    return this.items.map(item=>item.toHtml());
  },
  titleHtml: function(){
    return `<h1>${this.title}</h1>`;
  },
  descriptionHtml: function(){
    return `<p>${this.description}</p>`;
  },
  toHtml: function(){
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
