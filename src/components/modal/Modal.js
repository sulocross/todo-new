import './modal.css'
import { useRef } from 'react'
import { useGlobalContext } from "../../hooks/useGlobalContext"
import toast from 'react-hot-toast'

const Modal = ({todo, show, controlFunction}) => {
    
    const style = !show ? {display: "none"} : {}

    const inputValue = useRef(todo.title)

    const {updateTodo} = useGlobalContext()

    const updateTodoHandler = () => {
        let title = inputValue.current.value
        if(!title.trim()){
            toast.error("Title can't be empty")
            return
        }
        updateTodo({...todo, title})
        controlFunction(false)
    }

    return (
        <div className="modal" style={style}>
            <div className="modal-content">
                <h2>Updated Todo</h2>
                <input className='modal-input' defaultValue={todo.title} ref={inputValue} />
                <button onClick={updateTodoHandler} className='modal-upd-btn'>Update</button>
                <button className='modal-close-btn' onClick={()=>controlFunction(false)}>✖</button>
            </div>
            
        </div>
    )
}

export default Modal