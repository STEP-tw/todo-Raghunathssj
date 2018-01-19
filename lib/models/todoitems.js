const Item = require('./item.js');
class TodoItems {
  constructor(todoId) {
    this.items = {};
    this.todoId = todoId;
    this.id = 0;
  }
  addItem(title){
    let id = `${this.todoId}&${this.id}`;
    let item = new Item(title,id);
    this.items[this.id++] = item;
  }
}
module.exports = TodoItems;
