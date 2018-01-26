const DataHandler = require('../lib/models/dataHandler');
const fs = require('fs');
let dataHandler = new DataHandler(fs);
class Users {
  constructor(detailsPath,dataPath) {
    this.registered_users = [
  {
    "name" : "raghunath",
    "username" : "raghu",
    "password" : "raghu",
    "sessionid" : 1234
  }
]
    this.usersTodos = [
      {
        "username": "raghu",
        "name": "raghunath",
        "allTodos": {
          "0": {
            "title": "Title",
            "id": 0,
            "items": {},
            "itemIdCounter": 1
          }
        },
        "todoIdCounter": 0,
        "currentTodo": {}
      }
    ]
  }
  getUser(username, password) {
    return this.registered_users.find(u => u.username == username && u.password == password);
  }
  getUserData(username) {
    return this.usersTodos.find(u => u.username == username);
  }
  getUserBySessionId(sessionid) {
    sessionid = +sessionid
    let user = this.registered_users.find(u => u.sessionid == sessionid);
    if (user) {
      let userData = this.getUserData(user.username);
      return dataHandler.loadData([userData])[0];
    }
  }
  saveData(){
    // dataHandler.saveData(this.usersTodos);
  }
}

module.exports = Users;
