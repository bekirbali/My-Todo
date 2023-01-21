const search = document.getElementById("search");
const form = document.querySelector("form");
const ul = document.querySelector(".u-list");
const pluralSpan = document.getElementById("plural");
const searchDiv = document.querySelector(".magnifyer-input");

//* buttons
const searchBtn = document.getElementById("btn-search");
const addBtn = document.getElementById("btn-add");
const addBtn2 = document.getElementById("btn-add2");

//* input
const input = document.getElementById("todo");

let todoListLocalStorage =
  JSON.parse(localStorage.getItem("todoListLocalStorage")) || [];

window.addEventListener("load", () => {
  getItemFromLocal();
  input.focus();
});

const getItemFromLocal = () => {
  todoListLocalStorage.forEach((todo) => createTodo(todo));
};

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!input.value) {
    alert("Please enter a text");
    return;
  }
  let newTodo = {
    id: new Date().getTime(),
    completed: false,
    todoName: input.value,
  };
  createTodo(newTodo);
  todoListLocalStorage.push(newTodo);
  localStorage.setItem(
    "todoListLocalStorage",
    JSON.stringify(todoListLocalStorage)
  );
  e.target.closest("form").reset();
});
addBtn2.addEventListener("click", (e) => {
  e.preventDefault();
  if (!input.value) {
    alert("Please enter a text");
    return;
  }
  let newTodo = {
    id: new Date().getTime(),
    completed: false,
    todoName: input.value,
  };
  createTodo(newTodo);
  todoListLocalStorage.push(newTodo);
  localStorage.setItem(
    "todoListLocalStorage",
    JSON.stringify(todoListLocalStorage)
  );
  e.target.closest("form").reset();
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let text = search.value.toLowerCase();
  const items = ul.getElementsByTagName("p");
  Array.from(items).map((p) => {
    let filter = p.firstChild.textContent;
    if (filter.indexOf(text) !== -1) {
      p.parentElement.style.display = "flex";
    } else {
      p.parentElement.style.display = "none";
    }
  });
});

ul.addEventListener("click", (e) => {
  remove(e);
  checked(e);
});

const createTodo = (newTodo) => {
  //! Creating Text

  const { id, completed, todoName } = newTodo;
  const newLi = document.createElement("li");
  newLi.setAttribute("id", id);
  if (completed) {
    newLi.classList.add("checked");
  } else {
    ("");
  }
  let task = document.createElement("p");
  const liText = document.createTextNode(todoName);
  task.appendChild(liText);
  //! ***********

  //! Creating check icon
  const checkIcon = document.createElement("i");
  checkIcon.setAttribute("class", "fas fa-check");
  //! ***********

  //! Creating delete icon
  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-trash");
  //! ***********

  newLi.appendChild(checkIcon);
  newLi.appendChild(task);
  newLi.appendChild(deleteIcon);
  ul.prepend(newLi);
  input.focus();
  plural();
};

searchDiv.addEventListener("click", () => {
  search.focus();
});

const plural = () => {
  if (ul.childElementCount > 1) {
    pluralSpan.style.display = "inline-block";
  } else {
    pluralSpan.style.display = "none";
  }
};

const remove = (e) => {
  const idAttr = e.target.closest("li").getAttribute("id");
  if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.remove();
    todoListLocalStorage = todoListLocalStorage.filter(
      (todo) => todo.id != idAttr
    );
    localStorage.setItem(
      "todoListLocalStorage",
      JSON.stringify(todoListLocalStorage)
    );
  }
  plural();
};

const checked = (e) => {
  const idAttr = e.target.closest("li").getAttribute("id");
  if (e.target.classList.contains("fa-check")) {
    e.target.parentElement.classList.toggle("checked");
    todoListLocalStorage.map((todo) => {
      if (todo.id == idAttr) {
        todo.completed = !todo.completed;
      }
      localStorage.setItem(
        "todoListLocalStorage",
        JSON.stringify(todoListLocalStorage)
      );
    });
  }
};
