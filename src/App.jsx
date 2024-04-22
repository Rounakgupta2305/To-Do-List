import { useState, useEffect } from 'react'
import {TodoContextProvider} from './contexts/TodoContext'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => { 
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const completeTodo = (id) => {
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  
  return (
    <TodoContextProvider value={{todos, addTodo, updateTodo, deleteTodo, completeTodo}}>
      <div className="bg-[#a5d1ff] min-h-screen py-8">
        
        <h1 className="text-8xl  text-center mb-8 mt-2 font-thin text-white">To-Do List</h1>
          
        <div className="w-full max-w-2xl mx-auto shadow-md bg-white rounded-md px-3 py-3 text-white mb-5">
          <TodoForm />
        </div>

        <div className="flex flex-wrap gap-y-3 ">
          {todos.map((todo) => (
            <div key={todo.id}
            className='w-full w-full max-w-2xl mx-auto shadow-md bg-white rounded-md px-4 py-3 text-white'
            >
              <TodoItem todo={todo} />
            </div>
          ))} 
        </div>
      </div>
    </TodoContextProvider>
  )
}

export default App