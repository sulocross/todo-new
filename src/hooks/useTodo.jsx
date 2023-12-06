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
        updateTodo: (id, updatedTitle, completed) => {
            fetch(`${url}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    userId: state.data.find(todo => todo.id === id).userId,
                    id,
                    title: updatedTitle,
                    completed
                }),
            })
            .then((res) => res.json())
            .then((json) => {
                const updatedData = state.data.map(todo => {
                    if (todo.id === id) {
                        return {
                            ...todo,
                            title: updatedTitle,
                            completed
                        };
                    }
                    return todo;
                });
                dispatch({ type: DATA_LOADED, payload: updatedData });
            })
            .catch((error) => {
                dispatch({ type: ERROR, payload: error.message });
            })
        }
    }
}