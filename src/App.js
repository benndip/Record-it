import React, { useState, useEffect } from 'react';
import './App.css';
import { v4 as uuid } from 'uuid';


function App() {

  const [todoItem, setTodoItem] = useState('');
  const [todoItems, setTodoItems] = useState([]);

  const onChangeHandler = (event) => {
    setTodoItem(event.target.value);
  }

  const addTodoItem = () => {
    let todo_id = uuid();
    setTodoItems([...todoItems, { id: todo_id, title: todoItem, date: new Date().toUTCString(), done: false }]);
    console.log(todoItems);
  }

  return (
    <div className="App">
      <h1>Welcome To <span className="record-it-text">Record it</span></h1>
      <div className="containers">
        <div className="left-container">
          <h2>Add a new task</h2>
          <input onChange={onChangeHandler} name="todoItem" type="text" className="input" value={todoItem} placeholder="Enter your todo..."/>
          <button onClick={addTodoItem} className="add-task-button">Add Task</button>
        </div>
        <div className="right-container">
          <span className="no-task-text">You have no tasks today 😀</span>
        </div>
      </div>
    </div>
  );
}

export default App;
