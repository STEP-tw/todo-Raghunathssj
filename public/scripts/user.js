const TODO = require('./todo.js');

class User {
  constructor(userName) {
    this.user = userName;
    this.todos= [];
    this.currentTodo = '';
  }
  makeTODO(title,description){
    let todo = new TODO(title,description);
    this.currentTodo = todo;
    this.todos.push(todo);
  }
  getTodos(){
    return this.todos;
  }
  makeItem(description){
    this.currentTodo.makeItem(description);
  }
  getItemsHtml(){
    return this.currentTodo.getItemsHtml();
  }
  setButton(title){
    return `<input type=submit value=${title}>`;
  }
  ToHTML(){
    let buttons = this.todos.map(todo=>{return this.setButton(todo.title)})
    let html = buttons.join('<br>');
    return html;
  }
}

module.exports = User;
