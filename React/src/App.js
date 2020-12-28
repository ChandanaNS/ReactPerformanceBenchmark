import React, { Component } from "react";
import "./App.css";

import loremIpsum from "lorem-ipsum";

import { List } from "react-virtualized";

import { ListData } from "./constants/ListItems";

const rowCount = 1000;
const listHeight = 600;
const rowHeight = 50;
const rowWidth = 800;

class TodoHeader extends Component {
  render() {
    return (
      <header className="heading">
        <h1>React Todo list</h1>
      </header>
    );
  }
}
class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  state = {
    inputValue: "",
  };

  onSubmit(event) {
    console.log(event);
    event.preventDefault();
    var inputValue = this.state.inputValue;

    if (inputValue) {
      this.props.addItem(inputValue);
    }
  }
  handleChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };
  render() {
    const { inputValue } = this.state;
    return (
      <div>
        <form ref="form" onSubmit={this.onSubmit} className="form-inline">
          <input
            value={inputValue}
            className="form-control"
            onChange={this.handleChange}
            placeholder="What needs to be done today?"
          />
        </form>
      </div>
    );
  }
}

class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }
  componentWillReceiveProps() {
    this.refs.forceUpdateGrid();
  }
  renderRow({ index, key, style }) {
    var todoClass = this.props.todoItems[index].status ? "done " : "undone",
      doneLineClass = this.props.todoItems[index].status
        ? "line-through "
        : " ",
      iconClass = this.props.todoItems[index].status
        ? "fas fa-check-circle circle"
        : "far fa-circle circle";
    return (
      <div key={key} style={style} className="row " id={index}>
        <div className="content">
          <i
            className={`${iconClass} ${todoClass}`}
            onClick={this.onClickDone}
          ></i>
          <span className={`${doneLineClass} ${todoClass}`}>
            {" "}
            {this.props.todoItems[index].text}
          </span>
          <button type="button" className="close" onClick={this.onClickClose}>
            &times;
          </button>
        </div>
      </div>
    );
  }
  onClickClose = (e) => {
    console.log("Remove task ", e.target.offsetParent.id);
    var index = parseInt(e.target.offsetParent.id);
    this.props.removeItem(index);
  };
  onClickDone = (e) => {
    var index = parseInt(e.target.offsetParent.id);
    this.props.markTodoDone(index);
  };
  render() {
    return (
      <div className="list">
        <List
          width={rowWidth}
          height={listHeight}
          rowHeight={rowHeight}
          rowRenderer={this.renderRow}
          rowCount={this.props.todoItems.length}
          overscanRowCount={3}
          removeItem={this.props.removeItem}
          markTodoDone={this.props.markTodoDone}
          ref={(ref) => (this.refs = ref)}
        />
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = {
      todoItems: ListData.map((ListData, idx) => {
        return {
          id: idx,
          text: ListData.value,
          status: ListData.done,
        };
      }),
    };
  }

  addItem(todoItem) {
    this.state.todoItems.unshift({
      id: this.state.todoItems.length + 1,
      text: todoItem,
      status: false,
    });
    this.setState({ todoItems: this.state.todoItems });
  }
  removeItem(itemIndex) {
    this.state.todoItems.splice(itemIndex, 1);
    this.setState({ todoItems: this.state.todoItems });
  }
  markTodoDone(itemIndex) {
    var todo = this.state.todoItems[itemIndex];
    this.state.todoItems.splice(itemIndex, 1);
    todo.status = !todo.status;
    todo.status
      ? this.state.todoItems.push(todo)
      : this.state.todoItems.unshift(todo);
    this.setState({ todoItems: this.state.todoItems });
  }

  render() {
    return (
      <div className="App">
        <TodoHeader />
        <TodoForm addItem={this.addItem} />
        <TodoListItem
          todoItems={this.state.todoItems}
          removeItem={this.removeItem}
          markTodoDone={this.markTodoDone}
        />
      </div>
    );
  }
}

export default App;
