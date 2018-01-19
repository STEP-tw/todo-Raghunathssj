let toS = require('./utility.js').toS;
let DefaultHandler = require('../models/DefaultHandler.js');
const timeStamp = require('./time.js').timeStamp;
class Log extends DefaultHandler{
  constructor(path, fs) {
    super();
    this.path = path;
    this.fs = fs;
  }
  execute(req, res) {
    let text = ['------------------------------',
      `${timeStamp()}`,
      `${req.method} ${req.url}`,
      `HEADERS=> ${toS(req.headers)}`,
      `COOKIES=> ${toS(req.cookies)}`,
      `BODY=> ${toS(req.body)}`, ''
    ].join('\n');
    this.fs.appendFile(this.path, text, (err) => {});
  }
}

module.exports = Log;
