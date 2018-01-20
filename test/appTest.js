let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
process.env.COMMENT_STORE = "./testStore.json";
let app = require('../app.js');
let th = require('./testHelper.js');

describe('app',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })
  describe('GET /',()=>{
    it('redirects to login page if the user is not logged in',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
  })
  describe('GET /login',()=>{
    it('serves the login page',done=>{
      request(app,{method:'GET',url:'/login'},res=>{
        th.status_is_ok(res);
        th.body_does_not_contain(res,'Invalid user name or password');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
  })
  describe('POST /login',()=>{
    it('redirects to home for valid user and password',done=>{
      request(app,{method:'POST',url:'/login',body:'userName=raghu&password=raghu'},res=>{
        th.should_be_redirected_to(res,'/');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
    it('redirects to /login with message if user name and password is not given ',done=>{
      request(app,{method:'POST',url:'/login',body:'userName=&password='},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_expiring_cookie(res,'message','Invalid user name or password');
        done();
      })
    })
    it('redirects to /login with message if user name is not given ',done=>{
      request(app,{method:'POST',url:'/login',body:'userName=&password=raghu'},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_expiring_cookie(res,'message','Invalid user name or password');
        done();
      })
    })
    it('redirects to /login with message if password is not given ',done=>{
      request(app,{method:'POST',url:'/login',body:'userName=raghu&password='},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_expiring_cookie(res,'message','Invalid user name or password');
        done();
      })
    })
    it('redirects to /login with message if invalid user name is given',done=>{
      request(app,{method:'POST',url:'/login',body:'userName=raghu&password=raghus'},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_expiring_cookie(res,'message','Invalid user name or password');
        done();
      })
    })
    it('redirects to /login with message if invalid user name is given',done=>{
      request(app,{method:'POST',url:'/login',body:'userName=raghus&password=raghu'},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_expiring_cookie(res,'message','Invalid user name or password');
        done();
      })
    })
    it('redirects to /login with message if invalid user name given and password is given wrongly',done=>{
      request(app,{method:'POST',url:'/login',body:'userName=raghus&password=raghus'},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_expiring_cookie(res,'message','Invalid user name or password');
        done();
      })
    })
  })
  describe('POST /createTodo',()=>{
    it('serves the create page',done=>{
      request(app,{method:'POST',url:'/createTodo',user:{name:'Raghunath',addTodo:()=>{return}},body:'title=Title'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        done();
      })
    })
    it('serves the create page',()=>{
      request(app,{method:'POST',url:'/createTodo',user:{name:'Raghunath',addTodo:()=>{return}},body:'title='},res=>{
        th.should_be_redirected_to(res,'/new');
        th.should_have_expiring_cookie(res,'message','Title required');
      })
    })
  })
  describe('POST /logout',()=>{
    it('redirects to loginPage with an expiring cookie',done=>{
      request(app,{method:'POST',url:'/logout',user:{name:'Raghunath'}},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_expiring_cookie(res,'sessionid',0);
        done();
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
    it('stores the given item',done=>{
      request(app,{method:'POST',url:'/create',user:{name:'Raghunath',addTodoItem:()=>{return}}},res=>{
        th.status_is_ok(res);
        done();
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
})
