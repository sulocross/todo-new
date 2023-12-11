import React from 'react'
import 'animate.css'
import { TodoItem } from './TodoItem';

export const TodoList = ({paginatedData}) => {
    return (
        <div>
            {paginatedData.map((todo) => {
                return (
                    <TodoItem 
                    todo={todo} key={todo.id} /> 
                );
            })}
        </div>
    )
}
