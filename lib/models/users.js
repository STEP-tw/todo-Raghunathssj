class Users {
  constructor() {
    this.users = [];
  }
  getUser(userName){
    return this.users.find(u=>u.userName==userName);
  }
  addUser(user){
    this.users.push(user);
  }
}
