class SessionHandler {
  constructor() {
    this.registered_users = [];
  }
  addUser(userName,name,password) {
    let userDetails = {
      userName: userName,
      password: password,
      name: name
    };
    this.registered_users.push(userDetails);
  }
  hasUser(userName,password){
    return this.registered_users.some(u=>u.userName==userName);
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
  loadUser(req,res){
    let sessionid = req.cookies.sessionid;
    let user = this.getUserBySessionId(sessionid);
    if (sessionid && user) {
      req.user = user;
    }
  }
}

module.exports = SessionHandler;
