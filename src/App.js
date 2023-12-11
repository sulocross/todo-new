import React, { useEffect, useState } from 'react';
import { useTodo } from './hooks/useTodo';
import { Toaster } from 'react-hot-toast';
import Modal from './components/modal/Modal';
import { GlobalContext } from './hooks/useGlobalContext';
import { PaginationButtons } from './components/pagination/PaginationButtons';
import { TodoList } from './components/todos/TodoList';
import { AddTodoForm } from './components/addTodoForm/AddTodoForm';
import './index.css';
import 'animate.css'

function App() {
  const { state, getTodo, deleteTodo, addTodo, updateTodo } = useTodo();
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({})
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (state.data.length === 0) {
      getTodo();
    }
  }, [getTodo, state.data.length]);


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
  const startIndex = Math.ceil((currentPage - 1) * pageSize);
  const endIndex = startIndex + pageSize;
  const paginatedData = state.data.slice(startIndex, endIndex);

  return (
    <GlobalContext.Provider value={{updateTodo, deleteTodo, editTodoHandler, addTodo, todos:state.data}}>
      <div className='container'>
        <div className="App" >
          <AddTodoForm />
          <TodoList 
            paginatedData={paginatedData}
          />
          <PaginationButtons 
            setCurrentPage={setCurrentPage} 
            currentPage={currentPage}
            endIndex={endIndex}
          />
          <Modal 
            todo={selectedTodo} 
            show={showModal} 
            controlFunction={setShowModal}
          />
          <Toaster />
        </div>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
