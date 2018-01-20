const TodoItems = require('./TodoItems.js');

const TODO = function(title,description,id) {
  this.title = title;
  this.id = id;
  this.description = description;
  this.allItems = new TodoItems(this.id);
};

TODO.prototype = {
  getTitle: function(){
    return this.title;
  },
  addItem: function(title){
    this.allItems.addItem(title);
  },
  getAllItem: function(){
    return this.allItems.getAllItem();
  },
  updateStatus:function(itemId){
    this.allItems.updateStatus(itemId);
  },
  deleteItem: function(itemId){
    return this.allItems.deleteItem(itemId);
  }
}

module.exports = TODO;