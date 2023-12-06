export const useLocalStorage = () => {

    const setParam = (key, value) => {
        window.localStorage.setItem(key, value)
    }
    const getParam = (key) => {
        return window.localStorage.getItem(key)
    }

    return {
        setParam,
        getParam
    }
}
