import { createContext, useReducer } from 'react';
// custom context component which returns the provider of the context created
export const TodosContext = createContext();
export const todosReducer = (state, action) => {
    switch (action.type) {
            case 'SET_TODOS':
                return {
                    // return this object that will update todos from null state
                    todos: action.payload
                }
            case 'CREATE_TODO':
                return {
                    todos: [action.payload, ...state.todos]
                }
            case 'DELETE_TODO':
                return {
                    // if they are not equal to the id then keep them in array
                    todos: state.todos.filter((c) => c._id !== action.payload._id)
                }
            default: 
                return state
    }
}
// children prop represent whatever child element the context provider wraps
export const TodosContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(todosReducer, {
        // gloabl context state
        todos: null
    })
    return (
        // spread operator to get back value to pass to home.js
        <TodosContext.Provider value={{...state, dispatch}}>
        {/* wraps children prop */}
            { children }
        </TodosContext.Provider>
    )
}
