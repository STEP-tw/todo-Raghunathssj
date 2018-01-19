class Item {
  constructor(title,id) {
    this.title = title;
    this.id = id;
    this.status = false;
  }
  getTitle(){
    return this.title;
  }
  getStatus(){
    return this.status;
  }
  updateStatus(){
    this.status = !this.status;
  }
}
module.exports = Item;
