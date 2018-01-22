const User = require('./user.js');
class SessionHandler {
  constructor() {
    this.registered_users = [];
  }
  addUser(userName,name,password) {
    let user = new User(userName,name,password);
    this.registered_users.push(user);
  }
  hasUser(userName,password){
    return this.registered_users.some(u=>u.userName==userName && u.password==password);
  }
  getUser(userName){
    return this.registered_users.find(u=>u.userName==userName);
  }
  getUserBySessionId(sessionid){
    return this.registered_users.find(u=>u.sessionid==sessionid);
  }
  logOut(req,res){
    this.setCookie(res,`sessionid=0; Max-Age=5`);
    delete req.user.sessionid;
  }
  failedLogin(res){
    this.setCookie(res,`message=Invalid user name or password; Max-Age=5`);
  }
  setSessionId(res,user){
    let sessionid = new Date().getTime();
    this.setCookie(res,`sessionid=${sessionid}`);
    user.sessionid = sessionid;
  }
  setCookie(res,cookie){
    res.setHeader('Set-Cookie',cookie);
  }
}

module.exports = SessionHandler;
