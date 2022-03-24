import React from "react";
import "./Table.css";

const Table = ({ todoItems, markAsDone, editingNow, todoItemToEdit, onCancelEditing, selectTodoItemToEdit, deleteTodoItem }) => {
  return (
    <div className="table-container">
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
                    onClick={onCancelEditing}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
