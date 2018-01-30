const sendRequest = function(method,url,callback,data){
  const xhr = new XMLHttpRequest();
  xhr.open(method,url);
  xhr.addEventListener('load',callback);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(data);
};

const refresh = function(){
  if(this.responseText == 'true'){
    location.reload();
  }
  return;
};

const viewTodos = function(){
  const allTodo = JSON.parse(this.responseText);
  const block = document.getElementById('todos');
  allTodo.forEach((todo) => {
    const para = document.createElement('p');
    const anchor= document.createElement('a');
    anchor.href = `todo${todo.id}`;
    anchor.innerText = todo.title;
    para.appendChild(anchor);
    const button = document.createElement('button');
    button.id = todo.id;
    button.onclick = deleteTodo;
    button.innerText = 'delete';
    para.appendChild(button);
    block.appendChild(para);
  });
};

const deleteTodo = function(event){
  const todoId = event.target.id;
  sendRequest('POST','/deleteTodo',refresh,`todoId=${todoId}`);
};

const getAllTodo = function(){
  sendRequest('post','/getAllTodo',viewTodos,'');
};

window.onload = getAllTodo;
