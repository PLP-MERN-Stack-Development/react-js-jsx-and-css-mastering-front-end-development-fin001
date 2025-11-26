import React, { useState, useEffect, useContext } from 'react';
import Button from './Button';
import useLocalStorage from '../hooks/useLocalStorage';
import { ThemeContext } from '../context/ThemeContext';

/**
 * TaskManager component for managing tasks
 */
const TaskManager = () => {
  // Persist tasks using the shared useLocalStorage hook
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  // Local UI state
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all');

  // Theme from context (light / dark)
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Load saved tasks or perform side-effects on mount
  useEffect(() => {
    // This effect demonstrates a mount-time side effect (e.g., analytics or focus)
    // It also ensures that if storage contains tasks they are present in state.
    try {
      const saved = JSON.parse(localStorage.getItem('tasks') || '[]');
      if (saved.length && tasks.length === 0) {
        setTasks(saved);
      }
    } catch (e) {
      // ignore parse errors
    }
  }, []); // run only on mount

  // Derived list according to filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Add a new task
  const addTask = (text) => {
    if (text.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  // Toggle completion
  const toggleTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  // Delete task
  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTaskText);
    setNewTaskText('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Task Manager</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">{theme === 'dark' ? 'Dark' : 'Light'}</span>
          <Button variant="secondary" size="sm" onClick={toggleTheme} aria-label="Toggle theme">
            Toggle Theme
          </Button>
        </div>
      </div>

      {/* Task input form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <Button type="submit" variant="primary">
            Add Task
          </Button>
        </div>
      </form>

      {/* Filter buttons */}
      <div className="flex gap-2 mb-4">
        <Button variant={filter === 'all' ? 'primary' : 'secondary'} size="sm" onClick={() => setFilter('all')}>
          All
        </Button>
        <Button variant={filter === 'active' ? 'primary' : 'secondary'} size="sm" onClick={() => setFilter('active')}>
          Active
        </Button>
        <Button variant={filter === 'completed' ? 'primary' : 'secondary'} size="sm" onClick={() => setFilter('completed')}>
          Completed
        </Button>
      </div>

      {/* Task list */}
      <ul className="space-y-2">
        {filteredTasks.length === 0 ? (
          <li className="text-gray-500 dark:text-gray-400 text-center py-4">No tasks found</li>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className={`${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                  {task.text}
                </span>
              </div>
              <Button variant="danger" size="sm" onClick={() => deleteTask(task.id)} aria-label="Delete task">
                Delete
              </Button>
            </li>
          ))
        )}
      </ul>

      {/* Task stats */}
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        <p>{tasks.filter((task) => !task.completed).length} tasks remaining</p>
      </div>
    </div>
  );
};

export default TaskManager;