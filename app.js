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

app.get('/',(req,res)=>{
  res.statusCode = 200;
  res.write("");
  res.end();
});

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
