class Item {
  constructor(title,id) {
    this.title = title;
    this.id = id;
    this.statusType = 'undone';
    this.status = false;
  }
  getTitle(){
    return this.title;
  }
  getStatus(){
    return this.status;
  }
  updateStatus(){
    this.status ? this.statusType= 'done': this.statusType='undone';
    this.status = !this.status;
  }
  updateTitle(text){
    this.title = text;
  }
}
module.exports = Item;
