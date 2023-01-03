import { useAuthContext } from "./useAuthContext"
import { useTodosContext } from "./useTodosContext"

export const useLogout = () => {
    // get dispatch from useAuthContext
    const { dispatch } = useAuthContext()
    // using destructing for dispatch to use the todosDispatch
    const { dispatch: todosDispatch } = useTodosContext()
    const logout = () => {
// we dont need to send request to backend
// as we are logging out rather than removing a user
// remove user from storage, 'user' was set in the 
// useSignup hook as setItem('user', JSON.stringify(json))
    localStorage.removeItem('user')

    // dispatch log out function, do not need payload as
    //  the LOGOUT case just returns 'user: null' in the AuthContext
    dispatch({type: 'LOGOUT'})
    // clearing documents on logout of user as if you were to log in
    // there was still a collection of docs in the global state not of that user
    todosDispatch({type: 'SET_TODOS', payload: null})
    }

    return { logout }
}   