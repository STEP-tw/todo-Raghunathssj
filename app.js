const fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const WebApp = require('./webapp');

let registered_users = [{userName:'raghu',password:'raghu',name:'Raghunath'}];

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


const redirectLoggedOutUserToLogin = (req,res)=>{
  if(req.urlIsOneOf(['/']) && !req.user) res.redirect('/login');
};

let app = WebApp.create();
app.use(logRequest);
app.use(loadUser);
app.use(redirectLoggedOutUserToLogin);
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

module.exports = app;
