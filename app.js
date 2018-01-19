const fs = require('fs');
const Log = require('./utility/log.js');
const WebApp = require('./webapp');
const DataHandler = require('./public/scripts/todoApp.js');
const User = require('./public/scripts/user.js');
const StaticFileHandler = require('./lib/models/serveFile.js');
const SessionHandler = require('./lib/models/sessionManager.js');
const serveFile = new StaticFileHandler('public', fs).getRequestHandler();
const log = new Log('./request.log', fs).getRequestHandler();
let dataHandler = new DataHandler('./data/_usersData.json');
dataHandler.loadData();
let sessionHandler = new SessionHandler();
sessionHandler.addUser('raghu', 'Raghunath', 'raghu');
sessionHandler.addUser('arvinds', 'Arvind', 'arvinds');

let loadUser = (req, res) => {
  let sessionid = req.cookies.sessionid;
  let user = sessionHandler.getUserBySessionId(sessionid);
  if (sessionid && user) {
    req.user = user;
  }
};

const getData = function(path, message) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/message/, message);
  return content;
}

const respondWithMsg = function(req, res, file) {
  let content = '';
  let path = `./public${file}`;
  if (req.cookies.message)
    content = getData(path, req.cookies.message);
  else
    content = getData(path, '');
  res.statusCode = 200;
  res.write(content);
  res.end();
  return;
};

let forbiddenUrls = ['/', '/create', '/todoList', '/html/new.html', '/createItem', '/logout'];

const redirectForbiddenUrlsToLogin = (req, res) => {
  if (req.urlIsOneOf(forbiddenUrls) && !req.user) res.redirect('/login');
};

const redirectLoginUsersToHome = (req, res) => {
  if (req.urlIsOneOf(['/login']) && req.user) res.redirect('/');
}
//==============================================================
const homepage = (req, res) => {
  let home = fs.readFileSync('./public/html/index.html', 'utf8');
  home = home.replace(/userName/, `welcome ${req.user.name}`);
  res.statusCode = 200;
  res.write(home);
  res.end();
  return;
};

const loginPage = (req, res) => {
  respondWithMsg(req, res, '/html/login.html');
  return;
};

const checkUser = (req, res) => {
  if (!sessionHandler.hasUser(req.body.userName, req.body.password)) {
    sessionHandler.failedLogin(res);
    res.redirect('/login');
    return;
  }
  let user = sessionHandler.getUser(req.body.userName);
  sessionHandler.setSessionId(res,user);
  res.redirect('/');
};

const addItem = (req, res) => {
  let item = req.body.item;
  todoApp.todos[req.user].addItem(user, item);
  res.statusCode = 200;
  let itemsHtml = currentUser.getItemsHtml();
  res.write(JSON.stringify(itemsHtml));
  res.end();
  return;
};

const todoPage = (req, res) => {
  let title = req.body.title;
  if (!title) {
    res.setHeader('Set-Cookie', `message=Title required; Max-Age=5`)
    res.redirect('/new');
    return;
  }
  let description = req.body.description;
  todoApp.todos[req.user].addTodo(title, description);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write(fs.readFileSync('./public/html/createTodo.html'));
  res.end();
};

const newTodoPage = (req, res) => {
  respondWithMsg(req, res, '/html/new.html');
};

const todoList = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write('');
  res.end();
};

const logoutPage = (req, res) => {
  sessionHandler.logOut(req, res);
  res.redirect('/login');
};

//=====================================================================
let app = WebApp.create();
app.use(log);
app.use(loadUser);
app.use(redirectForbiddenUrlsToLogin);
app.use(redirectLoginUsersToHome);
app.use(serveFile);

app.get('/', homepage);
app.get('/login', loginPage);
app.post('/login', checkUser);
app.post('/createItem', addItem);
app.get('/new', newTodoPage)
app.post('/create', todoPage);
app.get('/todoList', todoList);
app.post('/logout', logoutPage);

module.exports = app;
