"use client"
import React from 'react'
import { useState } from 'react';
export default function Todolist() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), taskName: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleEdit = (id, taskName) => {
    setEditingTaskId(id);
    setEditedTask(taskName);
  };

  const updateTask = () => {
    const updatedTasks = tasks.map(task =>
      task.id === editingTaskId ? { ...task, taskName: editedTask } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditedTask('');
  };

  return (
    <div className='bg-white h-screen w-screen flex justify-center items-center flex-col text-black'>
    <h1>Todo List</h1>
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a task and press Enter"
      />
      <button onClick={addTask}>Add</button>
    </div>
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          {editingTaskId === task.id ? (
            <>
              <input
                type="text"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
              />
              <button onClick={updateTask}>Update</button>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.taskName}
              </span>
              <button onClick={() => handleEdit(task.id, task.taskName)}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  </div>
  )
}
