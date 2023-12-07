import React, { useEffect, useRef, useState } from 'react';
import { useTodo } from './hooks/useTodo';
import './index.css';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

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
      alert('TITLE MUST NOT BE EMPTY');
      return;
    }
    addTodo(title);
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
    <div className="App">
      <form onSubmit={addNewTodo}>
        <label>Title </label>
        <input type='text' placeholder='Enter Todo' ref={inputValue} />
        <button type="submit">Add Todo</button>
      </form>
      {paginatedData.map((todo) => {
        return (
          <div key={todo.id} className='todoList'>
            <p className='todoTitle'>{todo.title}</p>
            <button onClick={() => openModal(todo.id, todo.title)}>
              Update
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        );
      })}
      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page: {currentPage}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={endIndex >= state.data.length}>
          Next
        </button>
      </div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update Todo</h2>
            <input
              value={updatedTodoTitle}
              onChange={(e) => setUpdatedTodoTitle(e.target.value)}
            />
            <button onClick={handleUpdateTodo} setModalOpen={false}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
