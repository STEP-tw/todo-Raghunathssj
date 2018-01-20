const Todo = require('./Todo.js');

class TodoHandler {
  constructor() {
    this.todos = {};
    this.id = 0;
  }
  addTodo(title,desc){
    let id = this.id++;
    let todo = new Todo(title,desc,id);
    this.todos[id] = todo;
    return todo;
  }
  getAllTodo(){
    return Object.values(this.todos);
  }
  isValidTodo(key){
    let keys = Object.keys(this.todos);
    return keys.includes(key);
  }
  getTodo(key){
    return this.todos[key];
  }
  addTodoItem(key,title){
    this.todos[key].addItem(title);
  }
  deleteTodo(todoId){
    return delete this.todos[todoId];
  }
  updateItemStatus(todoId,itemId){
    this.todos[todoId].updateStatus(itemId);
  }
  deleteItem(todoId,itemId){
    return this.todos[todoId].deleteItem(itemId);
  }
}

module.exports = TodoHandler;