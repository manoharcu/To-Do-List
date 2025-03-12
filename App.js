import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Add a new task
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, isEditing: false }]);
      setNewTask("");
    }
  };

  // Delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  // Enable editing for a task
  const editTask = (index) => {
    const updatedTasks = tasks.map((task, taskIndex) =>
      taskIndex === index ? { ...task, isEditing: true } : task
    );
    setTasks(updatedTasks);
  };

  // Update a task
  const updateTask = (index, updatedText) => {
    const updatedTasks = tasks.map((task, taskIndex) =>
      taskIndex === index ? { text: updatedText, isEditing: false } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1 className="App-header">To-Do List</h1>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            {task.isEditing ? (
              <input
                type="text"
                defaultValue={task.text}
                onBlur={(e) => updateTask(index, e.target.value)}
                autoFocus
                className="task-edit-input"
              />
            ) : (
              <>
                <span onClick={() => editTask(index)}>{task.text}</span>
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
