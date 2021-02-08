function loadTodoList() {
  const todolist = document.querySelector("#todolist");
  const inputfieldul = document.querySelector("#inputfield");

  create_todolist();
}

let length = 3;
const todos = [
  {
    todo_id: 0,
    todo: "Wash the car",
    checked: false,
  },
  {
    todo_id: 1,
    todo: "Do grocery shopping",
    checked: false,
  },
  {
    todo_id: 2,
    todo: "Fix a (clientside) todo-list",
    checked: true,
  },
  {
    todo_id: 3,
    todo: "Try adding a new todo",
    checked: false,
  },
];

function create_todolist() {
  // create a row for each todo item
  var i = 0;
  todos.forEach(function (todo) {
    const newRow = create_row(todo["todo"], todo["todo_id"], todo["checked"]);
    todolist.append(newRow);
  });
  // Add the input field
  const row = document.createElement("div");
  row.setAttribute("class", "todo-row");
  const bullet = document.createElement("div");
  bullet.setAttribute("class", "todo-bullet");
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  bullet.append(checkbox);
  const input = document.createElement("div");
  input.setAttribute("class", "todo-input");
  const inputfield = document.createElement("input");
  inputfield.setAttribute("placeholder", "New todo");
  inputfield.setAttribute("name", "todo");
  inputfield.setAttribute("id", "newtodoinputfield");
  inputfield.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const newRow = create_row(inputfield.value, length + 1, false);
      length++;
      todolist.append(newRow);
      newRow.classList.add("appear");
      let newTodo = {
        todo_id: length,
        todo: inputfield.value,
        checked: false,
      };
      document.querySelector("#newtodoinputfield").value = "";
      todos.push(newTodo);
    }
  });
  const delete_todo = document.createElement("div");
  input.append(inputfield);
  row.append(bullet);
  row.append(input);
  row.append(delete_todo);
  document.querySelector("#inputfield").append(row);
}

function create_row(todo, todo_id, boolean) {
  const row = document.createElement("div");
  row.setAttribute("class", "todo-row");
  row.setAttribute("id", `todo${todo_id}`);
  const text = document.createElement("div");
  text.setAttribute("class", "todo-text");
  text.setAttribute("id", `text${todo_id}`);
  text.innerHTML = todo;
  const bullet = document.createElement("div");
  bullet.setAttribute("class", "todo-bullet");
  const checkbox = document.createElement("input");
  checkbox.setAttribute("data-todoid", todo_id);
  checkbox.setAttribute("id", `check${todo_id}`);
  checkbox.setAttribute("type", "checkbox");
  if (boolean) {
    checkbox.setAttribute("checked", true);
    text.classList.add("checked");
  }
  checkbox.addEventListener("change", function (e) {
    if (checkbox.checked) {
      todo_checked(this.dataset.todoid, true);
    } else {
      todo_checked(this.dataset.todoid, false);
    }
  });
  bullet.append(checkbox);
  const delete_todo = document.createElement("div");
  delete_todo.setAttribute("class", "todo-delete");
  delete_todo.setAttribute("data-todoid", todo_id);
  delete_todo.innerHTML = "x";
  delete_todo.addEventListener("click", function (e) {
    deletetodo(delete_todo.dataset.todoid);
  });
  row.append(bullet);
  row.append(text);
  row.append(delete_todo);
  return row;
}

function todo_checked(todoid, boolean) {
  const todo = todos[todoid];
  if (boolean) {
    todo.checked = true;
    document.querySelector(`#check${todoid}`).classList.add("checked");
    document.querySelector(`#text${todoid}`).classList.add("checked");
  } else {
    todo.checked = false;
    document.querySelector(`#check${todoid}`).classList.remove("checked");
    document.querySelector(`#text${todoid}`).classList.remove("checked");
  }
}

function deletetodo(todoid) {
  var todorow = document.querySelector(`#todo${todoid}`);
  todorow.classList.add("hide");
  todorow.addEventListener("animationend", () => todorow.remove());
  let i = 0;
  for (let todo of todos) {
    if (todo.todo_id === parseInt(todoid)) {
      todos.splice(i, 1);
    } else {
      i++;
    }
  }
}
