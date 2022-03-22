import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome To <span className="record-it-text">Record it</span></h1>
      <div className="containers">
        <div className="left-container">
          <h2>Add a new task</h2>
          <input type="text" className="input" placeholder="Enter you todo"/>
          <button className="add-task-button">Add Task</button>
        </div>
        <div className="right-container">
          <span className="">You have no tasks yet !</span>
        </div>
      </div>
    </div>
  );
}

export default App;
