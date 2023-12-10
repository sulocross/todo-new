import React from 'react'
import star1 from './../images/star1.png'
import star0 from './../images/star0.png'
import deleteBtn from './../images/deleteBtn.png'
import editBtn from './../images/editBtn.png'

export const TodoItem = ({todo, editTodoHandler, deleteTodo}) => {
    return (
        <div key={todo.id} className='todoList'>
            <div className='todoList-left'>
                <img className='todo-img' src='https://picsum.photos/1200/1200' alt='' />
            </div>
            <div className='todoList-middle'>
                <p className='todo-title'>{todo.title}</p>
                <p>anyemail@gmail.com</p>
                <p>Here's a location</p>
            </div>
            <div className='todo-stars'>
                <img className='star1' src={star1} alt=''/>
                <img className='star1' src={star1} alt=''/>
                <img className='star1' src={star1} alt=''/>
                <img className='star1' src={star1} alt=''/>
                <img className='star0' src={star0} alt=''/>
            </div>
            <div className='todoList-right'>
                <img src={editBtn} onClick={() => editTodoHandler(todo)} className='update-btn' alt=''/>
                <img src={deleteBtn} onClick={() => deleteTodo(todo.id)} className='delete-btn' alt=''/>
            </div>
        </div>
    )
}