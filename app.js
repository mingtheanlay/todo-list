// Selector
const todoListItem = document.querySelectorAll(".todo-list-item");
const todoList = document.querySelector(".todo-list");
const buttonAddTodo = document.querySelector("#form-submit-button");
const inputTodo = document.querySelector(".form-text-input");
const todoAmount = document.querySelector("#amount");
const filterSelector = document.querySelector("#filter-todo");

// Event Listeners
buttonAddTodo.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterSelector.addEventListener("change", filterTodo);

setItemAmount();
loadToDoFromLocalStorage();
setItemAmount();

// Functions

function setItemAmount() {
  todoAmount.innerText = todoList.childElementCount;
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
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
        break;
      default:
        todo.style.display = "flex";
        break;
    }
  });
}

function addTodo(e) {
  e.preventDefault();
  if (inputTodo.value === "") {
    alert("Please enter a todo");
  } else {
    // Create div elements
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-list-item");

    // Create li elements
    const toDoListLi = document.createElement("li");
    toDoListLi.innerText = inputTodo.value;
    saveToLocalStorage(inputTodo.value);
    todoDiv.appendChild(toDoListLi);

    // Create checked icons
    const trashIcon = document.createElement("button");
    trashIcon.classList.add("check-button");
    trashIcon.innerHTML = '<i class="fas fa-check-square"></i>';
    todoDiv.appendChild(trashIcon);

    // Create trash  icons
    const checkedIcon = document.createElement("button");
    checkedIcon.classList.add("delete-button");
    checkedIcon.innerHTML = '<i class="fas fa-trash-alt"></i>';
    todoDiv.appendChild(checkedIcon);

    todoList.appendChild(todoDiv);

    inputTodo.value = "";

    // Counter
    setItemAmount();
  }
}

function loadToDoFromLocalStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    // Create div elements
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-list-item");

    // Create li elements
    const toDoListLi = document.createElement("li");
    toDoListLi.innerText = todo;
    todoDiv.appendChild(toDoListLi);

    // Create checked icons
    const trashIcon = document.createElement("button");
    trashIcon.classList.add("check-button");
    trashIcon.innerHTML = '<i class="fas fa-check-square"></i>';
    todoDiv.appendChild(trashIcon);

    // Create trash  icons
    const checkedIcon = document.createElement("button");
    checkedIcon.classList.add("delete-button");
    checkedIcon.innerHTML = '<i class="fas fa-trash-alt"></i>';
    todoDiv.appendChild(checkedIcon);

    todoList.appendChild(todoDiv);
  });
}

function deleteTodo(e) {
  e.preventDefault();
  const item = e.target;
  const todoItem = item.parentElement;

  // Deleted
  if (item.classList.contains("delete-button")) {
    todoItem.remove();
    // remove item from local storage
    removeFromLocalStorage(todoItem);
    todoAmount.innerText = todoList.childElementCount;
  } else if (item.classList.contains("check-button")) {
    todoItem.classList.toggle("completed");
  }
}

function saveToLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeFromLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  try {
    todos.forEach((todoItem, index) => {
      if (todoItem === todo.firstChild.innerText) {
        todos.splice(index, 1);
        throw "removed";
      }
    });
  } catch (e) {
    if (e !== "removed") throw e;
  }

  setItemAmount();
  localStorage.setItem("todos", JSON.stringify(todos));
}
