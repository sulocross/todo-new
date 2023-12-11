import React, { useRef } from 'react'
import { useGlobalContext } from '../../hooks/useGlobalContext'

export const TodoItem = ({todo}) => {

    const {deleteTodo, editTodoHandler} = useGlobalContext()

    const todoItemRef = useRef(null)

    const todoDeleteHandler = (id) => {
        todoItemRef.current.classList.add('todoList-delete')
        setTimeout(()=> {deleteTodo(id)}, 800)
    }

    return (
        <div key={todo.id} className='todoList' ref={todoItemRef}>
                <p className='todo-title'>{todo.title}</p>
            <div className='todoList-right'>
                <i className='bx bxs-pencil update-btn' onClick={() => editTodoHandler(todo)}></i>
                <i className='bx bxs-trash-alt delete-btn' onClick={() => todoDeleteHandler(todo.id)}></i>
            </div>
        </div>
    )
}