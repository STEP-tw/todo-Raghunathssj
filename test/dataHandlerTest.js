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
        const FileContents = {
          './data/_userDetails.json':'{"name":"arvinds"}',
          './filenotExist': '{"name":"admin"}'
        };
        return FileContents[path];
      },
      appendFileSync: (path, data) => {
        flagAppendFile = true;
      }
    };
    const dataHandler = new DataHandler(mockFs);
    it('should redeem details of all user of file exist', (done) => {
      const userdata = dataHandler.redeemUsersDetails();
      assert.deepEqual(userdata, {
        name: "arvinds"
      });
      assert.isNotOk(flagAppendFile);
      done();
    });
    it(`should redeem details of all user of file doesn't exist`, (done) => {
      const userdata = dataHandler.redeemUsersDetails('./filenotExist');
      assert.deepEqual(userdata, {
        name: "admin"
      });
      assert.ok(flagAppendFile);
      done();
    });
  });
});
describe('redeemUsersData', () => {
  let flagAppendFile = false;
  let writeData = '';
  const mockFs = {
    existsSync: (path) => {
      return path == './data/_usersData.json';
    },
    readFileSync: (path, encoding) => {
      const FileContents = {
        './data/_usersData.json':'[{"username": "arvinds","name": "raghunath","allTodos": {},"todoIdCounter": 0}]',
        './filenotExist': '[{"username": "admin","name": "Admin","allTodos": {},"todoIdCounter": 0}]'
      };
      return FileContents[path];
    },
    appendFileSync: (path, data) => {
      flagAppendFile = true;
    },
    writeFileSync:(path,data,encoding) => {
      if(path=='./data/_usersData.json')
      {writeData += data;}
    }
  };
  const dataHandler = new DataHandler(mockFs);  
  it('should return data of data file', (done) => {
    const userData = dataHandler.redeemUsersData();
    assert.deepEqual(userData,[new User('arvinds','raghunath')]);
    assert.isNotOk(flagAppendFile);
    done();
  });
  it('should return data of data file', (done) => {
    const userData = dataHandler.redeemUsersData('./filenotExist');
    assert.deepEqual(userData, [new User('admin','Admin')]);
    assert.isOk(flagAppendFile);
    done();
  });
  it('should save the given data in file', () => {
    dataHandler.saveData({name:'arvinds'});
    assert.equal(writeData,'{\n  "name": "arvinds"\n}');
  });
});
