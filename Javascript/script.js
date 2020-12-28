var todoList = {
  todos: ListData,
  addTodos(event) {
    // press enter to create a new todo
    var addTodoStart = performance.now();
    const addTodoTextInput = document.getElementById("textInput");
    if (event.type === "keydown") {
      if (addTodoTextInput.value === "") {
        alert("Please add in a todo!");
      } else {
        this.todos.unshift({
          index: this.todos.length + 1,
          value: addTodoTextInput.value,
          done: false,
        });
      }
      // Reseting to empty string after user input
      addTodoTextInput.value = "";
      view.displayTodos();
    }
    var addTodoEnd = performance.now();
    console.log(
      "addTodos::: Create new Todo:: " +
        (addTodoEnd - addTodoStart) +
        " milliseconds."
    );
  },
  // changeTodos(position, newTodo) {
  //   var changeTodoStart = performance.now();
  //   this.todos[position].todoText = newTodo;
  //   view.displayTodos();
  //   var changeTodoEnd = performance.now();
  //   console.log(
  //     "changeTodos::: " + (changeTodoEnd - changeTodoStart) + " milliseconds."
  //   );
  // },
  deleteTodos(position) {
    var deleteTodoStart = performance.now();
    this.todos.splice(position, 1);
    view.displayTodos();
    var deleteTodoEnd = performance.now();
    console.log(
      "deleteTodos::: " + (deleteTodoEnd - deleteTodoStart) + " milliseconds."
    );
  },

  toggleCompleted(position) {
    var toggleCompletedStart = performance.now();
    this.todos[position].done = !this.todos[position].done;
    view.displayTodos();
    var toggleCompletedEnd = performance.now();
    console.log(
      "toggleCompleted ::: " +
        (toggleCompletedEnd - toggleCompletedStart) +
        " milliseconds."
    );
  },
  toggleAll() {
    var toggleAllStart = performance.now();
    const totalTodos = this.todos.length;
    let completedTodos = 0;
    // get number of completed todos

    this.todos.forEach(function (todo) {
      // === true shorthand
      if (todo.done) {
        completedTodos++;
      }
    });
    // if everything is true make it false: toggles all completed to all uncompleted
    this.todos.forEach(function (todo) {
      if (totalTodos === completedTodos) {
        todo.done = false;
        // otherwise make everything true: if some completed toggles all to completed
      } else {
        todo.done = true;
      }
    });
    view.displayTodos();
    var toggleAllEnd = performance.now();
    console.log(
      "toggleAll:::" + (toggleAllEnd - toggleAllStart) + " milliseconds."
    );
  },
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
      if (todo.done) {
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
      todoTextInput.value = todo.value;
      todoLi.appendChild(view.createDeleteButton());
      view.todosToday();
    });
  },
  todosToday() {
    // count how many completed todos there are
    completedTodos = 0;
    todoList.todos.forEach(function (todo) {
      if (todo.done === false) {
        completedTodos++;
      }
    });
    const todosToday = document.getElementById("todosToday");
    if (completedTodos > 1) {
      todosToday.textContent = `you have ${completedTodos} tasks to complete today`;
    } else if (completedTodos === 1) {
      todosToday.textContent = "you have 1 more task to complete today";
    } else {
      todosToday.textContent =
        "congratulations! you have no tasks to complete!";
    }
  },
  createDeleteButton() {
    const createButton = document.createElement("button");
    createButton.innerHTML = '<i class="fas fa-times"></i>';
    createButton.className = "deleteButton";
    return createButton;
  },
  eventListeners() {
    // Onload event listener
    var t2 = performance.now();
    const loadList = document.addEventListener(
      "DOMContentLoaded",
      function (event) {
        view.displayTodos();
      }
    );
    var t3 = performance.now();
    console.log(
      "EventListerner::: DOMContentLoaded :: " + (t3 - t2) + " milliseconds."
    );

    // click to delete button
    var t4 = performance.now();
    const deleteButton = document.addEventListener("click", function (event) {
      const deleteButtonId = event.target.parentNode.parentNode.id;
      if (event.target.parentNode.className === "deleteButton") {
        todoList.deleteTodos(deleteButtonId);
        view.todosToday();
      }
    });
    var t5 = performance.now();
    console.log(
      "EventListerner::: Click:: Delete :: " + (t5 - t4) + " milliseconds."
    );
    // click to toggle
    var t6 = performance.now();
    const clickToToggle = document.addEventListener("click", function (event) {
      const toggleId = event.target.parentNode.id;
      if (
        event.target.nodeName === "I" &&
        !event.target.classList.contains("fa-times")
      ) {
        todoList.toggleCompleted(toggleId);
      }
    });
    var t7 = performance.now();
    console.log(
      "EventListerner::: Click:: Toggle row :: " + (t7 - t6) + " milliseconds."
    );

    // click to edit and enter to save
    var t6 = performance.now();
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
    var t7 = performance.now();
    console.log(
      "EventListerner::: Edit and save::" + (t7 - t6) + " milliseconds."
    );
  },
};

var t0 = performance.now();
view.eventListeners();
var t1 = performance.now();
console.log("Event Triggered ::: " + (t1 - t0) + " milliseconds.");
