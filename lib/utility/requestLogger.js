let toS = require('./utility.js').toS;
const timeStamp = require('./time.js').timeStamp;
exports.create = (path,fs)=>{
  return (req,res,next)=>{
    let text = ['------------------------------',
      `${timeStamp()}`,
      `${req.method} ${req.url}`,
      `HEADERS=> ${toS(req.headers)}`,
      `COOKIES=> ${toS(req.cookies)}`,
      `BODY=> ${toS(req.body)}`, ''
    ].join('\n');
    fs.appendFile(path, text, (err) => {});
    next();
  }
};
