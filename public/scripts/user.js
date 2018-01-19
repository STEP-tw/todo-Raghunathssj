const TODO = require('./todo.js');

const User = function(userName) {
  this.user = userName;
  this.todos= [];
  this.todoId = 0;
  this.currentTodo = '';
}
User.prototype = {
  makeTODO: function(title,description){
    let todo = new TODO(title,description,this.todoId);
    this.currentTodo = todo;
    ++this.todoId;
    this.todos.push(todo);
  },
  getTodosHtml: function(){
    let html = '';
    for(let i=0;i<this.todos.length;i++){
      html+`<p>${this.todos[i].getTitle()}</p>`;
    }
    return html;
  },
  makeItem: function (description){
    this.currentTodo.makeItem(description);
  },
  getItemsHtml: function(){
    return this.currentTodo.getItemsHtml();
  },
  setButton: function(title){
    return `<input type=submit value=${title}>`;
  },
  ToHTML: function(){
    let buttons = this.todos.map(todo=>{return this.setButton(todo.title)})
    let html = buttons.join('<br>');
    return html;
  }
}

module.exports = User;
