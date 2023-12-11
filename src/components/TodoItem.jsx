import React from 'react'
import deleteBtn from './../images/deleteBtn.png'
import editBtn from './../images/editBtn.png'
import { useGlobalContext } from '../hooks/useGlobalContext'

export const TodoItem = ({todo}) => {

    const {deleteTodo, editTodoHandler} = useGlobalContext()

    return (
        <div key={todo.id} className='todoList'>
                <p className='todo-title'>{todo.title}</p>
            <div className='todoList-right'>
                <img src={editBtn} onClick={() => editTodoHandler(todo)} className='update-btn' alt=''/>
                <img src={deleteBtn} onClick={() => deleteTodo(todo.id)} className='delete-btn' alt=''/>
            </div>
        </div>
    )
}