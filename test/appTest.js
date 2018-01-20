let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
process.env.COMMENT_STORE = "./testStore.json";
let app = require('../app.js');
let th = require('./testHelper.js');

describe('app',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',()=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
      })
    })
  })
  describe('forbidden urls',()=>{
    it('redirect to login page if any of the forbidden urls are given without login',()=>{
      request(app,{method:'POST',url:'/getAllTodo'},res=>{
        th.should_be_redirected_to(res,'/login');
      })
      request(app,{method:'GET',url:'/new'},res=>{
        th.should_be_redirected_to(res,'/login');
      })
    })
  })
  describe('GET /',()=>{
    it('redirects to login page if the user is not logged in',()=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.should_be_redirected_to(res,'/login');
      })
    })
    it('serves the home page if user is logged in',()=>{
      request(app,{method:'GET',url:'/',user:{name:'Raghunath'}},(res)=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Raghunath');
      })
    })
  })
  describe('GET /login',()=>{
    it('serves the login page',()=>{
      request(app,{method:'GET',url:'/login'},res=>{
        th.status_is_ok(res);
        th.body_does_not_contain(res,'Invalid user name or password');
        th.should_not_have_cookie(res,'message');
      })
    })
    it('serves the login page with message if there is cookie',()=>{
      request(app,{method:'GET',url:'/login',headers:{cookie:'message=Invalid user name or password'}},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'Invalid user name or password');
      })
    })
  })
  describe('POST /login',()=>{
    it('redirects to home for valid user and password',()=>{
      request(app,{method:'POST',url:'/login',body:'userName=raghu&password=raghu'},res=>{
        th.should_be_redirected_to(res,'/');
        th.should_not_have_cookie(res,'message');
      })
    })
    it('redirects to /login with message if user name and password is not given ',()=>{
      request(app,{method:'POST',url:'/login',body:'userName=&password='},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_expiring_cookie(res,'message','Invalid user name or password');
      })
    })
    it('redirects to /login with message if user name is not given ',()=>{
      request(app,{method:'POST',url:'/login',body:'userName=&password=raghu'},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_expiring_cookie(res,'message','Invalid user name or password');
      })
    })
    it('redirects to /login with message if password is not given ',()=>{
      request(app,{method:'POST',url:'/login',body:'userName=raghu&password='},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_expiring_cookie(res,'message','Invalid user name or password');
      })
    })
    it('redirects to /login with message if invalid user name is given',()=>{
      request(app,{method:'POST',url:'/login',body:'userName=raghu&password=raghus'},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_expiring_cookie(res,'message','Invalid user name or password');
      })
    })
    it('redirects to /login with message if invalid user name is given',()=>{
      request(app,{method:'POST',url:'/login',body:'userName=raghus&password=raghu'},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_expiring_cookie(res,'message','Invalid user name or password');
      })
    })
    it('redirects to /login with message if invalid user name given and password is given wrongly',()=>{
      request(app,{method:'POST',url:'/login',body:'userName=raghus&password=raghus'},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_expiring_cookie(res,'message','Invalid user name or password');
      })
    })
  })
  describe('POST /createTodo',()=>{
    it('serves the home page if title is given',()=>{
      request(app,{method:'POST',url:'/createTodo',user:{name:'Raghunath',addTodo:()=>{return}},body:'title=Title'},res=>{
        th.should_be_redirected_to(res,'/');
      })
    })
    it('serves the new todo page with message if title is not given',()=>{
      request(app,{method:'POST',url:'/createTodo',user:{name:'Raghunath',addTodo:()=>{return}},body:'title='},res=>{
        th.should_be_redirected_to(res,'/new');
        th.should_have_expiring_cookie(res,'message','Title required');
      })
    })
  })
  describe('POST /logout',()=>{
    it('redirects to login page with an expiring cookie',()=>{
      request(app,{method:'POST',url:'/logout',user:{name:'Raghunath'}},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_expiring_cookie(res,'sessionid',0);
      })
    })
    it('redirects to login page if there is no logged in user',()=>{
      request(app,{method:'POST',url:'/logout'},res=>{
        th.should_be_redirected_to(res,'/login');
      })
    })
  })
  describe('POST /getAllItem',()=>{
    it('should give given items',()=>{
      request(app,{method:'POST',url:'/getAllItem',user:{name:'Raghunath',getAllItem:()=>{return}}},res=>{
        th.status_is_ok(res);
      })
    })
  }),
  describe('POST /create',()=>{
    it('stores the given item',()=>{
      request(app,{method:'POST',url:'/create',user:{name:'Raghunath',addTodoItem:()=>{return}}},res=>{
        th.status_is_ok(res);
      })
    })
  })
  describe('GET /new', () => {
    it('should serve new todo page', () => {
      request(app,{method:'GET',url:'/new',user:{name:'Arvind'}},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Title');
        th.body_contains(res,'description');
      })
    })
    it('should serve new todo page', () => {
      request(app,{method:'GET',url:'/new',user:{name:'Arvind'},headers:{cookie:'message=Title required'}},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Title required');
      })
    })
  })
  describe('POST /getAllTodo', ()=>{
    it('should give given user todos', ()=>{
      request(app,{method:'POST',url:'/getAllTodo',user:{name:'Arvind',getAllTodo:()=>{return;}}},res=>{
        th.status_is_ok(res);
      })
    })
  })
  describe('POST /deleteTodo',()=>{
    it('should delete the todo using todoId and response with status',()=>{
      request(app,{method:'POST',url:'/deleteTodo',user:{name:'Arvind',deleteTodo:()=>{return true}}},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'true');
      })
    })
  })
  describe('POST /updateItemStatus',()=>{
    it("should update status of the given id's item of current todo",()=>{
      request(app,{method:'POST',url:'/updateItemStatus',body:'itemId=0_0',user:{name:'Arvind',updateItemStatus:()=>{return;}}},res=>{
        th.status_is_ok(res);
      })
    })
  })
})
