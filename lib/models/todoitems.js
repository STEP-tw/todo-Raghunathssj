const Item = require('./item.js');
class TodoItems {
  constructor(todoId) {
    this.items = {};
    this.todoId = todoId;
    this.id = 0;
  }
  addItem(title){
    let id = `${this.todoId}_${this.id}`;
    let item = new Item(title,id);
    this.items[this.id++] = item;
  }
  getAllItem(){
    return Object.values(this.items);
  }
  updateStatus(itemId){
    this.items[itemId].updateStatus();
  }
}
module.exports = TodoItems;
