const sendRequest = function(method,url,callback,data){
  let xhr = new XMLHttpRequest();
  xhr.open(method,url);
  xhr.addEventListener('load',callback);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(data);
}

const refresh = function(){
  if(this.responseText == 'true'){
    location.reload();
  }
  return;
}

const viewTodos = function(){
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
    button.onclick = deleteTodo;
    button.innerText = 'delete';
    para.appendChild(button);
    block.appendChild(para);
  });
}

const deleteTodo = function(event){
  let todoId = event.target.id;
  sendRequest('POST','/deleteTodo',refresh,`todoId=${todoId}`);
}

const getAllTodo = function(){
  sendRequest('post','/getAllTodo',viewTodos,'');
}

window.onload = getAllTodo;
