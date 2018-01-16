class Item {
  constructor(description,id) {
    this.description = description;
    this.id = id;
  }
  toHtml(){
    return `<input type=checkbox value=item onclick= ${this.display}> ${this.description}`;
  }
  display(){
    alert('hello');
  }
  mark(){
    return `<p><strike> ${this.description} </strike><input id=${this.id}  class=item type=submit value=undone></p>`;
  }
}

module.exports = Item;
