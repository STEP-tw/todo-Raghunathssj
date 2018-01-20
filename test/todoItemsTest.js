const Item = require('../lib/models/item.js');
let as = require('assert');
let chai = require('chai');
let assert = chai.assert;
const TodoItemshandler = require('../lib/models/todoItems.js');

describe('todoItemsHandler',()=>{
  describe('getAllItem',()=>{
    it('should get all todo items of the todo',()=>{
      let todoItemsHandler = new TodoItemshandler(0);
      assert.deepEqual(todoItemsHandler.getAllItem(),[]);
    })
  })
  describe('addItem',()=>{
    it('should add, new item to all todo items with title and id using todo id',()=>{
      let todoItemsHandler = new TodoItemshandler(0);
      let item = {
        id:'0_0',
        status:false,
        title:'test'
      };
      todoItemsHandler.addItem('test');
      assert.deepEqual(todoItemsHandler.getAllItem(),[item]);
    })
  })
  describe('updateStatus',()=>{
    it('should update the status of the given item id',()=>{
      let todoItemsHandler = new TodoItemshandler(0);
      let item = {
        id:'0_0',
        status:true,
        title:'test'
      };
      todoItemsHandler.addItem('test');
      todoItemsHandler.updateStatus(0);
      assert.deepEqual(todoItemsHandler.getAllItem(),[item]);
    })
  })
  describe('deleteItem',()=>{
    it('should delete the given id item from the todo items',()=>{
      let todoItemsHandler = new TodoItemshandler(0);
      todoItemsHandler.addItem('test');
      todoItemsHandler.deleteItem(0);
      assert.deepEqual(todoItemsHandler.getAllItem(),[]);
    })
  })
})
