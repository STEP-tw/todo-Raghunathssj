const create = function(){
  let request = new XMLHttpRequest();
  request.open("POST",'/createItem');
  let item = document.getElementById('item').value;
  request.send(`item=${item}`);
  window.location.href = '/createItem';
}
