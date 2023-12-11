import React, { useEffect, useRef, useState } from 'react';
import { useTodo } from './hooks/useTodo';
import toast, { Toaster } from 'react-hot-toast';
import Modal from './components/modal/Modal';
import { GlobalContext } from './hooks/useGlobalContext';
import { PaginationButtons } from './components/pagination/PaginationButtons';
import { TodoList } from './components/pagination/TodoList';
import { AddTodoForm } from './components/addTodoForm/AddTodoForm';
import './index.css';
import 'animate.css'

function App() {
  const { state, getTodo, deleteTodo, addTodo, updateTodo } = useTodo();
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({})
  const inputValue = useRef('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (state.data.length === 0) {
      getTodo();
    }
  }, [getTodo, state.data.length]);

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

  const editTodoHandler = (todo) => {
    setSelectedTodo(todo)
    setShowModal(true)
  }

  if (state.loading) {
    return <p>Loading...</p>;
  }

  if (state.error) {
    return <p>{state.error}</p>;
  }

  const pageSize = 10;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = state.data.slice(startIndex, endIndex);

  return (
    <GlobalContext.Provider value={{updateTodo, deleteTodo, editTodoHandler}} todos={state.data.length} >
      <div className='container'>
        <div className="App" >
          <AddTodoForm 
            addNewTodo={addNewTodo} 
            inputValue={inputValue}
          />
          <TodoList 
            paginatedData={paginatedData}
          />
          <PaginationButtons 
            setCurrentPage={setCurrentPage} 
            currentPage={currentPage}
          />
          <Modal 
            todo={selectedTodo} 
            show={showModal} 
            controlFunction={setShowModal} 
            endIndex={endIndex}
          />
          <Toaster />
        </div>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
