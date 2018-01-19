const refresh = function(){
  location.reload();
}

const callback = function(){
  let allTodo = JSON.parse(this.responseText);
  let block = document.getElementById('todos');
  allTodo.forEach(todo=>{
    let para = document.createElement('p');
    let anchor= document.createElement('a');
    anchor.href = `todo${todo.id}`;
    anchor.innerText = todo.title;
    para.appendChild(anchor);
    let button = document.createElement('button');
    button.id = todo.id;
    button.innerText = 'delete';
    para.appendChild(button);
    block.appendChild(para);
  });
}

const sendRequest = function(method,url,callback,data){
  let xhr = new XMLHttpRequest();
  xhr.open(method,url);
  xhr.addEventListener('load',callback);
  xhr.send(data);
}

const getAllTodo = function(){
  sendRequest('post','/getAllTodo',callback,'');
}

window.onload = getAllTodo;
