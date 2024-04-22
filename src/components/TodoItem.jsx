import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoItem({ todo }) {
  const [canEdit, setCanEdit] = useState(false)
  const [msg, setmsg] = useState(todo.todo)
  const {updateTodo, deleteTodo, completeTodo} = useTodo()

  const editTodo = () => {
    updateTodo(todo.id, {...todo, todo: msg})
    setCanEdit(false)
  }
  const completedTodo = () => {
    completeTodo(todo.id)
  }

  return (
      <div
          className={`flex border-b border-black/10  px-3 py-1.5 gap-x-3 duration-300  text-black ${
              todo.completed ? "bg-[#a5d1ff] rounded-md" : "bg-white"
          }`}
      >
          <input
              type="checkbox"
              className="cursor-pointer"
              checked={todo.completed}
              onChange={completedTodo}
          />
          <input
              type="text"
              className={`border-b border-black/10 outline-none w-full bg-transparent ${
                  canEdit ? "border-black/10 px-2" : "border-transparent"
              } ${todo.completed ? "line-through" : ""}`}
              value={msg}
              onChange={(e) => setmsg(e.target.value)}
              readOnly={!canEdit}
          />
          {/* Edit, Save Button */}
          <button
              className="inline-flex w-8 h-8 rounded-md text-mg border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
              onClick={() => {
                  if (todo.completed) return;

                  if (canEdit) {
                      editTodo();
                  } else setCanEdit((prev) => !prev);
              }}
              disabled={todo.completed}
          >
              {canEdit ? "📁" : "✏️"}
          </button>
          {/* Delete Todo Button */}
          <button
              className="inline-flex w-8 h-8 rounded-md text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
              onClick={() => deleteTodo(todo.id)}
          >
              ❌
          </button>
      </div>
  );
}

export default TodoItem;
