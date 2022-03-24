import React, { useState } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";
import Table from "./components/Table/Table";

function App() {
  const [todoItem, setTodoItem] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const [editingNow, setEditingNow] = useState(false);
  const [todoItemToEdit, setTodoItemToEdit] = useState(null);

  const onChangeHandler = (event) => {
    setTodoItem(event.target.value);
  };

  const addTodoItem = () => {
    let todo_id = uuid();
    if (todoItem.length == 0) return;
    setTodoItems([
      ...todoItems,
      {
        id: todo_id,
        title: todoItem,
        date: new Date().toUTCString(),
        done: false,
      },
    ]);
    setTodoItem("");
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
            <Table 
              todoItems={todoItems} 
              markAsDone={markAsDone}
              editingNow={editingNow}
              todoItemToEdit={todoItemToEdit}
              onCancelEditing={unSelectTodoItemToEdit}
              selectTodoItemToEdit={selectTodoItemToEdit}
              deleteTodoItem={deleteTodoItem}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
