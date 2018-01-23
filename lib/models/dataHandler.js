const fs = require('fs');
const User = require('./user.js');
const Todo = require('./todo.js');
const Item = require('./item.js');

let DataHandler = function(fs){
  this.fs = fs;
}

DataHandler.prototype = {
  redeemUsersDetails(path ='./data/_userDetails.json'){
    if(!this.fs.existsSync(path)) {
      let adminDetails = JSON.stringify([{
        name:'Admin',
        username: 'admin',
        password: 'password'
      }],null,2);
      this.fs.appendFileSync(path,adminDetails,'utf8');
    }
    let usersDetails = this.fs.readFileSync(path,'utf8');
    return JSON.parse(usersDetails)||[];

  },
  redeemUsersData(path='./data/_usersData.json'){
    if(!this.fs.existsSync(path)){
      let adminData = JSON.stringify([new User('admin','Admin')],null,2);
      this.fs.appendFileSync(path,adminData,'utf8');
    }
    let usersData = this.fs.readFileSync(path,'utf8');
    usersData = JSON.parse(usersData);
    return this.loadData(usersData);
  },
  loadData: function(usersData){
    if(usersData == {}) return usersData;
    usersData.forEach(user=>{
      user.__proto__ = new User().__proto__;
      let todos = Object.keys(user.allTodos);
      todos.forEach(todo=>{
        user.allTodos[todo].__proto__ = new Todo().__proto__;
        let items = Object.keys(user.allTodos[todo].items);
        items.forEach(item=>{
          user.allTodos[todo].items[item].__proto__ = new Item().__proto__;
        })
      })
    })
    return usersData;
  },
  saveData: function(userData){
    let data = JSON.stringify(userData,null,2);
    fs.writeFileSync('./data/_usersData.json',data,'utf8');
    return;
  }
}

module.exports = DataHandler;
