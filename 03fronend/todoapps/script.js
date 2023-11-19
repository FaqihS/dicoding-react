const todos = [];
const RENDER_EVENT = "render-todo";
document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addTodo();
  });

  const modalBtn = document.getElementById('modal-btn')
  modalBtn.addEventListener('click',toggleModal)

  document.addEventListener(RENDER_EVENT, function () {
    const uncompletedTodos = document.getElementById("todos");
    uncompletedTodos.innerHTML = "";

    const completedTodos = document.getElementById("completed-todos");
    completedTodos.innerHTML = "";
    for (const todoItem of todos) {
      const todoElement = makeTodo(todoItem);
      todoItem.isComplete
        ? completedTodos.append(todoElement)
        : uncompletedTodos.append(todoElement);
    }
  });



  document.addEventListener(SAVED_EVENT, function(){
    toggleModal()
  })
  loadDataFromStorage()
});
function toggleModal(){
  const modal = document.getElementsByClassName('modal')[0]
  modal.hasAttribute('hidden') ? modal.removeAttribute('hidden'): modal.setAttribute('hidden','')
}

function addTodo() {
  const textTodo = document.getElementById("title").value;
  const timestamp = document.getElementById("date").value;

  const generatedId = generateId();
  const todoObject = generateTodoObject(
    generatedId,
    textTodo,
    timestamp,
    false
  );
  todos.push(todoObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function generateTodoObject(id, task, timestamp, isComplete) {
  return { id, task, timestamp, isComplete };
}

function generateId() {
  return +new Date();
}

function makeTodo(todoObject) {
  const textTitle = document.createElement("h2");
  textTitle.innerText = todoObject.task;
  const textTimestamp = document.createElement("p");
  textTimestamp.innerText = todoObject.timestamp;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textTitle, textTimestamp);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);
  container.setAttribute("id", `todo-${todoObject.id}`);

  if (todoObject.isComplete) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("undo-button");

    undoButton.addEventListener("click", function () {
      undoTaskFromCompleted(todoObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");

    trashButton.addEventListener("click", function () {
      removeTaskFromCompleted(todoObject.id);
    });
    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");

    checkButton.addEventListener("click", function () {
      addTaskToCompleted(todoObject.id);
    });

    container.append(checkButton);
  }

  return container;
}

function findTodo(id) {
  for (const todoItem of todos) {
    if (todoItem.id === id) return todoItem;
  }

  return null;
}

function findTodoIndex(id) {
  for (const idx in todos) {
    if (todos[idx].id === id) return idx;
  }
  return -1;
}

function addTaskToCompleted(id) {
  const todoTarget = findTodo(id);
  if (todoTarget === null) return;
  todoTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function removeTaskFromCompleted(id) {
  console.log("THis");
  const todoIndex = findTodoIndex(id);
  console.log("idx", todoIndex);
  if (todoIndex === -1) return;

  todos.splice(todoIndex, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function undoTaskFromCompleted(id) {
  const todoTarget = findTodo(id);
  if (todoTarget === null) return;
  todoTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

const STORAGE_KEY = "TODO_APPS";
const SAVED_EVENT = "saved-todo";

function isStorageExist() {
  return typeof Storage !== "undefined";
}

function loadDataFromStorage(){
  if(!isStorageExist())return alert('Browser Cupu') 
  const serializedData = localStorage.getItem(STORAGE_KEY)
  let data = JSON.parse(serializedData)

  if(data !== null){
    for(const todo of data){
      todos.push(todo)
    }
  }
  document.dispatchEvent(new Event(RENDER_EVENT))
}
