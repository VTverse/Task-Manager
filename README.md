# Task-Manager
// Superhero Task Tracker App
// This project uses React.js with hooks, React Router, and PropTypes.

// 1. Basic Setup
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';

// 2. Components
const TaskCard = ({ task, onComplete, onDelete }) => (
  <div className={`task-card ${task.completed ? 'completed' : ''}`}>
    <h3>{task.name}</h3>
    <p>Priority: {task.priority}</p>
    <button onClick={() => onComplete(task.id)}>{task.completed ? 'Undo' : 'Complete'} Mission</button>
    <button onClick={() => onDelete(task.id)}>Abort Mission</button>
  </div>
);

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const HomePage = ({ tasks, setTasks }) => {
  const [filter, setFilter] = useState('All');

  const handleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = filter === 'All' 
    ? tasks 
    : tasks.filter(task => filter === 'Completed' ? task.completed : !task.completed);

  return (
    <div className="home">
      <h1>Superhero Missions</h1>
      <div className="filters">
        <button onClick={() => setFilter('All')}>All Missions</button>
        <button onClick={() => setFilter('Completed')}>Accomplished Missions</button>
        <button onClick={() => setFilter('Incomplete')}>Pending Missions</button>
      </div>
      <div className="task-list">
        {filteredTasks.map(task => (
          <TaskCard key={task.id} task={task} onComplete={handleComplete} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

HomePage.propTypes = {
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
};

const TaskDetailPage = ({ task }) => (
  <div className="task-detail">
    <h2>{task.name}</h2>
    <p>Priority: {task.priority}</p>
    <p>Status: {task.completed ? 'Mission Accomplished' : 'In Progress'}</p>
  </div>
);

TaskDetailPage.propTypes = {
  task: PropTypes.object.isRequired,
};

// 3. Main App
const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Save the world', priority: 'High', completed: false },
    { id: 2, name: 'Rescue kittens', priority: 'Medium', completed: true },
    { id: 3, name: 'Stop meteor shower', priority: 'Critical', completed: false },
  ]);

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage tasks={tasks} setTasks={setTasks} />} />
        <Route
          path="/task/:id"
          element={
            <TaskDetailPage
              task={tasks.find(task => task.id === parseInt(window.location.pathname.split('/').pop()))}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

// App.css
/* Basic styles for the superhero vibe */
body {
  font-family: 'Comic Sans MS', cursive, sans-serif;
  background: #f4f4f4;
  margin: 0;
  padding: 0;
}

task-card {
  background: #fff;
  margin: 10px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

task-card.completed {
  background: #d4edda;
}

nav {
  background: #007bff;
  color: white;
  padding: 10px;
  text-align: center;
}
