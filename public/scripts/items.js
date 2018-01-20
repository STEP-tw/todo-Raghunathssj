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

const loadPage = function(){
  if(this.responseText){
    document.getElementById('item').innerText = '';
    location.reload();
  }
  return;
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
  sendRequest('post','/updateItemStatus',loadPage,`itemId=${itemId}`);
}

const deleteItem = function(event){
  let itemId = event.target.id;
  sendRequest('POST','/deleteItem',loadPage,`itemId=${itemId}`);
}

const appendDeleteButtonToPara = function(para,id){
  let deleteButton = document.createElement('button');
  deleteButton.id = id;
  deleteButton.onclick = deleteItem;
  deleteButton.innerText = 'delete';
  para.appendChild(deleteButton);
  return para;
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
    para = appendDeleteButtonToPara(para,item.id);
    block.appendChild(para);
  });
}

window.onload = getAllItem;
