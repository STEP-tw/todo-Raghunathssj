const sendRequest = function(method,url,callback,data){
  let xhr = new XMLHttpRequest();
  xhr.open(method,url);
  xhr.addEventListener('load',callback);
  xhr.send(data);
};
const refresh = function(){
  document.getElementById('item').innerText = '';
  location.reload();
}

const showMessage = function(){
  document.getElementById('message').innerText = 'Item required';
}

const create = function(){
  let item = document.getElementById('item').value;
  if(!item){
    showMessage();
    return;
  }
  let data = `item=${item}`;
  sendRequest('post','/create',refresh,data);
};

const getAllItem = function(){
  sendRequest('post','/getAllItem',viewTodoItems,'');
};

const updateStatus = function() {
  let itemId = event.target.id;
  sendRequest('post','/updateItemStatus',refresh,`itemId=${itemId}`);
}



const viewTodoItems = function(){
  let allTodo = JSON.parse(this.responseText);
  let block = document.getElementById('items');
  allTodo.forEach(item=>{
    let para = document.createElement('p');
    para.innerText = item.title;
    para.id = item.id;
    let statusButton = document.createElement('button');
    statusButton.id = item.id;
    if(!item.status){
      statusButton.innerText = "undone";
      para.style= 'text-decoration: none';
    }
    else{
      statusButton.innerText = "done";
      para.style= 'text-decoration: line-through';
    }
    statusButton.onclick = updateStatus;
    para.appendChild(statusButton);
    let deleteButton = document.createElement('button');
    deleteButton.id = item.id;
    deleteButton.innerText = 'delete';
    para.appendChild(deleteButton);
    block.appendChild(para);
  });
}

window.onload = getAllItem;
