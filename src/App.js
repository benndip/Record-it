import React, { useState } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";

function App() {
  const [todoItem, setTodoItem] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const [editingNow, setEditingNow] = useState(false);
  const [todoItemToEdit, setTodoItemToEdit] = useState(null);
  const [todoDuration, setTodoDuration] = useState('');

  const onChangeHandler = (event) => {
    if(event.target.name === "todoItem" ) setTodoItem(event.target.value);
    if(event.target.name === "todoDuration" ) setTodoDuration(event.target.value);
  };

  const addTodoItem = () => {
    let todo_id = uuid();
    if (todoItem.length === 0 && todoDuration.length === 0) return;
    setTodoItems([
      ...todoItems,
      {
        id: todo_id,
        title: todoItem,
        date: new Date().toUTCString(),
        done: false,
        duration:todoDuration
      },
    ]);
    setTodoItem("");
    setTodoDuration("");
  };

  const markAsDone = (todoItemId) => {
    let newTodoItems = todoItems.map((todoItem) =>
      todoItem.id === todoItemId
        ? { ...todoItem, done: !todoItem.done }
        : todoItem
    );
    setTodoItems(newTodoItems);
  };

  const deleteTodoItem = (todoItemId) => {
    let newTodoItems = todoItems.filter(
      (todoItem) => todoItem.id !== todoItemId
    );
    setTodoItems(newTodoItems);
  };

  const selectTodoItemToEdit = (todoItemId) => {
    let todoItemToEdit = todoItems.find(
      (todoItem) => todoItem.id === todoItemId
    );
    setTodoItem(todoItemToEdit.title);
    setTodoItemToEdit(todoItemToEdit);
    setEditingNow(true);
  };

  const unSelectTodoItemToEdit = () => {
    setTodoItem("");
    setEditingNow(false);
    setTodoItemToEdit(null);
  };

  const updateTodoItem = () => {
    let newTodoItems = todoItems.map((item) =>
      item.id === todoItemToEdit.id ? { ...item, title: todoItem } : item
    );
    setTodoItems(newTodoItems);
    setTodoItem("");
    setEditingNow(false);
    setTodoItemToEdit(null);
  };

  return (
    <div className="App">
      <h1>
        Welcome To <span className="record-it-text">Record it</span>
      </h1>
      <div className="containers">
        <div className="left-container">
          {!editingNow ? <h2>Add a new task</h2> : <h2>Update task</h2>}
          <input
            onChange={onChangeHandler}
            name="todoItem"
            type="text"
            className="input"
            value={todoItem}
            placeholder="Enter your todo..."
          />
          <input
            onChange={onChangeHandler}
            name="todoDuration"
            type="text"
            className="input"
            value={todoDuration}
            placeholder="Time to complete todo"
          />
          {!editingNow ? (
            <button onClick={addTodoItem} className="add-task-button">
              Add Task
            </button>
          ) : (
            <button onClick={updateTodoItem} className="update-task-button">
              Update Task
            </button>
          )}
        </div>
        <div className="right-container">
          {todoItems.length === 0 && (
            <span className="no-task-text">You have no tasks today 😀</span>
          )}
          {todoItems.length > 0 && (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Done</th>
                    <th>Title</th>
                    <th>Created On</th>
                    <th>Actions</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {todoItems.map((todoItem) => (
                    <tr className={todoItem.done ? "checked" : ""}>
                      <td>
                        <input
                          type="checkbox"
                          checked={todoItem.checked}
                          onChange={() => markAsDone(todoItem.id)}
                        />
                      </td>
                      <td>{todoItem.title}</td>
                      <td>{todoItem.date}</td>
                      <td>
                        {editingNow && todoItem.id === todoItemToEdit.id ? (
                          <button
                            onClick={unSelectTodoItemToEdit}
                            className="cancel-button"
                          >
                            Cancel
                          </button>
                        ) : (
                          <button
                            onClick={() => selectTodoItemToEdit(todoItem.id)}
                            className="edit-button"
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => deleteTodoItem(todoItem.id)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </td>
                      <td>{todoItem.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
