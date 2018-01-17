const fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const WebApp = require('./webapp');
const User = require('./public/scripts/user.js');
const _userData = JSON.parse(fs.readFileSync('./data/_usersData.json'));

let currentUser = {};
let registered_users = [{userName:'raghu',password:'raghu',name:'Raghunath'}];
let _users = [];

let logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});

  console.log(`${req.method} ${req.url}`);
}
let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};

const getPath = function(url) {
  let path = './public'+url;
  return path;
};

const isFile = function(path){
  try {
    let stats = fs.statSync(path);
    return stats.isFile();
  } catch (error) {
    return false;
  }
}

const respondWithStatus = function(req,res,path,contentType) {
  if(req.method== 'GET' && isFile(path)){
  let content = fs.readFileSync(path);
  res.setHeader('content-Type',contentType);
  res.statusCode = 200;
  res.write(content);
  res.end();
  }
  return;
};

const getContentType = function(extention) {
  let contentTypes = {
    '.html':'text/html',
    '.jpg':'base64',
    '.gif':'base64',
    '.css':'text/css',
    '.js':'text/javascript',
    '.ico':'base64',
    '.pdf':'application/pdf'
  }
  return contentTypes[extention];
};

const serveFile = function(req,res) {
  let path = getPath(req.url);
  let extention = path.slice(path.lastIndexOf('.'));
  let contentType = getContentType(extention);
  respondWithStatus(req,res,path,contentType);
};

let toS = o=>JSON.stringify(o,null,2);

const storeUserData = function(fileData,prevData,newData){
  fileData.find((data,i,arr)=>{
    if(data==prevdata)
      arr[i]=newData;
  });
  return;
}

const createUserTodos = function(userName){
  let user = _users.find(u=>u.user==userName)
  if(!user){
    user = new User(userName);
    _users.push(user);
  }
  return user;
}

const getData = function(path,message){
  let content = fs.readFileSync(path,'utf8');
  content = content.replace(/message/,message);
  return content;
}

const respondWithMsg = function(req,res,file){
  let content = '';
  let path = `./public${file}`;
  if(req.cookies.message)
    content = getData(path,req.cookies.message);
  else
    content = getData(path,'');
  res.statusCode = 200;
  res.write(content);
  res.end();
  return;
};

let forbiddenUrls = ['/','/create','/todoList','/html/new.html','/createItem', '/logout'];

const redirectForbiddenUrlsToLogin = (req,res)=>{
  if(req.urlIsOneOf(forbiddenUrls) && !req.user) res.redirect('/login');
};

const redirectLoginUsersToHome = (req,res)=>{
  if(req.urlIsOneOf(['/login']) && req.user) res.redirect('/');
}

const redirectUsersWithoutTodoToHome = (req,res)=>{
  let _users = fs.readFileSync('./data/_usersData.json');
  _user = JSON.parse(_users);
  let user = _users.find(u=>req.user && u.user == req.user.name);
  if(req.urlIsOneOf(['/todoList']) && !user) res.redirect('/');
}

const homepage = (req,res)=>{
  let home = fs.readFileSync('./public/html/index.html','utf8');
  home = home.replace(/userName/,`welcome ${req.user.name}`);
  res.statusCode = 200;
  res.write(home);
  res.end();
  return;
};

const loginPage = (req,res)=>{
  respondWithMsg(req,res,'/html/login.html');
  return;
};

const checkUser = (req,res)=>{
  let user = registered_users.find(u=>u.userName==req.body.userName && u.password == req.body.password);
  if(!user) {
    res.setHeader('Set-Cookie',`message=login failed; Max-Age=5`);
    res.redirect('/login');
    return;
  }
  currentUser = createUserTodos(user);
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/');
};

const addItem = (req,res)=>{
  let item = req.body.item;
  currentUser.makeItem(item);
  res.statusCode = 200;
  res.end();
};

const todoPage = (req,res)=>{
  let title = req.body.title;
  if(!title){
    res.setHeader('Set-Cookie',`message=Title required; Max-Age=5`)
    res.redirect('/new');
    return;
  }
  let description = req.body.description;
  currentUser.makeTODO(title,description);
  res.statusCode = 200;
  res.setHeader('Content-Type','text/html');
  res.write(fs.readFileSync('./public/html/createTodo.html'));
  res.end();
};

const newTodoPage = (req,res)=>{
  respondWithMsg(req,res,'/html/new.html');
};

const todoList = (req,res)=>{
  res.statusCode = 200;
  res.setHeader('Content-Type','text/plain');
  res.write(currentUser.getTodosHtml());
  res.end();
};

const logoutPage = (req,res)=>{
  fs.writeFileSync('./public/scripts/storeitems.js','');
  res.setHeader('Set-Cookie',`sessionid=0; Max-Age=5`);
  delete req.user.sessionid;
  res.redirect('/login');
};

const showItems = (req,res)=>{
  res.statusCode = 200;
  res.setHeader('Content-Type','text/html');
  let html = currentUser.getItemsHtml();
  html = JSON.stringify(html);
  let data = `var html = ${html}`;
  fs.writeFileSync('./public/scripts/storeitems.js',data);
  res.write(fs.readFileSync('./public/html/createTodo.html'));
  res.end();
};

//=====================================================================
let app = WebApp.create();
app.use(logRequest);
app.use(loadUser);
app.use(redirectForbiddenUrlsToLogin);
app.use(redirectLoginUsersToHome);
app.use(serveFile);

app.get('/',homepage);
app.get('/login',loginPage);
app.post('/login',checkUser);
app.post('/createItem',addItem);
app.get('/createItem',showItems);
app.get('/new',newTodoPage)
app.post('/create',todoPage);
app.get('/todoList',todoList);
app.post('/logout',logoutPage);

module.exports = app;
