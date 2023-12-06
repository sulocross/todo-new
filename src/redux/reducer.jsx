const LOADED = 'loaded'
const DATA_LOADED = 'data_loaded'
const ERROR = 'error'

export const reducer = (state, action) => {
    switch(action.type){
        case LOADED:
            return {...state, loading: false}
        case DATA_LOADED:
            return {...state, data: action.payload} 
        case ERROR: 
            return {...state, error: action.payload}
        default:
            return state
    }
}

export default reducer
export {LOADED, DATA_LOADED, ERROR}
