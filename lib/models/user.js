const Todo = require('./todo.js');

const User = function(username,name) {
  this.username = username;
  this.name = name;
  this.allTodos= {};
  this.todoIdCounter = 0;
};
User.prototype = {
  addTodo(title,desc){
    const id = this.todoIdCounter++;
    const todo = new Todo(title,desc,id);
    this.allTodos[id] = todo;
  },
  addTodoItem(todoId,title){
    this.allTodos[todoId].addItem(title);
  },
  getAllTodo(){
    return Object.values(this.allTodos);
  },
  isValidTodo(key){
    const keys = Object.keys(this.allTodos);
    return keys.includes(key);
  },
  getTodoHtml(key){
    const todo = this.allTodos[key];
    const title = `<span><strong>Title : ${todo.title}</strong><button onclick='editTodoTitle()'>edit</button></span>`;
    const description = `<span><strong>Description : ${todo.description}</strong><button onclick='editTodoDesc()'>edit</button></span>`;
    const html =  `<div>${title}<br>${description}<br><div id=items ></div ></div>`;
    return html;
  },
  getAllItem(todoId){
    return this.allTodos[todoId].getAllItem();
  },
  deleteTodo(todoId){
    return delete this.allTodos[todoId];
  },
  updateItemStatus(todoId,itemId){
    this.allTodos[todoId].updateStatus(itemId);
  },
  deleteItem(todoId,itemId){
    return this.allTodos[todoId].deleteItem(itemId);
  },
  editItem(itemId,text){
    const todoId = itemId.split('_')[0];
    return this.allTodos[todoId].editItem(itemId,text);
  },
  editTodoTitle(todoId,text){
    return this.allTodos[todoId].editTitle(text);
  },
  editTodoDesc(todoId,text){
    return this.allTodos[todoId].editDesc(text);
  }
};

module.exports = User;
