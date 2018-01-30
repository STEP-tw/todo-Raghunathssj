const DataHandler = require('../lib/models/dataHandler');
const fs = require('fs');
const dataHandler = new DataHandler(fs);
class Users {
  constructor(detailsPath,dataPath) {
    this.registered_users = [
      {
        "name" : "raghunath",
        "username" : "raghu",
        "password" : "raghu",
        "sessionid" : 1234
      }
    ];
    this.usersTodos = [
      {
        "username": "raghu",
        "name": "raghunath",
        "allTodos": {
          "0": {
            "title": "Title",
            "id": 0,
            "items": {
              "0_0": {
                "title": "edit is working",
                "id": "0_0",
                "status": false
              }
            },
            "itemIdCounter": 1
          }
        },
        "todoIdCounter": 0,
      }
    ];
  }
  getUser(username, password) {
    return this.registered_users.find((u) => u.username == username && u.password == password);
  }
  getUserData(username) {
    return this.usersTodos.find((u) => u.username == username);
  }
  getUserBySessionId(sessionid) {
    sessionid = +sessionid;
    const user = this.registered_users.find((u) => u.sessionid == sessionid);
    if (user) {
      const userData = this.getUserData(user.username);
      return dataHandler.loadData([userData])[0];
    }
  }
  saveData(){
    // dataHandler.saveData(this.usersTodos);
  }
}

module.exports = Users;
