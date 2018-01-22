const Todo = require('./Todo.js');

const User = function(userName,name,password) {
  this.userName = userName;
  this.name = name;
  this.password = password;
  this.allTodos= {};
  this.todoIdCounter = 0;
  this.currentTodo = '';
}
User.prototype = {
  addTodo: function(title,desc){
    let id = this.todoIdCounter++;
    let todo = new Todo(title,desc,id);
    this.allTodos[id] = todo;
    this.currentTodo = todo;
  },
  addTodoItem: function(title){
    this.allTodos[this.currentTodo.id].addItem(title);
  },
  getAllTodo:function(){
    return Object.values(this.allTodos);
  },
  isValidTodo: function(key){
    let keys = Object.keys(this.allTodos);
    return keys.includes(key);
  },
  getTodoHtml: function(key){
    let todo = this.allTodos[key];
    this.currentTodo = todo;
    let html = `<div><h1>Title : ${todo.title}</h1><h3>Description : ${todo.description}</h3><br><div id=items ></div ></div>`
    return html;
  },
  getAllItem: function(){
    return this.currentTodo.getAllItem();
  },
  deleteTodo: function(todoId){
    return delete this.allTodos[todoId];
  },
  updateItemStatus:function(todoId,itemId){
    this.allTodos[todoId].updateStatus(itemId);
  },
  deleteItem: function(todoId,itemId){
    return this.allTodos[todoId].deleteItem(itemId);
  }
}

module.exports = User;
