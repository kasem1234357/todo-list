//Select DOM
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
let y = true;
// add event 

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);
function addTodo(e){
    e.preventDefault();
   // createElement
    const todoBox = document.createElement('div');
    todoBox.classList.add('todo');

   //create list
    const listEl = document.createElement('li');
    listEl.textContent = todoInput.value;
    todoBox.appendChild(listEl);
    // called local save function
    localSave(todoInput.value);
   //create buttons
   //create check button 
   const checkButton = document.createElement('button');
   checkButton.classList.add('complete-btn');
   checkButton.innerHTML = `<i class="fas fa-check"></i>`;
   todoBox.appendChild(checkButton);
   // create delete button
   const delButton = document.createElement('button');
   delButton.classList.add('trash-btn');
   delButton.innerHTML = `<i class="fas fa-trash"></i>`;
   todoBox.appendChild(delButton);
   // create edit button
   const editButton = document.createElement('button');
   editButton.classList.add('edit-btn');
   editButton.innerHTML = `<i class="fas fa-edit"></i>`;
   todoBox.appendChild(editButton);
   todoList.appendChild(todoBox);
   todoInput.value = '';
}
  function deleteTodo(e)
  {
    const item = e.target;
    if (item.classList[0] == 'trash-btn')
    {
      const bigItem = item.parentElement;
      console.log(bigItem);
      console.log('delete button');
      bigItem.classList.add('fall');
      localDelete(bigItem);
      bigItem.addEventListener("transitionend", e => {
          bigItem.remove();
          });
    }
    if (item.classList[0] == 'complete-btn')
    {
      const bigItem = item.parentElement;
      bigItem.classList.toggle('completed');
    }
    if (item.classList[0] == 'edit-btn')
    {
      console.log('ghh');
      const bigItem = item.parentElement;
      if
      (y){bigItem.classList.add('edited');}
      else {bigItem.classList.remove('edited');}
      edit(bigItem);
    }
  }
  function filterTodo(e)
  {
     const allTodo = todoList.childNodes;
     console.log(allTodo);
     allTodo.forEach(todo => {
      switch (e.target.value) {
         case "all":
           todo.style.display = "flex";
           break;
           case "completed":
         if (todo.classList.contains("completed")) {
           todo.style.display = "flex";
         } else {
           todo.style.display = "none";
         }
         break;
       case "uncompleted":
         if (!todo.classList.contains("completed")) {
           todo.style.display = "flex";
         } else {
           todo.style.display = "none";
         }
     }
     })
  }
  function getTodos()
  {
   let todos;
   if (localStorage.getItem("todos") === null) {
     todos = [];
   } else {
      console.log(todos);
     todos = JSON.parse(localStorage.getItem("todos"));
     console.log(todos);
   }
     todos.forEach(todo => {
      const todoBox = document.createElement('div');
      todoBox.classList.add('todo');
      //create list
      const listEl = document.createElement('li');
      listEl.textContent = todo;
      todoBox.appendChild(listEl);
   
      //create buttons
      //create check button 
      const delButton = document.createElement('button');
      delButton.classList.add('complete-btn');
      delButton.innerHTML = `<i class="fas fa-check"></i>`;
      todoBox.appendChild(delButton);
      // create delete button
      const checkButton = document.createElement('button');
      checkButton.classList.add('trash-btn');
      checkButton.innerHTML = `<i class="fas fa-trash"></i>`;
      todoBox.appendChild(checkButton);
      const editButton = document.createElement('button');
   editButton.classList.add('edit-btn');
   editButton.innerHTML = `<i class="fas fa-edit"></i>`;
   todoBox.appendChild(editButton);
      todoList.appendChild(todoBox);
     })
  }
  function localSave(todo)
  {
      let todos; // build variable for put element in local storage
         if (localStorage.getItem("todos") === null) {  // check if nothing in local storage convert the variable to array for you can use  array propirty
    todos = [];
    console.log(`this empty todos : ${todos}`)
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));// just get  element  from local storage for add new item
    console.log(`this  todos : ${todos}`)
  }
  todos.push(todo);  // add new item
  localStorage.setItem("todos", JSON.stringify(todos)); // refrech local storage and convert to string
} 
  function localDelete (todo)
  {
   let todos = [];
   todos = JSON.parse(localStorage.getItem("todos"));
   console.log(todo);
   const todoIndex = todo.children[0].innerText;
   console.log(todoIndex);
   todos.splice(todos.indexOf(todoIndex), 1);
   localStorage.setItem("todos", JSON.stringify(todos));

  }
  function edit (el)
  {
    el.children[0].innerHTML = `<input class = 'x' type = 'text' value = ${el.children[0].textContent}>`;
    let x2 = document.querySelector('.x');
    console.log(x2.getAttribute('value'));
   if(y)
   {
      
   x2.addEventListener('change', () => {
      todos = JSON.parse(localStorage.getItem("todos"));
   const todoIndex = el.children[0].innerText;
      todos.splice(todos.indexOf(todoIndex), 1,x2.value);
      el.children[0].textContent = x2.value
   localStorage.setItem("todos", JSON.stringify(todos));
   window.location.reload();
   })
   }
  }
 
