const User = require('../lib/models/user.js');
const TodoHandler = require('../lib/models/todoHandler.js');

let chai = require('chai');
let assert = chai.assert;

describe('User',()=>{
  beforeEach(()=>{
    user = new User('arvinds','arvind singh',1234);
    todoHandler = new TodoHandler();
  })
  describe('#addTodo',()=>{
    it('should add todo in user todos',()=>{
      user.addTodo('home','home stuff');
      let todo = todoHandler.addTodo('home','home stuff');
      let allTodos = user.getAllTodo();
      assert.deepEqual(allTodos[0],todo);
    })
  })
  describe('#addTodoItem',()=>{
    it('should add todoitem in todo',()=>{
      user.addTodo('home','home stuff');
      user.addTodoItem('clean room');
      let item = user.getAllItem()[0];
      assert.deepEqual(item,{title:'clean room',id:'0_0', status:false})
    })
  })
  describe('#getAllTodo',()=>{
    it('should give allTodo of user',()=>{
      user.addTodo('home','home stuff');
      let todo = todoHandler.addTodo('home','home stuff');
      let allTodos = user.getAllTodo();
      assert.deepEqual(allTodos,[todo]);
    })
  })
  describe('#isValidTodo',()=>{
    it('should give true for valid todo',()=>{
      user.addTodo('home','home stuff');
      assert.ok(user.isValidTodo('0'));
    })
    it('should give false for invalid todo',()=>{
      user.addTodo('home','home stuff');
      assert.notOk(user.isValidTodo('4'));
    })
  })
  describe('#getTodoHtml',()=>{
    it('should give user todo in html form',()=>{
      user.addTodo('home','home stuff');
      let todo = todoHandler.addTodo('home','home stuff');
      let todoHtml = user.getTodoHtml('0');
      let expected = `<div><h1>Title : home</h1><h3>Description : home stuff</h3><br><div id=items ></div ></div>`
      assert.equal(todoHtml,expected);
    })
  })
  describe('getAllItem',()=>{
    it('should give all todoitem of given todo',()=>{
      user.addTodo('home','home stuff');
      user.addTodoItem('clean room');
      let item = user.getAllItem();
      assert.deepEqual(item,[{title:'clean room',id:'0_0', status:false}])
    })
  })
  describe('#deleteTodo',()=>{
    it('should delete todo of given key from user todos',()=>{
      user.addTodo('home','home stuff');
      user.deleteTodo('0');
      let allTodos = user.getAllTodo();
      assert.isEmpty(allTodos);
    })
  })
  describe('updateItemStatus',()=>{
    it('should update todoitem status',()=>{
      user.addTodo('home','home stuff');
      user.addTodoItem('clean room');
      user.updateItemStatus('0','0')
      let item = user.getAllItem()[0];
      assert.deepEqual(item,{title:'clean room',id:'0_0', status:true})
    })
  })
  describe('deleteItem',()=>{
    it('should deleteItem of todo',()=>{
      user.addTodo('home','home stuff');
      user.addTodoItem('clean room');
      user.deleteItem('0','0');
      let item = user.getAllItem();
      assert.isEmpty(item);
    })
  })
})
