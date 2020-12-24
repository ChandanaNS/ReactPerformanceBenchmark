import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import TodoApp from "./components/Todo";
import reportWebVitals from "./reportWebVitals";

// function MyAPP() {
//   return <div>Hi</div>;
// }
// ReactDOM.render(<MyAPP />, document.getElementById("root"));

var todoItems = [];
todoItems.push({ index: 1, value: "learn react", done: true });
todoItems.push({ index: 2, value: "Revise Literature review", done: false });
todoItems.push({ index: 3, value: "Send mail", done: false });

ReactDOM.render(
  <TodoApp initItems={todoItems}></TodoApp>,
  document.getElementById("root")
);

// If you want to start measuring performance in your App, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
