const fs = require('fs');
const express = require('express');
const cookieparser = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser');
let parseText = require('./lib/utility/utility.js').parseText;
const Users = require('./lib/models/users');
const DataHandler = require('./lib/models/dataHandler');
//=============================================

let loadUser = (req, res,next) => {
  let sessionid = req.cookies.sessionid
  let user = app.users.getUserBySessionId(sessionid);
  if (sessionid && user) {
    req.user = user;
  }
  next();
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
  res.setHeader('Content-Type','text/html');
  res.write(content);
  res.end();
  return;
};

let forbiddenUrls = ['/', '/create', '/createItem', '/logout','/new','/createTodo','/deleteTodo','/getAllItem','/getAllTodo','/updateStatus'];

const redirectForbiddenUrlsToLogin = (req,res,next) => {
  if (forbiddenUrls.includes(req.url) && !req.user || req.url.startsWith('/todo') && !req.user) {
    res.redirect('/login');
    res.send();
  }else
    next();
};

const redirectLoginUsersToHome = (req, res,next) => {
  if (['/login'].includes(req.url) && req.user) {
    res.redirect('/');
    return;
  }
  next()
}

//==============================================================
const homepage = (req, res) => {
  let home = fs.readFileSync('./public/html/index.html', 'utf8');
  home = home.replace(/username/, `welcome ${req.user.name}`);
  res.send(home);
  return;
};

const loginPage = (req, res) => {
  respondWithMsg(req, res, '/html/login.html');
  return;
};

const checkUser = (req, res) => {
  let user = app.users.getUser(req.body.username,req.body.password);
  if (!user) {
    app.sessionHandler.failedLogin(res);
    res.redirect('/login');
    return;
  }
  app.sessionHandler.setSessionId(res,user);
  res.redirect('/');
};

const addItem = (req, res) => {
  let item = req.body.item;
  req.user.addTodoItem(item);
  app.users.saveData()
  res.statusCode = 200;
  res.end();
  return;
};

const todoPage = (req, res) => {
  let title = req.body.title;
  if (!title) {
    res.setHeader('Set-Cookie', `message=Title required; Max-Age=5`);
    res.redirect('/new');
    return;
  }
  let description = req.body.description;
  req.user.addTodo(title, description);
  res.redirect('/');
};

const newTodoPage = (req, res) => {
  respondWithMsg(req, res, '/html/createTodo.html');
};

const logoutPage = (req, res) => {
  app.sessionHandler.logOut(req, res);
  res.redirect('/login');
};

const getAllTodo = (req,res)=>{
  let allTodo = JSON.stringify(req.user.getAllTodo());
  res.write(allTodo);
  res.end();
}

const todoRequestHandler = (req,res,next)=>{
  let todoKey = req.url.match(/[\d+]/);
  todoKey = todoKey && todoKey[0];
  if(req.url.startsWith('/todo') && req.user.isValidTodo(todoKey)){
    let todoHtml = req.user.getTodoHtml(todoKey);
    let formData = fs.readFileSync('./public/html/createItem.html','utf8');
    res.setHeader('Content-Type','text/html');
    res.statusCode = 200;
    res.write(formData);
    res.write(todoHtml);
    res.end();
  }
  next();
}

const getAllItem = (req,res)=>{
  let allItem = JSON.stringify(req.user.getAllItem());
  res.write(allItem);
  res.end();
};

const deleteTodo = (req,res)=>{
  let status = req.user.deleteTodo(req.body.todoId);
  res.write(status.toString());
  app.users.saveData()
  res.end();
};

const updateItemStatus = (req,res)=>{
  let parsedIds = parseText(req.body.itemId,'_');
  let todoId = parsedIds[0];
  let itemId = req.body.itemId;
  req.user.updateItemStatus(todoId,itemId);
  app.users.saveData()
  res.end();
}

const deleteItem = (req,res)=>{
  let parsedIds = parseText(req.body.itemId,'_');
  let todoId = parsedIds[0];
  let itemId = req.body.itemId;
  let status = req.user.deleteItem(todoId,itemId);
  res.write(status.toString());
  app.users.saveData()
  res.end();
}

//=====================================================================
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req,res,next)=>app.logRequest(req,res,next));
app.use(loadUser);
app.use(redirectForbiddenUrlsToLogin);
app.use(redirectLoginUsersToHome);
app.use(express.static('public'));
app.use(todoRequestHandler);

app.get('/', homepage);
app.get('/login', loginPage);
app.get('/new', newTodoPage);

app.post('/login', checkUser);
app.post('/create', addItem);
app.post('/logout', logoutPage);
app.post('/createTodo', todoPage);
app.post('/getAllTodo',getAllTodo);
app.post('/getAllItem',getAllItem);
app.post('/deleteTodo',deleteTodo);
app.post('/updateItemStatus',updateItemStatus);
app.post('/deleteItem',deleteItem);

module.exports = app;
