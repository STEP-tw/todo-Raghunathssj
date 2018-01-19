let DefaultHandler = require('./DefaultHandler.js');
let getContentType = require('../../utility/utility.js').getContentType;
class StaticFileHandler extends DefaultHandler{
  constructor(root,fs) {
    super();
    this.root = root;
    this.fs = fs;
  }
  getFilePath(req){
    return `./${this.root}${req.url}`;
  }
  isFile(path){
    return this.fs.existsSync(path);
  }
  getExtention(path){
    return path.slice(path.lastIndexOf('.'))
  }
  execute(req,res){
    if(req.url == '/') return;
    let filePath = this.getFilePath(req);
    if(this.isFile(filePath)){
      res.statusCode = 200;
      res.setHeader('content-type',getContentType(this.getExtention(filePath)));
      let fileContent = this.fs.readFileSync(filePath);
      res.write(fileContent);
      res.end();
    }
  }
}

module.exports = StaticFileHandler;
