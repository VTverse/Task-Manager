import React, { useState } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";

const TaskCard = ({ task, onComplete, onDelete }) => (
  <div className={`task-card ${task.completed ? "completed" : ""}`}>
    <h3>{task.name}</h3>
    <p>Priority: {task.priority}</p>
    <button onClick={() => onComplete(task.id)}>
      {task.completed ? "Undo" : "Complete Mission"}
    </button>
    <button onClick={() => onDelete(task.id)}>Abort Mission</button>
  </div>
);

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const HomePage = ({ tasks, setTasks }) => {
  const [filter, setFilter] = useState("All");

  const handleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) =>
          filter === "Completed" ? task.completed : !task.completed
        );

  return (
    <div className="home">
      <h1>Superhero Missions</h1>
      <div className="filters">
        <button onClick={() => setFilter("All")}>All Missions</button>
        <button onClick={() => setFilter("Completed")}>
          Accomplished Missions
        </button>
        <button onClick={() => setFilter("Incomplete")}>
          Pending Missions
        </button>
      </div>
      <div className="task-list">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onComplete={handleComplete}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Save the world", priority: "High", completed: false },
    { id: 2, name: "Rescue kittens", priority: "Medium", completed: true },
    {
      id: 3,
      name: "Stop meteor shower",
      priority: "Critical",
      completed: false,
    },
  ]);

  return (
    <Router>
      <div className="parallax">
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </div>
      <Routes>
        <Route
          path="/"
          element={<HomePage tasks={tasks} setTasks={setTasks} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
