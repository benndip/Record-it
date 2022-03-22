import React, { useState } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";

function App() {
  const [todoItem, setTodoItem] = useState("");
  const [todoItems, setTodoItems] = useState([]);

  const onChangeHandler = (event) => {
    setTodoItem(event.target.value);
  };

  const addTodoItem = () => {
    let todo_id = uuid();
    setTodoItems([
      ...todoItems,
      {
        id: todo_id,
        title: todoItem,
        date: new Date().toUTCString(),
        done: false,
      },
    ]);
  };

  return (
    <div className="App">
      <h1>
        Welcome To <span className="record-it-text">Record it</span>
      </h1>
      <div className="containers">
        <div className="left-container">
          <h2>Add a new task</h2>
          <input
            onChange={onChangeHandler}
            name="todoItem"
            type="text"
            className="input"
            value={todoItem}
            placeholder="Enter your todo..."
          />
          <button onClick={addTodoItem} className="add-task-button">
            Add Task
          </button>
        </div>
        <div className="right-container">
          <span className="no-task-text">You have no tasks today 😀</span>
          <table>
            <thead>
              <tr>
                <th>Done</th>
                <th>Title</th>
                <th>Created On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                todoItems.map((todoItem) =>(
                  <tr>
                    <td>
                      <input type="checkbox" name="checkbox" value={todoItem.done} />
                    </td>
                    <td>{todoItem.title}</td>
                    <td>{todoItem.date}</td>
                    <td>
                      <button className="edit-button">Edit</button>
                      <button className="delete-button">Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
