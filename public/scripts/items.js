const sendRequest = function(method,url,callback,data){
  const xhr = new XMLHttpRequest();
  xhr.open(method,url);
  xhr.addEventListener('load',callback);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(data);
};
const refresh = function(){
  document.getElementById('item').innerText = '';
  location.reload();
};

const loadPage = function(){
  if(this.responseText){
    document.getElementById('item').innerText = '';
    location.reload();
  }
  return;
};

const showMessage = function(){
  document.getElementById('message').innerText = 'Item required';
};

const addTodoItem = function(){
  const item = document.getElementById('item').value;
  const todoId = location.pathname.match(/[\d]+$/);
  if(!item){
    showMessage();
    return;
  }
  const data = `todoId=${todoId}&item=${item}`;
  sendRequest('post','/addTodoItem',refresh,data);
};

const getAllItem = function(){
  const todoId = location.pathname.match(/[\d]+$/);
  sendRequest('post','/getAllItem',viewTodoItems,`todoId=${todoId}`);
};

const updateStatus = function() {
  const itemId = event.target.id;
  sendRequest('post','/updateItemStatus',refresh,`itemId=${itemId}`);
};

const deleteItem = function(event){
  const itemId = event.target.id;
  sendRequest('POST','/deleteItem',loadPage,`itemId=${itemId}`);
};

const saveItem = () => {
  const id = event.target.id;
  const text = document.getElementById(id).parentElement.childNodes[0].value;
  const data = `id=${id}&text=${text}`;
  sendRequest('post','/editItem',refresh,data);
};

const appendButton = function(parent,id,text,callback) {
  const button = document.createElement('button');
  button.id = id;
  button.onclick = callback;
  button.innerText = text;
  parent.appendChild(button);
  return parent;
};

const saveTodoDesc = () => {
  const id = event.target.id;
  const text = document.getElementById(id).parentElement.childNodes[0].value;
  const data = `id=${id}&text=${text}`;
  sendRequest('post','/editTodoDesc',refresh,data);
};

const editTodoDesc = () => {
  const parent = event.target.parentElement;
  const desc = parent.childNodes[0].innerText.split(': ')[1];
  const id = location.pathname.match(/[\d]+$/);
  let span = document.createElement('span');
  const form = document.createElement('input');
  form.value = desc;
  span.appendChild(form);
  span = appendButton(span,id,'save',saveTodoDesc);
  span = appendButton(span,id,'cancel',refresh);
  parent.parentElement.replaceChild(span,parent);
};

const saveTodoTitle = () => {
  const id = event.target.id;
  const text = document.getElementById(id).parentElement.childNodes[0].value;
  const data = `id=${id}&text=${text}`;
  sendRequest('post','/editTodoTitle',refresh,data);
};

const editTodoTitle = () => {
  const parent = event.target.parentElement;
  const title = parent.childNodes[0].innerText.split(': ')[1];
  const id = location.pathname.match(/[\d]+$/);
  let span = document.createElement('span');
  const form = document.createElement('input');
  form.value = title;
  span.appendChild(form);
  span = appendButton(span,id,'save',saveTodoTitle);
  span = appendButton(span,id,'cancel',refresh);
  parent.parentElement.replaceChild(span,parent);
};

const editItem = () => {
  const id = event.target.id;
  const item = document.getElementsByClassName(id)[0];
  const para = item.parentElement;
  const parent = para.parentElement;
  let newPara = document.createElement('p');
  const form = document.createElement('input');
  form.value = item.innerText;
  newPara.appendChild(form);
  newPara = appendButton(newPara,id,'save',saveItem);
  newPara = appendButton(newPara,id,'cancel',refresh);  
  parent.replaceChild(newPara,para);
};

const viewTodoItems = function(){
  const allTodo = JSON.parse(this.responseText);
  const block = document.getElementById('items');
  allTodo.forEach((item) => {
    let para = document.createElement('p');
    const span = document.createElement('span');
    span.innerText = item.title;
    span.className = item.id;
    para.appendChild(span);
    para.id = item.id;
    const statusButton = document.createElement('button');
    statusButton.id = item.id;
    statusButton.onclick = updateStatus;
    statusButton.innerText = item.statusType;
    item.status ? para.style= 'text-decoration: line-through' : para.style= 'text-decoration: none';
    para.appendChild(statusButton);
    para = appendButton(para,item.id,'delete',deleteItem);
    para = appendButton(para,item.id,'edit',editItem);
    block.appendChild(para);
  });
};

window.onload = getAllItem;
