const Item = require('./item.js');

const TODO = function(title,description,id) {
  this.title = title;
  this.description = description;
  this.id = id;
  this.items = {};
  this.itemIdCounter = 0;
};

TODO.prototype = {
  getTitle(){
    return this.title;
  },
  addItem(title){
    const id = `${this.id}_${this.itemIdCounter++}`;
    const item = new Item(title,id);
    this.items[id] = item;
  },
  getAllItem(){
    return Object.values(this.items);
  },
  updateStatus(itemId){
    this.items[itemId].updateStatus();
  },
  deleteItem(itemId){
    return delete this.items[itemId];
  },
  editItem(itemId,text){
    return this.items[itemId].updateTitle(text);
  }
};

module.exports = TODO;
