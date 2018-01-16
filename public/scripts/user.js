const TODO = require('./todo.js');

class User {
  constructor(userName) {
    this.user = userName;
    this.todos= [];
    this.todoId = 0;
    this.currentTodo = '';
  }
  makeTODO(title,description){
    let todo = new TODO(title,description,this.todoId);
    this.currentTodo = todo;
    ++this.todoId;
    this.todos.push(todo);
  }
  getTodosHtml(){
    let html = '';
    for(let i=0;i<this.todos.length;i++){
      html+`<p>${this.todos[i].getTitle()}</p>`;
    }
    return html;
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
