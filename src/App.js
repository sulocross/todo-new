import React, { useEffect, useRef, useState } from 'react';
import { useTodo } from './hooks/useTodo';
import './index.css';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const { state, getTodo, deleteTodo, addTodo, updateTodo } = useTodo();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [updatedTodoTitle, setUpdatedTodoTitle] = useState('');
  const inputValue = useRef('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (state.data.length === 0) {
      getTodo();
    }
  }, [getTodo, state.data.length]);

  const openModal = (id, title) => {
    setSelectedTodoId(id);
    setUpdatedTodoTitle(title);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTodoId(null);
    setUpdatedTodoTitle('');
  };

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

  const handleUpdateTodo = () => {
    if (!updatedTodoTitle.trim()) {
      toast.error('Updated title cannot be empty');
      return;
    }
    updateTodo(selectedTodoId, updatedTodoTitle);
    closeModal();
    toast.success("You've successfully updated a task!")
  };

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
    <div className='container'>
      <div className="App">
        <form onSubmit={addNewTodo} className='add-container'>
          <label className='add-title'>Create new task</label>
          <input type='text' placeholder='Enter Todo' ref={inputValue} className='add-input' />
          <button type="submit" className='add-btn' >Add Task</button>
        </form>
        {paginatedData.map((todo) => {
          return (
            <div key={todo.id} className='todoList'>
              <p className='todoTitle'>{todo.title}</p>
              <button onClick={() => openModal(todo.id, todo.title)} className='update-btn' >
                Edit
              </button>
              <button onClick={() => deleteTodo(todo.id)} className='delete-btn' >Delete</button>
            </div>
          );
        })}
        <div className='pagi-container'>
          <div className='pagi-btns'>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className='prev-btn'>
              Previous
            </button>
            <span style={{marginTop: '3px'}}>Page: {currentPage}</span>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={endIndex >= state.data.length} className='next-btn'>
              Next
            </button>
          </div>
        </div>
        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Update Task</h2>
              <input className='modal-input'
                value={updatedTodoTitle}
                onChange={(e) => setUpdatedTodoTitle(e.target.value)}
              />
              <button onClick={handleUpdateTodo} setModalOpen={false} className='modal-upd-btn' >Update</button>
            </div>
            <button className='modal-close-btn' onClick={closeModal}
            >✖</button>
          </div>
        )}
        <Toaster />
      </div>
    </div>
  );
}

export default App;
