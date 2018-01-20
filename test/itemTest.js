let chai = require('chai');
let assert = chai.assert;
const Item = require('../lib/models/item.js');

describe('Item',()=>{
  describe('getTitle',()=>{
    it('should return given title',()=>{
      let item = new Item('test',0);
      assert.equal(item.getTitle(),'test');
    })
  })
  describe('getStatus',()=>{
    it('should return false as default',()=>{
      let item = new Item('test',0);
      assert.equal(item.getStatus(),false);
    })
  })
  describe('updateStatus',()=>{
    it('should update the current status of the item',()=>{
      let item = new Item('test',0);
      item.updateStatus();
      assert.equal(item.getStatus(),true);
      item.updateStatus();
      assert.equal(item.getStatus(),false);
    })
  })
})
