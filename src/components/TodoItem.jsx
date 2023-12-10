import React from 'react'

export const TodoItem = ({todo, editTodoHandler, deleteTodo}) => {
    return (
        <div key={todo.id} className='todoList'>
            <p className='todoTitle'>{todo.title}</p>
            <button onClick={() => editTodoHandler(todo)} className='update-btn' >
                Edit
            </button>
            <button onClick={() => deleteTodo(todo.id)} className='delete-btn' >Delete</button>
        </div>
    )
}
