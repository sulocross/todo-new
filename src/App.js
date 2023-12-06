import { useEffect, useRef, useState } from 'react';
import { useTodo } from './hooks/useTodo';
import './index.css'

function App() {
  const { state, getTodo, deleteTodo, addTodo, updateTodo } = useTodo();
  const [editedValues, setEditedValues] = useState({});
  const inputValue = useRef('');

  useEffect(() => {
    if (state.data.length === 0) {
      getTodo();
    }
  }, [state.data.length, getTodo]);

  let addNewTodo = (e) => {
    e.preventDefault();
    let title = inputValue.current.value.trim();
    if (!title) {
      alert('TITLE MUST NOT BE EMPTY');
      return;
    }
    addTodo(title);
    inputValue.current.value = '';
  };

  let handleUpdateTodo = (id, updatedTitle) => {
    if (!updatedTitle.trim()) {
      alert('Updated title cannot be empty');
      return;
    }
    updateTodo(id, updatedTitle);
  };

  const handleInputChange = (id, updatedTitle) => {
    const updatedEditedValues = { ...editedValues };
    updatedEditedValues[id] = updatedTitle;
    setEditedValues(updatedEditedValues);
  };

  if (state.loading) {
    return <p>Loading...</p>;
  }

  if (state.error) {
    return <p>{state.error}</p>;
  }

  return (
    <div className="App">
      <form onSubmit={addNewTodo}>
        <label>Title </label>
        <input type='text' placeholder='Enter Todo' ref={inputValue} />
        <button type="submit">Add Todo</button>
      </form>
      {state.data.map((todo) => {
        return (
          <div key={todo.id} className='todoList'>
            <input className='todoInput'
              value={editedValues[todo.id] || todo.title}
              onChange={(e) => handleInputChange(todo.id, e.target.value)}
            />
            <button onClick={() => handleUpdateTodo(todo.id, editedValues[todo.id] || todo.title)}>
              Update
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;