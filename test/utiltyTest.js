const utility = require('../lib/utility/utility');
const assert = require('chai').assert;

describe('toS', () => {
  it('should return the string', () => {
    const string = JSON.stringify({name:"arvinds"},null,2);
    const expected = utility.toS({name:"arvinds"});
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
