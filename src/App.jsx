import React from 'react';

import ToDoList from './components/TodoComponents/TodoList';
import ToDoForm from './components/TodoComponents/TodoForm';
import './components/TodoComponents/Todo.css';

class App extends React.Component {
  // you will need a place to store your state in this component.
  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state

  constructor(){
    super();
    this.state = {
      toDos: this.loadTasks() || [
        {
          task: 'Take Charli to the Groomer',
          id: 777,
          completed: false
        },
        {
          task: 'Change the antifreeze in the Jaguar',
          id: 420,
          completed: false
        },
        {
          task: 'Change the antifreeze in the Escalade',
          id: 13,
          completed: false
        },
        {
          task: 'Fix the gutter at the corner of the kitchen at Aunt Eleanor\'s',
          id: 24,
          completed: false
        },
        {
          task: 'Groceries for the week',
          id: 18,
          completed: false
        }
      ],
      toDo: ''
    };
  }

  loadTasks = () => {
    try {
      const tasks = JSON.parse(localStorage.getItem("everyday-todos"));
      return Array.isArray(tasks) && tasks.every(t => t && typeof t.task === "string" && typeof t.completed === "boolean") ? tasks : null;
    } catch { return null; }
  };
  componentDidUpdate() {
    try { localStorage.setItem("everyday-todos", JSON.stringify(this.state.toDos)); }
    catch { if (!this.state.storageWarning) this.setState({storageWarning: "Your browser cannot save tasks. Keep this tab open to retain your list."}); }
  }
  addToDo = event => {
    event.preventDefault();
    if (!this.state.toDo.trim()) return;
    const newToDo = { task: this.state.toDo.trim(), completed: false, id: Date.now() };
    this.setState({
      toDos: [...this.state.toDos, newToDo],
      toDo: ''
    });
  };

  changeToDo = e => this.setState({[e.target.name]: e.target.value});

  toggleToDoComplete = id => {
    let toDos = this.state.toDos.slice();
    toDos = toDos.map(toDo => {
      if(toDo.id === id){
        toDo.completed = !toDo.completed;
        return toDo;
      }else{
        return toDo;
      }
    });
    this.setState({toDos});
  };

  clearCompletedToDos = event => {
    event.preventDefault();
    let toDos = this.state.toDos.filter(toDo => !toDo.completed);
    this.setState({toDos});
  };

  

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>My{" "}{" "}{" "} Everyday{" "}{" "}{" "} ToDo{" "}{" "}{" "} List!</h1>
        </div>
        {this.state.storageWarning && <p role="alert">{this.state.storageWarning}</p>}
        <div className="form">
          <ToDoForm 
            value={this.state.toDo}
            handleToDoChange={this.changeToDo}
            handleAddToDo={this.addToDo}
            handleClearToDos={this.clearCompletedToDos}
          />
        </div>
        <ToDoList 
          handleToggleComplete={this.toggleToDoComplete}
          toDos={this.state.toDos}
        />
      </div>
    );
  }
}
export default App;