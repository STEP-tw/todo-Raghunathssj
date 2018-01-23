let chai = require('chai');
let assert = chai.assert;
let Users = require('../lib/models/users');
let User = require('../lib/models/user');

describe('Users',()=>{
  beforeEach(()=>{
    users = new Users('./test/testData/details.json','./test/testData/data.json');
  })
  describe('getUser',()=>{
    it('should get the user if the username and password is matches with any of the users in registered users',()=>{
      let expected= {
        username : 'tester',
        name: 'Tester',
        password : 'test'
      }
      let actual = users.getUser('tester','test');
      assert.deepEqual(actual,expected);
    })
    it("should return undefined if the username and password doesn't matches with any of the users in registered users",()=>{
      assert.isUndefined(users.getUser('unknown','none'));
    })
  })
  describe('getUserData',()=>{
    it('should return userdata if the given username matches with any of the users data in database',()=>{
      let expected = new User('tester','Tester');
      let actual = users.getUserData('tester');
      assert.deepEqual(actual,expected);
    })
    it("should return undefined if the username doesn't matches with any of the users data in database",()=>{
      assert.isUndefined(users.getUserData('unknown'));
    })
  })
  describe('getUserBySessionId',()=>{
    it('should return user data if the session id matches with any of the users session id',()=>{
      let user = users.getUser('tester','test');
      user.sessionid = 12345;
      let actual = users.getUserBySessionId(12345);
      let expected = new User('tester','Tester');
      assert.deepEqual(actual,expected);
    })
    it("should return undefined if the session id doesn't matches with any of the users session id in registered users",()=>{
      assert.isUndefined(users.getUserBySessionId('1234567'));
    })
  })
})
