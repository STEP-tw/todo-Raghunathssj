class SessionHandler {
  constructor() {
    this.registered_users = [];
  }
  logOut(req,res){
    res.clearCookie('sessionid');
    delete req.user.sessionid;
  }
  failedLogin(res){
    res.cookie('message','Invalid user name or password',{maxAge:5000});
  }
  setSessionId(res,user){
    res.clearCookie('message');
    const sessionid = new Date().getTime();
    res.cookie('sessionid',`${sessionid}`);
    user.sessionid = sessionid;
  }
}

module.exports = SessionHandler;
