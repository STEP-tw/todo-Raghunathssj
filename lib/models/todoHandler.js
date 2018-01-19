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
}

module.exports = TodoHandler;
