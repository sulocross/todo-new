import React from 'react'

export const PaginatedData = ({paginatedData, editTodoHandler, deleteTodo}) => {
    return (
        <div>
            {paginatedData.map((todo) => {
                return (
                <div key={todo.id} className='todoList'>
                    <p className='todoTitle'>{todo.title}</p>
                    <button onClick={() => editTodoHandler(todo)} className='update-btn' >
                    Edit
                    </button>
                    <button onClick={() => deleteTodo(todo.id)} className='delete-btn' >Delete</button>
                </div>
                );
            })}
        </div>
    )
}
