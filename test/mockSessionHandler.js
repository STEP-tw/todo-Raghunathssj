class SessionHandler {
  constructor() {
    this.registered_users = [];
  }
  logOut(req,res){
    res.clearCookie('sessionid');
    delete req.user.sessionid;
  }
  failedLogin(res){
    res.cookie('message','Invalid user name or password; Max-Age=5',{encode:String,path:''});
  }
  setSessionId(res,user){
    res.clearCookie('message');
    const sessionid = 1234;
    res.cookie('sessionid',`${sessionid}`);
    user.sessionid = sessionid;
  }
}

module.exports = SessionHandler;
