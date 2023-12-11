import {useRef} from 'react'
import toast from 'react-hot-toast';
import { useGlobalContext } from '../../hooks/useGlobalContext';

export const AddTodoForm = () => {

    const {addTodo} = useGlobalContext()

    const inputValue = useRef(null)

    const addNewTodo = (e) => {
        e.preventDefault();
        const title = inputValue.current.value.trim();
        if (!title) {
            toast.error("Title can't be empty!");
            return;
        }
        addTodo(title);
        toast.success('New task has been added successfully!')
        inputValue.current.value = '';
    };
    
    return (
        <form onSubmit={addNewTodo} className='add-container'>
            <label className='add-title'>Create new task</label>
            <input type='text' placeholder='Enter Todo' ref={inputValue} className='add-input' />
            <button type="submit" className='add-btn' >Add Task</button>
        </form>
    )
}
