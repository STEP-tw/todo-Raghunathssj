const DataHandler = require('./dataHandler');
const fs = require('fs');
let dataHandler = new DataHandler(fs);
class Users {
  constructor(detailsPath,dataPath) {
    this.registered_users = dataHandler.redeemUsersDetails(detailsPath);
    this.usersTodos = dataHandler.redeemUsersData(dataPath);
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
      return this.getUserData(user.username);
    }
  }
  saveData(){
    dataHandler.saveData(this.usersTodos);
  }
}

module.exports = Users;
