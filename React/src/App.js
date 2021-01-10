import React, { Component } from "react";
import "./App.css";
import { List } from "react-virtualized";
import { ListData } from "./constants/ListItems";
/*
**
Todo app structure
**
TodoApp
  - TodoHeader
  - TodoForm
	- TodoListItem
    -List
*/
const listHeight = 600,
  rowHeight = 50,
  rowWidth = 800;

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
    event.preventDefault();
    var inputValue = this.state.inputValue;
    if (inputValue) {
      this.props.addItem(inputValue);
      this.setState({
        inputValue: "",
      });
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
  // Updates the list after status change
  UNSAFE_componentWillReceiveProps() {
    this.refs.forceUpdateGrid();
  }
  // RENDERS each list item to the List component based on the viewport
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
    var index = parseInt(e.target.offsetParent.id, 10);
    this.props.removeItem(index);
  };
  onClickDone = (e) => {
    var index = parseInt(e.target.offsetParent.id, 10);
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

  // adding new list, triggered from TodoListItem component
  addItem(todoItem) {
    this.state.todoItems.unshift({
      id: this.state.todoItems.length + 1,
      text: todoItem,
      status: false,
    });
    this.setState({ todoItems: this.state.todoItems });
  }
  // deleting item from a list, triggered from TodoListItem component
  removeItem(itemIndex) {
    this.state.todoItems.splice(itemIndex, 1);
    this.setState({ todoItems: this.state.todoItems });
  }

  // Changing the status that is marking done/undone, triggered from TodoListItem component
  markTodoDone(itemIndex) {
    // shallow copy
    let items = [...this.state.todoItems],
      item = { ...items[itemIndex] };
    item.status = !this.state.todoItems[itemIndex].status;
    items[itemIndex] = item;
    this.setState({ todoItems: items });
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
