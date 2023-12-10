import React from 'react'

export const AddTodoForm = ({addNewTodo, inputValue}) => {
    return (
        <form onSubmit={addNewTodo} className='add-container'>
            <label className='add-title'>Create new task</label>
            <input type='text' placeholder='Enter Todo' ref={inputValue} className='add-input' />
            <button type="submit" className='add-btn' >Add Task</button>
        </form>
    )
}
