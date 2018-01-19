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
  addItem: function (description){
    this.currentTodo.addItem(description);
  },
  getAllTodo:function(){
    return this.allTodos.getAllTodo();
  }
}

module.exports = User;
