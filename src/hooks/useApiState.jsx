import reducer from "../redux/reducer"
import { useEffect, useReducer } from "react"
import { useLocalStorage } from "./useLocalStorage"

export const useApiState = () => {

    const {setParam, getParam} = useLocalStorage()

    let cachedState = getParam('state')

    let initialState = cachedState ? JSON.parse(cachedState) : {data: [], loading: true, error: null}
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        setParam('state', JSON.stringify(state))
    }, [state])

    return {
        state,
        dispatch
    }
}