const DataHandler = require('../lib/models/dataHandler');
const assert = require('chai').assert;
const User = require('../lib/models/user.js');


describe('dataHandler', () => {
  describe('redeemUserDetails', () => {
    let flagAppendFile = false;
    const mockFs = {
      existsSync: (path) => {
        return path == './data/_userDetails.json';
      },
      readFileSync: (path, encoding) => {
        if (path == './data/_userDetails.json') return '{"name":"arvinds"}'
        if (path == './filenotExist') return '{"name":"admin"}'
      },
      appendFileSync: (path, data) => {
        flagAppendFile = true
      }
    }
    let dataHandler = new DataHandler(mockFs);
    it('should redeem details of all user of file exist', (done) => {
      let userdata = dataHandler.redeemUsersDetails();
      assert.deepEqual(userdata, {
        name: "arvinds"
      });
      assert.isNotOk(flagAppendFile)
      done()
    });
    it(`should redeem details of all user of file doesn't exist`, (done) => {
      let userdata = dataHandler.redeemUsersDetails('./filenotExist');
      assert.deepEqual(userdata, {
        name: "admin"
      });
      assert.ok(flagAppendFile);
      done()
    });
  });
});
describe('redeemUsersData', (done) => {
  let flagAppendFile = false;
  let writeData = '';
  const mockFs = {
    existsSync: (path) => {
      return path == './data/_usersData.json';
    },
    readFileSync: (path, encoding) => {
      if (path == './data/_usersData.json') return '[  {"username": "arvinds","name": "raghunath","allTodos": {},"todoIdCounter": 0,"currentTodo":{}}]'
      if (path == './filenotExist') return '[{"username": "admin","name": "Admin","allTodos": {},"todoIdCounter": 0,"currentTodo": {}}]'
    },
    appendFileSync: (path, data) => {
      flagAppendFile = true
    },
    writeFileSync:(path,data,encoding)=>{
      if(path=='./data/_usersData.json')
      writeData += data;
    }
  }
  let dataHandler = new DataHandler(mockFs);  
  it('should return data of data file', (done) => {
    let userData = dataHandler.redeemUsersData();
    assert.deepEqual(userData,[new User('arvinds','raghunath')]);
    assert.isNotOk(flagAppendFile);
    done();
  });
  it('should return data of data file', (done) => {
    let userData = dataHandler.redeemUsersData('./filenotExist');
    assert.deepEqual(userData, [new User('admin','Admin')]);
    assert.isOk(flagAppendFile);
    done();
  });
  it('should save the given data in file', () => {
    dataHandler.saveData({name:'arvinds'});
    assert.equal(writeData,'{\n  "name": "arvinds"\n}');
  });
});