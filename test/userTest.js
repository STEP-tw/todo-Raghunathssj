const User = require('../lib/models/user.js');
const Todo = require('../lib/models/Todo.js');

let chai = require('chai');
let assert = chai.assert;

let user;

describe('User', () => {
  beforeEach(() => {
    user = new User('arvinds', 'arvind singh', 1234);
  })
  describe('#addTodo', () => {
    it('should add todo in user todos', () => {
      user.addTodo('test', 'for testing');
      let todo = new Todo('test', 'for testing', 0);
      let allTodos = user.getAllTodo();
      assert.deepEqual(user.allTodos['0'], todo);
    })
  })

  describe('#addTodoItem', () => {
    it('should add todoitem in todo', () => {
      user.addTodo('test', 'for testing');
      user.addTodoItem('clean room');
      let item = user.getAllItem()[0];
      assert.deepEqual(item, {
        title: 'clean room',
        id: '0_0',
        status: false
      })
    })
  })
  describe('#getAllTodo', () => {
    it('should give allTodo of user', () => {
      user.addTodo('test', 'for testing');
      user.addTodo('test2', 'for testing2');
      let todo1 = new Todo('test', 'for testing', 0);
      let todo2 = new Todo('test2', 'for testing2', 1);
      let allTodos = user.getAllTodo();
      assert.deepEqual(allTodos, [todo1,todo2]);
    })
  })
  describe('#isValidTodo', () => {
    it('should give true for valid todo', () => {
      user.addTodo('test', 'for testing');
      assert.ok(user.isValidTodo('0'));
    })
    it('should give false for invalid todo', () => {
      user.addTodo('test', 'for testing');
      assert.notOk(user.isValidTodo('4'));
    })
  })
  describe('#getTodoHtml', () => {
    it('should give user todo in html form', () => {
      user.addTodo('test', 'for testing');
      let todoHtml = user.getTodoHtml('0');
      let expected = `<div><h1>Title : test</h1><h3>Description : for testing</h3><br><div id=items ></div ></div>`
      assert.equal(todoHtml, expected);
    })
  })
  describe('getAllItem', () => {
    it('should give all todoitem of given todo', () => {
      user.addTodo('test', 'for testing');
      user.addTodoItem('clean room');
      let item = user.getAllItem();
      assert.deepEqual(item, [{
        title: 'clean room',
        id: '0_0',
        status: false
      }])
    })
  })
  describe('#deleteTodo', () => {
    it('should delete todo of given key from user todos', () => {
      user.addTodo('test', 'for testing');
      user.deleteTodo('0');
      let allTodos = user.getAllTodo();
      assert.isEmpty(allTodos);
    })
  })
  describe('updateItemStatus', () => {
    it('should update todoitem status', () => {
      user.addTodo('test', 'for testing');
      user.addTodoItem('clean room');
      user.updateItemStatus('0', '0_0')
      let item = user.getAllItem()[0];
      assert.deepEqual(item, {
        title: 'clean room',
        id: '0_0',
        status: true
      })
    })
  })
  describe('deleteItem', () => {
    it('should deleteItem of todo', () => {
      user.addTodo('test', 'for testing');
      user.addTodoItem('clean room');
      user.deleteItem('0', '0_0');
      let item = user.getAllItem();
      assert.isEmpty(item);
    })
  })
})
