import { DATA_LOADED, ERROR, LOADED } from "../redux/reducer"
import { useApiState } from "./useApiState"


export const useTodo = () => {
    const url = 'https://jsonplaceholder.typicode.com/todos'

    const {state, dispatch} = useApiState()

    return {
        state,
        getTodo: () => {
            fetch(url)
            .then(res => res.json())
            .then(json => {
                dispatch({type: DATA_LOADED, payload: json})
            })
            .catch(error => {
                dispatch({type: ERROR, payload: error.message})
            })
            .finally(() => {
                dispatch({type: LOADED})
            })
        },
        deleteTodo: id => {
            let updated_data = state.data.filter(row => row.id !== id)
            dispatch({type: DATA_LOADED, payload: updated_data})
            fetch(`${url}/${id}`, {method: 'DELETE'})
            .catch(error => {
                dispatch({type: ERROR, payload: error.message})
            })
        },
        addTodo: (title) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(
                    {
                        userId: 1,
                        title,
                        completed: false
                    }
                ),
            })
            .then((res) => res.json())
            .then((json) => {
                dispatch({type: DATA_LOADED, payload: [...state.data, json]})
            })
            .catch(error=> {
                dispatch({type: ERROR, payload: error.message})
            })
        },
        updateTodo: ({id, userId, title, completed}) => {
            let todoIndex = state.data.findIndex(todo => todo.id === id)
            let updatedTodo = {...state.data[todoIndex], id, userId, title, completed}
            fetch(`${url}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(updatedTodo),
            })
            .then((res) => res.json())
            .then(todo => {
                let todos = [...state.data]
                let todoIndex = todos.findIndex(todo => todo.id === id)
                todos[todoIndex] = todo
                dispatch({ type: DATA_LOADED, payload: todos });
            })
            .catch((error) => {
                dispatch({ type: ERROR, payload: error.message });
            })
        }
    }
}