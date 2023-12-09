"use client"
import React from 'react'
import { useState } from 'react';
import { BiLayerPlus, BiSolidTrashAlt, BiEditAlt , BiNotepad, BiEdit   } from "react-icons/bi";
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
      <div className='border p-2 rounded-md shadow-md opacity-75'>
        <div className='flex w-full justify-center items-center gap-1 my-3'>
        <BiNotepad size={23} className='text-red-500'/>
      <h1 className='text-xl font-bold text-red-500'>Todo List</h1>
        </div>
  
    <div className='flex gap-1'>
      <input
        className='border p-2 rounded-l-md'
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Input task here.."
      />
      <button onClick={addTask} className='flex gap-1 justify-center items-center font-bold border p-2 rounded-r-md uppercase bg-blue-400 text-white'>
      <BiLayerPlus size={20} /> Add
        </button>
    </div>
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          {editingTaskId === task.id ? (
         
            <div className='w-full flex justify-between items-center gap-1 my-2'>
             <input
             className='border p-2  rounded-l-md w-full'
                type="text"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
              />
              <button onClick={updateTask} className='p-2 border bg-[coral] rounded-r-md uppercase font-bold text-white'>
                <BiEdit size={24}/>
              </button>
            </div>
             
        
          ) : (
        
            <div className='w-full border my-2 p-2 flex justify-between items-center shadow-sm'>
              <div className='flex gap-1'>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
             
              />
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? 'red' : 'black'
            }} className='font-bold opacity-70'>
                {task.taskName}
              </span>
              </div>
              <div className='flex gap-1 opacity-70'> 
              <button onClick={() => handleEdit(task.id, task.taskName)}><BiEditAlt color='blue'/></button>
              <span>/</span>
              <button onClick={() => deleteTask(task.id)}><BiSolidTrashAlt color='red' /></button>
              </div>
            </div>
         
          )}
        </li>
      ))}
    </ul>
      </div>
   
  </div>
  )
}
