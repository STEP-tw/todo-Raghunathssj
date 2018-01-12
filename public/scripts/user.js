const TODO = require('./todo.js');

class User {
  constructor(userName) {
    this.user = userName;
    this.todos= [];
  }
  makeTODO(){
    let todo = new TODO();
    this.todos.push(todo);
  }
  getTodos(){
    return this.todos;
  }
  ToHTML(){
    return this.todos.reduce((prev,todo)=>{return prev + todo.toHtml();},'');
  }
}

module.exports = User;
