const chai = require('chai');
const assert = chai.assert;
const Todo = require('../lib/models/todo.js');
const Item = require('../lib/models/item.js');
let todo;
describe('Todo',() => {
  beforeEach(() => {
    todo = new Todo('test','for testing',0);
  });
  describe('#getTitle',() => {
    it('should give the title of the todo',() => {
      assert.equal(todo.getTitle(),'test');
    });
  });
  describe('#addItem',() => {
    it('should testing addItem in todo',() => {
      todo.addItem('testing addItem');
      const expected = new Item('testing addItem',"0_0");
      const actual = todo.getAllItem()[0];
      assert.deepEqual(expected,actual);
    });
  });
  describe('#getAllitems',() => {
    it('should give all items in todo',() => {
      todo.addItem('testing addItem');
      todo.addItem('testing addItem with two items');
      const actual = todo.getAllItem();
      const expected = [];
      expected[0] = new Item('testing addItem','0_0');
      expected[1] = new Item('testing addItem with two items','0_1');
      assert.deepEqual(expected,actual);
    });
  });
  describe('#updateStatus',() => {
    it('should change the status of given item',() => {
      todo.addItem('testing addItem');
      assert.notOk(todo.items['0_0'].status);
      todo.updateStatus('0_0');
      assert.ok(todo.items['0_0'].status);
    });
  });
  describe('#deleteItem',() => {
    it('should delete the given item of todo',() => {
      todo.addItem('testing addItem');
      todo.deleteItem('0_0');
      const actual = todo.getAllItem();
      assert.isEmpty(actual);
    });
    it('should delete the given item of todo and should remain other items same',() => {
      todo.addItem('testing addItem');
      todo.addItem('testing addItem with two items');
      todo.deleteItem('0_0');
      const actual = todo.getAllItem();
      assert.isNotEmpty(actual);
      const expected = new Item('testing addItem with two items','0_1');
      assert.deepEqual(actual[0],expected);
    });
  });
  describe('#editTitle',() => {
    it('should edit the title of todo',() => {
      todo.editTitle('tested title');
      assert.equal(todo.title,'tested title');
    });
  });
  describe('#editDesc',() => {
    it('should edit the description of todo',() => {
      todo.editDesc('tested description');
      assert.equal(todo.description,'tested description');
    });
  });
});
