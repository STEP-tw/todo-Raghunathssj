const request = require('supertest');
const MockSessionHandler = require('./mockSessionHandler');
const Mockusers = require('./mockusers');
const app = require('../app.js');
app.logRequest = (req, res, next) => {
  next();
};
app.sessionHandler = new MockSessionHandler();
describe('app', () => {
  beforeEach(() => {
    app.users = new Mockusers();
  });
  describe('GET /bad', () => {
    it('should respond with 404', (done) => {
      request(app)
        .get('/bad')
        .expect(404)
        .end(done);
    });
  });
  describe('forbidden urls', () => {
    it('redirect to login page if any of the forbidden urls are given without login', (done) => {
      request(app)
        .get('/getAllTodo')
        .expect('location', '/login')
        .end(done);
    });
  });
  describe('GET /', () => {
    it('redirects to login page if the user is not logged in', (done) => {
      request(app)
        .get('/')
        .expect('location', '/login')
        .end(done);
    });
    it('serves the home page if user is logged in', (done) => {
      request(app)
        .get('/')
        .set('cookie', 'sessionid=1234')
        .expect(200)
        .expect('content-type', /html/)
        .end(done);
    });
    it('serves the home page if user is logged in', (done) => {
      request(app)
        .get('/login')
        .set('cookie', 'sessionid=1234')
        .expect(302)
        .expect('location', '/')
        .end(done);
    });
  });
  describe('GET /login', () => {
    it('should redirect to home page if user is logged in', (done) => {
      request(app)
        .get('/login')
        .set('cookie', 'sessionid=1234')
        .expect(302)
        .end(done);
    });
    it('serves the login page', (done) => {
      request(app)
        .get('/login')
        .expect(200)
        .expect('content-type', "text/html")
        .end(done);
      // no cookie is giving error
      // th.should_not_have_cookie(res, 'message');
    });
    it('serves the login page with message if there is cookie', (done) => {
      request(app)
        .get('/login')
        .set('cookie', 'message=Invalid user name or password')
        .expect(200)
        .expect('content-type', "text/html")
        .expect(/Invalid user name or password/)
        .end(done);
    });
  });
  describe('POST /login', () => {
    it('redirects to home for valid user and password', (done) => {
      request(app)
        .post('/login')
        .send('username=raghu&password=raghu')
        .expect(302)
        .expect('location', '/')
        .end(done);
    });
    it('redirects to /login with message if user name and password is not given ', (done) => {
      //   th.should_have_expiring_cookie(res, 'message', 'Invalid user name or password problem');
      request(app)
        .post('/login')
        .send('username=&password=')
        .expect(302)
        .expect('set-cookie', 'message=Invalid user name or password; Max-Age=5')
        .expect('location', '/login')
        .end(done);
    });
    it('redirects to /login with message if user name is not given ', (done) => {
      //   th.should_have_expiring_cookie(res, 'message', 'Invalid user name or password');
      request(app)
        .post('/login')
        .send('username=&password=raghu')
        .expect(302)
        .expect('location', '/login')
        .expect('set-cookie', 'message=Invalid user name or password; Max-Age=5')
        .end(done);
    });
    it('redirects to /login with message if password is not given ', (done) => {
      //   th.should_have_expiring_cookie(res, 'message', 'Invalid user name or password');
      request(app)
        .post('/login')
        .send('username=raghu&password=')
        .expect(302)
        .expect('location', '/login')
        .end(done);
    });
    it('redirects to /login with message if invalid user name is given', (done) => {
      //th.should_have_expiring_cookie(res, 'message', 'Invalid user name or password');
      request(app)
        .post('/login')
        .send('username=raghus&password=')
        .expect(302)
        .expect('location', '/login')
        .end(done);
    });
    it('redirects to /login with message if invalid user name given and password is given wrongly', (done) => {
      //th.should_have_expiring_cookie(res, 'message', 'Invalid user name or password');
      request(app)
        .post('/login')
        .send('username=raghus&password=raghus')
        .expect(302)
        .expect('location', '/login')
        .end(done);
    });
  });
  describe('POST /createTodo', () => {
    it('serves the home page if title is given', (done) => {
      request(app)
        .post('/createTodo')
        .set('cookie', 'sessionid=1234')
        .send('title=Title')
        .expect('location', '/')
        .end(done);
    });
    it('redirect to new page with cookie', (done) => {
      request(app)
        .post('/createTodo')
        .set('cookie', 'sessionid=1234')
        .send('title=')
        .expect(302)
        .expect('set-cookie','message=Title required; Max-Age=5')
        .expect('location', '/new')
        .end(done);
    });
  });
  it('serves the new todo page with message if title is not given', (done) => {
    //th.should_have_expiring_cookie(res, 'message', 'Title required');
    request(app)
      .post('/createTodo')
      .set('cookie', 'sessionid=1234')
      .send('title=')
      .expect(302)
      .expect('location', '/new')
      .end(done);
  });
  describe('POST /logout', () => {
    it('redirects to login page with an expiring cookie', (done) => {
      //       th.should_have_expiring_cookie(res, 'sessionid', 0);
      request(app)
        .post('/logout')
        .set('cookie', 'sessionid=1234')
        .expect(302)
        .expect('location', '/login')
        .end(done);
    });

    it('redirects to login page if there is no logged in user', (done) => {
      request(app)
        .post('/logout')
        .set('cookie', 'sessionid=1245')
        .expect(302)
        .expect('location', '/login')
        .end(done);
    });
  });
  describe('POST /getAllItem', () => {
    it('should give given items', (done) => {
      request(app)
        .post('/getAllItem')
        .send('todoId=0')
        .set('cookie', 'sessionid=1234')
        .expect(200)
        .end(done);
    });
  });
  describe('POST /create', () => {
    it('stores the given item', (done) => {
      request(app)
        .post('/addTodoItem')
        .send('todoId=0&item=title')
        .set('cookie', 'sessionid=1234')
        .expect(200)
        .end(done);
    });
  });
  describe('GET /new', () => {
    it('should serve new todo page', (done) => {
      request(app)
        .get('/new')
        .set('cookie', 'sessionid=1234')
        .expect('content-type', 'text/html')
        .expect(200)
        .expect(/Title/)
        .expect(/description/)
        .end(done);
    });
    it('should serve new todo page if there is cookie with message', (done) => {
      request(app)
        .get('/new')
        .set('cookie', 'sessionid=1234;message=Title required')
        .expect('content-type', 'text/html')
        .expect(/Title required/)
        .expect(200)
        .end(done);
    });
  });
  describe('POST /getAllTodo', () => {
    it('should give given user todos', (done) => {
      request(app)
        .post('/getAllTodo')
        .set('cookie', 'sessionid=1234')
        .expect(200)
        .end(done);
    });
  });
  describe('POST /deleteTodo', () => {
    it('should delete the todo using todoId and response with status', (done) => {
      request(app)
        .post('/deleteTodo')
        .set('cookie', 'sessionid=1234')
        .expect(200)
        .expect('true')
        .end(done);
    });
  });
  describe('POST /updateItemStatus', () => {
    it("should update status of the given id's item of the given id's todo", (done) => {
      request(app)
        .post('/updateItemStatus')
        .set('cookie', 'sessionid=1234')
        .send('itemId=0_0')
        .expect(200)
        .end(done);
    });
  });
  describe('POST /deleteItem', () => {
    it("should delete the given id's item of the given id's todo", (done) => {
      request(app)
        .post('/deleteItem')
        .set('cookie', 'sessionid=1234')
        .send('itemId=0_0')
        .expect(200)
        .expect('true')
        .end(done);
    });
  });
  describe('GET /todo[number]', () => {
    it('should respond with 404 if the requested todo is not in user todos', (done) => {
      request(app)
        .get('/todo5')
        .set('cookie', 'sessionid=1234')
        .expect(404)
        .expect(/Cannot GET/)
        .end(done);
    });
  });
  it('should serve item form with title and description of requested todo', (done) => {
    request(app)
      .get('/todo0')
      .set('cookie', 'sessionid=1234')
      .expect(200)
      .expect('content-type', 'text/html')
      .expect(/Title/)
      .end(done);
  });
  describe('POST /editItem',() => {
    it('should replace the title of edited item with given title',(done) => {
      request(app)
        .post('/editItem')
        .set('cookie','sessionid=1234')
        .send('id=0_0&text=changed')
        .expect(200)
        .end(done); 
    });
  });
});
