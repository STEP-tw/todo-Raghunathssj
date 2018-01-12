const fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const WebApp = require('./webapp');
const User = require('./public/scripts/user.js');

let registered_users = [{userName:'raghu',password:'raghu',name:'Raghunath'}];
let _users = [];

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

const storeUserData = function(fileData,prevData,newData){
  fileData.find((data,i,arr)=>{
    if(data==prevdata)
      arr[i]=newData;
  });
  return;
}

const redirectLoggedOutUserToLogin = (req,res)=>{
  if(req.urlIsOneOf(['/']) && !req.user) res.redirect('/login');
};

const redirectUsersWithoutTodoToHome = (req,res)=>{
  let _users = fs.readFileSync('./data/_users.json');
  _user = JSON.parse(_users);
  let user = _users.find(u=>req.user && u.user == req.user.name);
  if(req.urlIsOneOf(['/todoList']) && !user) res.redirect('/');
}

let app = WebApp.create();
app.use(logRequest);
app.use(loadUser);
app.use(redirectLoggedOutUserToLogin);
app.use(redirectUsersWithoutTodoToHome);
app.use(serveFile);

app.get('/',(req,res)=>{
  let home = fs.readFileSync('./public/html/index.html','utf8');
  home = home.replace(/userName/,`welcome ${req.user.name}`);
  res.statusCode = 200;
  res.write(home);
  res.end();
})

app.get('/login',(req,res)=>{
  res.statusCode = 200;
  res.write(fs.readFileSync('./Public/html/login.html'));
  res.end();
});

app.post('/login',(req,res)=>{
  let user = registered_users.find(u=>u.userName==req.body.userName && u.password == req.body.password);
  if(!user) {
    res.setHeader('Set-Cookie',`message=login failed; Max-Age=5`);
    res.redirect('/login');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/');
})

app.post('/create',(req,res)=>{
  let _users = fs.readFileSync('./data/_users.json');
  _user = JSON.parse(_users);
  let user = _users.find(u=>u.user==req.user.name);
  if(!user){
    user = new User(req.user.name);
  }
  let prevData = user;
  user.makeTODO();
  storeUserData(_user,prevData,user);
  let html = `<h1><a href="/"><<</a>TODO</h1> <br> <form action="/logout"method="post"><input type="submit" name="logout" value="logout"></form>`;
  res.statusCode = 200;
  res.setHeader('Content-Type','text/html');
  res.write(html);
  res.end();
})

app.post('/todoList',(req,res)=>{
  let _users = fs.readFileSync('./data/_users.json');
  _user = JSON.parse(_users);
  let user = _users.find(u=>u.user == req.user.name);
  return user.getTodos;
})

app.post('/logout',(req,res)=>{
  res.setHeader('Set-Cookie',`sessionid=0; Max-Age=5`);
  delete req.user.sessionid;
  res.redirect('/login');
})
module.exports = app;
