import React from 'react'
import 'animate.css'
import { TodoItem } from '../TodoItem';

export const TodoList = ({paginatedData, editTodoHandler, deleteTodo, todo}) => {
    return (
        <div>
            {paginatedData.map((todo) => {
                return (
                    <TodoItem 
                    editTodoHandler={editTodoHandler} 
                    deleteTodo={deleteTodo} 
                    todo={todo} /> 
                );
            })}
        </div>
    )
}
