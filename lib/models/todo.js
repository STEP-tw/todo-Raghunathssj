const Item = require('./item.js');

const TODO = function(title,description,id) {
  this.title = title;
  this.description = description;
  this.id = id;
  this.items = {};
  this.itemIdCounter = 0;
};

TODO.prototype = {
  getTitle: function(){
    return this.title;
  },
  addItem: function(title){
    let id = `${this.id}_${this.itemIdCounter++}`
    let item = new Item(title,id);
    this.items[id] = item;
  },
  getAllItem: function(){
    return Object.values(this.items);
  },
  updateStatus:function(itemId){
    this.items[itemId].updateStatus();
  },
  deleteItem: function(itemId){
    return delete this.items[itemId];
  }
}

module.exports = TODO;
