const TodoHandler = require('./TodoHandler.js');

const User = function(userName,name,password) {
  this.userName = userName;
  this.name = name;
  this.password = password;
  this.allTodos= new TodoHandler();
  this.currentTodo = '';
}
User.prototype = {
  addTodo: function(title,desc){
    let todo = this.allTodos.addTodo(title,desc);
    this.currentTodo = todo;
  },
  addTodoItem: function(description){
    this.allTodos.addTodoItem(this.currentTodo.id,description);
  },
  getAllTodo:function(){
    return this.allTodos.getAllTodo();
  },
  isValidTodo: function(key){
    return this.allTodos.isValidTodo(key);
  },
  getTodoHtml: function(key){
    let todo = this.allTodos.getTodo(key);
    this.currentTodo = todo;
    let html = `<div><h1>${todo.title}</h1><h3>${todo.description}</h3><br><div id=items ></div ></div>`
    return html;
  },
  getAllItem: function(){
    return this.currentTodo.getAllItem();
  }
}

module.exports = User;
