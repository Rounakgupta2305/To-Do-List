import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function todoForm() {
    const [todo, setTodo] = useState("")
    const {addTodo} = useTodo()

    const add = (e) => {
      e.preventDefault()

      if (!todo) return

      addTodo({ todo, completed: false})
      setTodo("")
    }

  return (
      <form onSubmit={add}  className="flex">
          <input
              type="text"
              placeholder="Write To do..."
              className="w-full border-b border-black/10 rounded-l-md px-3 text-gray-700 outline-none duration-150 bg-white/20 py-0.5"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit" className="rounded-r-md px-3 py-1 bg-[#a5d1ff] text-white shrink-0">
              Add
          </button>
      </form>
  );
}

export default todoForm;