const User = require('../lib/models/user.js');
const Todo = require('../lib/models/todo.js');

const chai = require('chai');
const assert = chai.assert;

let user;

describe('User', () => {
  beforeEach(() => {
    user = new User('arvinds', 'arvind singh', 1234);
  });
  describe('#addTodo', () => {
    it('should add todo in user todos', () => {
      user.addTodo('test', 'for testing');
      const todo = new Todo('test', 'for testing', 0);
      assert.deepEqual(user.allTodos['0'], todo);
    });
  });

  describe('#addTodoItem', () => {
    it('should add todoitem in todo', () => {
      user.addTodo('test', 'for testing');
      user.addTodoItem('0','clean room');
      const item = user.getAllItem('0')[0];
      assert.deepEqual(item, {
        title: 'clean room',
        id: '0_0',
        statusType: 'undone',
        status: false
      });
    });
  });
  describe('#getAllTodo', () => {
    it('should give allTodo of user', () => {
      user.addTodo('test', 'for testing');
      user.addTodo('test2', 'for testing2');
      const todo1 = new Todo('test', 'for testing', 0);
      const todo2 = new Todo('test2', 'for testing2', 1);
      const allTodos = user.getAllTodo();
      assert.deepEqual(allTodos, [todo1,todo2]);
    });
  });
  describe('#isValidTodo', () => {
    it('should give true for valid todo', () => {
      user.addTodo('test', 'for testing');
      assert.ok(user.isValidTodo('0'));
    });
    it('should give false for invalid todo', () => {
      user.addTodo('test', 'for testing');
      assert.notOk(user.isValidTodo('4'));
    });
  });
  describe('#getTodoHtml', () => {
    it('should give user todo in html form', () => {
      user.addTodo('test', 'for testing');
      const todoHtml = user.getTodoHtml('0');
      const expected = `<div><span><strong>Title : test</strong><button onclick='editTodoTitle()'>edit</button></span><br><span><strong>Description : for testing</strong><button onclick='editTodoDesc()'>edit</button></span><br><div id=items ></div ></div>`;
      assert.equal(todoHtml, expected);
    });
  });
  describe('getAllItem', () => {
    it('should give all todoitem of given todo', () => {
      user.addTodo('test', 'for testing');
      user.addTodoItem('0','clean room');
      const item = user.getAllItem('0');
      assert.deepEqual(item, [{
        title: 'clean room',
        id: '0_0',
        statusType: 'undone',
        status: false
      }]);
    });
  });
  describe('#deleteTodo', () => {
    it('should delete todo of given key from user todos', () => {
      user.addTodo('test', 'for testing');
      user.deleteTodo('0');
      const allTodos = user.getAllTodo();
      assert.isEmpty(allTodos);
    });
    it('should delete todo of given key from user todos and remain other todos', () => {
      user.addTodo('test', 'for testing');
      user.addTodo('test2', 'for testing with two');
      user.deleteTodo('0');
      const allTodos = user.getAllTodo();
      const expected = new Todo('test2','for testing with two',1);
      assert.deepEqual(allTodos,[expected]);
    });
  });
  describe('updateItemStatus', () => {
    it('should update todoitem status', () => {
      user.addTodo('test', 'for testing');
      user.addTodoItem('0','clean room');
      user.updateItemStatus('0', '0_0');
      const item = user.getAllItem('0')[0];
      assert.deepEqual(item, {
        title: 'clean room',
        id: '0_0',
        statusType: 'undone',
        status: true
      });
    });
  });
  describe('deleteItem', () => {
    it('should deleteItem of todo', () => {
      user.addTodo('test', 'for testing');
      user.addTodoItem('0','clean room');
      user.deleteItem('0', '0_0');
      const item = user.getAllItem('0');
      assert.isEmpty(item);
    });
  });
  describe('editTodoTitle', () => {
    it('should edit title of todo', () => {
      user.addTodo('test', 'for testing');
      user.editTodoTitle('0','tested title');
      assert.equal(user.allTodos[0].title,'tested title');
    });
  });
  describe('editTodoDesc', () => {
    it('should edit description of todo', () => {
      user.addTodo('test', 'for testing');
      user.editTodoDesc('0','tested description');
      assert.equal(user.allTodos[0].description,'tested description');
    });
  });
});
