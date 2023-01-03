import { TodosContext } from "../context/TodoContext";
import { useContext } from 'react';

export const useTodosContext = () => {
    // consue the context using useContext hook
    const context = useContext(TodosContext)
    // if we are not in the scope of the context
    if (!context) {
        throw Error('useTodosContext must be used inside a TodosContextProvider')
    }
    // return the context
    return context
}