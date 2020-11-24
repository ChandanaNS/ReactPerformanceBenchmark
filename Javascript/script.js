var todoList = {
  todos: [
    {
      todoText: "JSTodo",
      completed: false,
    },
    {
      todoText: "Coding",
      completed: true,
    },
    {
      todoText: "Performance Check",
      completed: false,
    },
  ],
  addTodos(event) {
    // press enter to create a new todo
    const addTodoTextInput = document.getElementById("textInput");
    // if (event.keyCode === 13) {
    if (event.type === "keydown") {
      if (addTodoTextInput.value === "") {
        alert("Please add in a todo!");
      } else {
        this.todos.push({
          todoText: addTodoTextInput.value,
          completed: false,
        });
      }
      // Reseting to empty string after user input
      addTodoTextInput.value = "";
      view.displayTodos();
    }
  },
  changeTodos(position, newTodo) {
    this.todos[position].todoText = newTodo;
    view.displayTodos();
  },
  deleteTodos(position) {
    this.todos.splice(position, 1);
    view.displayTodos();
  },
  toggleCompleted(position) {
    this.todos[position].completed = !this.todos[position].completed;
    view.displayTodos();
  },
  // toggleAll() {
  //   const totalTodos = this.todos.length;
  //   let completedTodos = 0;
  //   // get number of completed todos

  //   this.todos.forEach(function (todo) {
  //     // === true shorthand
  //     if (todo.completed) {
  //       completedTodos++;
  //     }
  //   });
  //   // if everything is true make it false: toggles all completed to all uncompleted
  //   this.todos.forEach(function (todo) {
  //     if (totalTodos === completedTodos) {
  //       todo.completed = false;
  //       // otherwise make everything true: if some completed toggles all to completed
  //     } else {
  //       todo.completed = true;
  //     }
  //   });
  //   view.displayTodos();
  // },
};

view = {
  displayTodos() {
    const todoUl = document.querySelector("ul");
    // sets to 0 so doesnt keep adding extra bullet points again
    todoUl.innerHTML = "";
    todoList.todos.forEach(function (todo, position) {
      // make sure todoLi is inside for loop!
      const todoLi = document.createElement("li");
      const todoTextInput = document.createElement("input");
      todoTextInput.type = "text";
      todoTextInput.id = "todoTextInput";
      todoTextInput.disabled = true;
      todoTextInput.readOnly = true;
      if (todo.completed) {
        todoLi.innerHTML = '<i class="fas fa-check-circle" "circle"></i>';
        todoLi.className = "toggle list-group-item done";
        todoLi.appendChild(todoTextInput);
        todoLi.id = position;
        todoUl.appendChild(todoLi);
        todoTextInput.className = "done line-through";
        // strike through text when completed
        // const strikeThroughCompleted = document
        //   .getElementById(position)
        //   .querySelector("input");
        // strikeThroughCompleted.style.textDecoration = "line-through";
        // strikeThroughCompleted.style.opacity = "0.4";
      } else {
        todoLi.innerHTML = '<i class="far fa-circle" "circle"></i>';
        todoLi.className = "toggle";
        todoLi.id = position;
        todoLi.appendChild(todoTextInput);
        todoUl.appendChild(todoLi);
      }
      todoTextInput.value = todo.todoText;
      todoLi.appendChild(view.createDeleteButton());
      // view.todosToday();
    });
  },
  // todosToday() {
  //   // count how many completed todos there are
  //   completedTodos = 0;
  //   todoList.todos.forEach(function (todo) {
  //     if (todo.completed === false) {
  //       completedTodos++;
  //     }
  //   });
  //   const todosToday = document.getElementById("todosToday");
  //   if (completedTodos > 1) {
  //     todosToday.textContent = `you have ${completedTodos} tasks to complete today`;
  //   } else if (completedTodos === 1) {
  //     todosToday.textContent = "you have 1 more task to complete today";
  //   } else {
  //     todosToday.textContent =
  //       "congratulations! you have no tasks to complete!";
  //   }
  // },
  createDeleteButton() {
    const createButton = document.createElement("button");
    createButton.innerHTML = '<i class="fas fa-times"></i>';
    createButton.className = "deleteButton";
    return createButton;
  },
  eventListeners() {
    // Onload event listener

    const loadList = document.addEventListener("DOMContentLoaded", function (
      event
    ) {
      view.displayTodos();
    });

    // click to delete button
    const deleteButton = document.addEventListener("click", function (event) {
      const deleteButtonId = event.target.parentNode.parentNode.id;
      if (event.target.parentNode.className === "deleteButton") {
        todoList.deleteTodos(deleteButtonId);
        view.todosToday();
      }
    });
    // click to toggle
    const clickToToggle = document.addEventListener("click", function (event) {
      const toggleId = event.target.parentNode.id;
      if (event.target.nodeName === "I") {
        todoList.toggleCompleted(toggleId);
      }
    });
    // click to edit and enter to save
    const todoUl = document.querySelector("ul");
    todoUl.addEventListener("click", function (event) {
      const position = event.target.parentNode.id;
      if (event.target.tagName === "INPUT") {
        const input = document.getElementById(position).querySelector("input");
        input.disabled = false;
        input.className = "activeTextInput";
        input.focus();
        input.select();

        input.addEventListener("blur", function () {
          const newTodo = input.value;
          input.disabled = true;
          input.classList.remove("activeTextInput");
          todoList.changeTodos(position, newTodo);
        });
      }
    });
  },
};

view.eventListeners();
