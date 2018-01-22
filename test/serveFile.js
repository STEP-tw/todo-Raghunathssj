let ServeFile = require('../lib/models/serveFile');
let assert = require('chai').assert;
let fs = {existsSync:(path)=>{
  return path == './public/index.html'
},
readFileSync:(path)=>{
  if(path=='./public/index.html')
  return '<h2>hello<h2>';
}};

describe('ServeFile', () => {
  beforeEach(()=>{
    serveFile = new ServeFile('public',fs);
  })
  describe('#getFilePath', () => {
    it('should return file path of give filename', () => {
      let req = {url : '/index.html'}
      let filePath = serveFile.getFilePath(req);
      assert.equal(filePath,'./public/index.html');
    });
  });
  describe('#isFile', () => {
    it('should return true if the file exists', () => {
      let req = {url : './public/index.html'};
      assert.ok(serveFile.isFile(req.url));
      assert.notOk(serveFile.isFile('/hello.html'));      
    });
  });
  describe('#getExtention', () => {
    it('should return extention of given file', () => {
      let req = {url : '/index.html'}
      let extention = serveFile.getExtention(req.url);
      assert.equal(extention,'.html');
      assert.equal(serveFile.getExtention('/man.js'),'.js');      
    });
  });
  describe('#execute', () => {
    it('should give the content of given file path', () => {
      let req = {url : '/index.html'};
      let type = {};
      let postData = '';
      let res = {
      setHeader:(key,value)=>{
        type[key] = value;
      },
      write:(data)=>{
        postData += data;
      },
      end : ()=>{
        return;
      }
    }
    serveFile.execute(req,res);
    assert.deepEqual(type,{'content-type':'text/html'})
    assert.deepEqual(postData,'<h2>hello<h2>');  
    });
  });
});