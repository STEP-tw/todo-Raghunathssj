let chai = require('chai');
let assert = chai.assert;
const Todo = require('../lib/models/todo.js');
const Item = require('../lib/models/item.js');

describe('Todo',()=>{
  beforeEach(()=> {
    todo = new Todo('test','for testing',0);
  })
  describe('#getTitle',()=>{
    it('should give the title of the todo',()=>{
      assert.equal(todo.getTitle(),'test')
    });
  });
  describe('#addItem',()=>{
    it('should testing addItem in todo',()=>{
      todo.addItem('testing addItem');
      let expected = new Item('testing addItem',"0_0");
      let actual = todo.getAllItem()[0];
      assert.deepEqual(expected,actual);
    });
  });
  describe('#getAllitems',()=>{
    it('should give all items in todo',()=>{
      todo.addItem('testing addItem');
      todo.addItem('testing addItem with two items');
      let actual = todo.getAllItem();
      let expected = [];
      expected[0] = new Item('testing addItem','0_0');
      expected[1] = new Item('testing addItem with two items','0_1');
      assert.deepEqual(expected,actual);
    });
  });
  describe('#updateStatus',()=>{
    it('should change the status of given item',()=>{
      todo.addItem('testing addItem');
      assert.notOk(todo.items['0_0'].status);
      todo.updateStatus('0_0');
      assert.ok(todo.items['0_0'].status);
    });
  });
  describe('#deleteItem',()=>{
    it('should delete the given item of todo',()=>{
      todo.addItem('testing addItem');
      todo.deleteItem('0_0');
      let actual = todo.getAllItem();
      assert.isEmpty(actual);
    });
    it('should delete the given item of todo and should remain other items same',()=>{
      todo.addItem('testing addItem');
      todo.addItem('testing addItem with two items');
      todo.deleteItem('0_0');
      let actual = todo.getAllItem();
      assert.isNotEmpty(actual);
      let expected = new Item('testing addItem with two items','0_1');
      assert.deepEqual(actual[0],expected);
    });
  });
});
