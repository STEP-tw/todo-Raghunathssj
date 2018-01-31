const chai = require('chai');
const assert = chai.assert;
const Users = require('../lib/models/users');
const User = require('../lib/models/user');
let users;
describe('Users',() => {
  beforeEach(() => {
    users = new Users('./test/testData/details.json','./test/testData/data.json');
  });
  describe('getUser',() => {
    it('should get the user if the username and password is matches with any of the users in registered users',() => {
      const expected= {
        username : 'admin',
        name: 'Admin',
        password : 'password'
      };
      const actual = users.getUser('admin','password');
      assert.deepEqual(actual,expected);
    });
    it("should return undefined if the username and password doesn't matches with any of the users in registered users",() => {
      assert.isUndefined(users.getUser('unknown','none'));
    });
  });
  describe('getUserData',() => {
    it('should return userdata if the given username matches with any of the users data in database',() => {
      const expected = new User('admin','Admin');
      const actual = users.getUserData('admin');
      assert.deepEqual(actual,expected);
    });
    it("should return undefined if the username doesn't matches with any of the users data in database",() => {
      assert.isUndefined(users.getUserData('unknown'));
    });
  });
  describe('getUserBySessionId',() => {
    it('should return user data if the session id matches with any of the users session id',() => {
      const user = users.getUser('admin','password');
      user.sessionid = 12345;
      const actual = users.getUserBySessionId(12345);
      const expected = new User('admin','Admin');
      assert.deepEqual(actual,expected);
    });
    it("should return undefined if the session id doesn't matches with any of the users session id in registered users",() => {
      assert.isUndefined(users.getUserBySessionId('1234567'));
    });
  });
  describe('#saveData', () => {
    it('should save data in database', () => {
      assert.isUndefined(users.saveData());
    });
  });
});
