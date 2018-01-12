const fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const WebApp = require('./webapp');

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

module.exports = app;
