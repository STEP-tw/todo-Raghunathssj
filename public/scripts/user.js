const TodoHandler = require('./TodoHandler.js');

const User = function(userName) {
  this.user = userName;
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
  }
}

module.exports = User;
