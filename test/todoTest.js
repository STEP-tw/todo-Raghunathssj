let chai = require('chai');
let assert = chai.assert;
const Todo = require('../lib/models/todo.js');
const Todoitem = require('../lib/models/todoItems');

describe('Todo',()=>{
  beforeEach(()=> {
    todo = new Todo('home','home stuff',0);
    todoItems = new Todoitem(0);
    todoItems.addItem('clean room');
  })
  describe('#getTitle',()=>{
    it('should give the title of the todo',()=>{
      assert.equal(todo.getTitle(),'home')
    });
  });
  describe('#addItem',()=>{
    it('should add item in todo',()=>{
      todo.addItem('clean room');
      let expected = Object.values(todoItems.items)[0];
      let actual = todo.getAllItem()[0];
      assert.deepEqual(expected,actual);
    });
  });
  describe('#getAllitems',()=>{
    it('should give all items in todo',()=>{
      todo.addItem('clean room');
      let expected = Object.values(todoItems.items);
      let actual = todo.getAllItem();
      assert.deepEqual(expected,actual);
    });
  });
  describe('#updateStatus',()=>{
    it('should change the status of given item',()=>{
      todo.addItem('clean room');
      todo.updateStatus('0');
      todoItems.updateStatus('0');
      let expected = Object.values(todoItems.items);
      let actual = todo.getAllItem();
      assert.deepEqual(expected,actual);
    });
  });
  describe('#deleteItem',()=>{
    it('should delete the given item of todo',()=>{
      todo.addItem('clean room');
      todo.deleteItem('0');
      todoItems.deleteItem('0');
      let expected = Object.values(todoItems.items);
      let actual = todo.getAllItem();
      assert.deepEqual(expected,actual);
    });
  });
});
