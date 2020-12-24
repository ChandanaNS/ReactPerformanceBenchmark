import React, {Component} from 'react';
import '../App.css';

/*
Todo app structure
/*
Todo app structure
TodoApp
    - TodoHeader
    - TodoForm
	- TodoList
    - TodoListItem #1
		- TodoListItem #2
		  ...
		- TodoListItem #N
	
*/

class TodoHeader extends Component {
    render () {
      return <h1 className="heading">Todo list</h1>;
    } 
}  
 

class TodoForm extends Component {
    constructor(props) {
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
      this.refs.itemName.focus();
    }
    onSubmit(event) {
      event.preventDefault();
      var newItemValue = this.refs.itemName.value;
      
      if(newItemValue) {
        this.props.addItem({newItemValue});
        this.refs.form.reset();
      }
    }
    render () {
      return (
        <form ref="form" onSubmit={this.onSubmit} className="form-inline">
          <input type="text" ref="itemName" className="form-control"
              placeholder="What needs to be done today?" />  
          {/* <button type="submit" className="btn btn-primary">Add</button>  */}
        </form>
    //       <div className="container" ref="form">
    //     <input
    //     type="text"
    //     ref="itemName"
    //       id="textInput"
    //       placeholder="What needs to be done today?"
    //       onKeyUp={this.onSubmit}
    //     />   
    //   </div>
      );   
    }
  }
  
  
class TodoList extends Component {
  render () {
    var items = this.props.items.map((item, index) => {
      return (
        <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
      );
    });
    return (
      <ul className="list-group"> {items} </ul>
    );
  }
}
  
class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }
  onClickClose() {
    var index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  onClickDone() {
    var index = parseInt(this.props.index);
    this.props.markTodoDone(index);
  }
  render () {
    var todoClass = this.props.item.done ? 
        "done " : "undone",
        doneLineClass = this.props.item.done ? 
    "line-through " : " ",
    iconClass = this.props.item.done ? 
    "fas fa-check-circle circle" : "far fa-circle circle";

    return(
      <li className="list-group-item ">
            <i className={`${iconClass} ${todoClass}`} onClick={this.onClickDone}></i>
            <span className={`${doneLineClass} ${todoClass}`} > {this.props.item.value}</span>
          <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
      
      </li>     
    );
  }
}


class TodoApp extends Component {
  constructor (props) {
      super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = {todoItems: this.props.initItems};
  }
    addItem(todoItem) {
    this.state.todoItems.unshift({
      index: this.state.todoItems.length+1, 
      value: todoItem.newItemValue, 
      done: false
    });
    this.setState({todoItems: this.state.todoItems});
  }
  removeItem (itemIndex) {
    this.state.todoItems.splice(itemIndex, 1);
    this.setState({todoItems: this.state.todoItems});
  }
  markTodoDone(itemIndex) {
    var todo = this.state.todoItems[itemIndex];
    this.state.todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? this.state.todoItems.push(todo) : this.state.todoItems.unshift(todo);
    this.setState({todoItems: this.state.todoItems});  
  }
  render() {
    return (
        <div id="wrapper">
        <TodoHeader />
        <TodoForm addItem={this.addItem} />
        <TodoList items={this.props.initItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone}/>
        </div>
       
    );
  }
}

export default TodoApp;

