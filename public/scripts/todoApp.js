const fs = require('fs');
const User = require('./user.js');
const Todo = require('./todo.js');
const Item = require('./item.js');

let TodoApp = function(path){
  this.path = path;
  this.users = {};
}

TodoApp.prototype = {
  loadData: function(){
    this.todos = JSON.parse(fs.readFileSync(this.path));
    if(this.todos == {}) return this.todos;
    let users = Object.keys(this.todos);
    users.forEach(user=>{
      this.todos[user].__proto__ = new User().__proto__;
      this.todos[user].todos.forEach(todo=>{
        todo.__proto__ = new Todo().__proto__;
        todo.items.forEach(item=>{
          item.__proto__ = new Item().__proto__;
        })
      })
    })
    return;
  },
  save: function(){
    let data = JSON.stringify(this.todos,null,2);
    fs.writeFileSync(this.path,data,'utf8');
    return;
  }
}

module.exports = TodoApp;
