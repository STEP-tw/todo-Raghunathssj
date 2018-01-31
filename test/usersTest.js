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
        username : 'tester',
        name: 'Tester',
        password : 'test'
      };
      const actual = users.getUser('tester','test');
      assert.deepEqual(actual,expected);
    });
    it("should return undefined if the username and password doesn't matches with any of the users in registered users",() => {
      assert.isUndefined(users.getUser('unknown','none'));
    });
  });
  describe('getUserData',() => {
    it('should return userdata if the given username matches with any of the users data in database',() => {
      const expected = new User('tester','Tester');
      const actual = users.getUserData('tester');
      assert.deepEqual(actual,expected);
    });
    it("should return undefined if the username doesn't matches with any of the users data in database",() => {
      assert.isUndefined(users.getUserData('unknown'));
    });
  });
  describe('getUserBySessionId',() => {
    it('should return user data if the session id matches with any of the users session id',() => {
      const user = users.getUser('tester','test');
      user.sessionid = 12345;
      const actual = users.getUserBySessionId(12345);
      const expected = new User('tester','Tester');
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
