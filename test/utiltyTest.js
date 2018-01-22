let utility = require('../lib/utility/utility');
let assert = require('chai').assert;
let loadUser = require('../app.js');

describe('toS', () => {
  it('should return the string', () => {
    let string = JSON.stringify({name:"arvinds"},null,2);
    let expected = utility.toS({name:"arvinds"});
    assert.deepEqual(expected,string);
  });
});

describe('getContentType', () => {
  it('should give extention of given file', () => {
    assert.equal(utility.getContentType('.html'),'text/html');
    assert.equal(utility.getContentType('.js'),'text/javascript');
    assert.equal(utility.getContentType('.jpg'),'base64');
  });
});

describe('parseText', () => {
  it('should parse text by given seperator', () => {
    assert.deepEqual(utility.parseText('0_0','_'),['0','0']);
    assert.deepEqual(utility.parseText('arvind%singh','%'),['arvind','singh']);
  });
});
