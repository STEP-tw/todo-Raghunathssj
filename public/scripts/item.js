const Item = function(description,id) {
  this.description = description;
  this.id = id;
};

Item.prototype = {
  toHtml: function(){
    return `<div id=${this.id} onclick=></div><br>`;
  },
  mark: function(){
    return `<p><strike> ${this.description} </strike><input id=${this.id}  class=item type=submit value=undone></p>`;
  }
}

module.exports = Item;
