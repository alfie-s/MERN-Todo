import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
        // return payload as user
      return { user: action.payload }
    case 'LOGOUT':
        // reset back to null for logout
      return { user: null }
    default:
        // if nothing matches
      return state
  }
}
// children represent what this provider wraps
export const AuthContextProvider = ({ children }) => {
    // register state
  const [state, dispatch] = useReducer(authReducer, { 
    // user is not logged in so state starts at null
    user: null
  })
    // at the start check for the token in local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    // creating variable to parse JSON into object to use in js
    if (user) {
        // dispatches the action
        dispatch({ type: 'LOGIN', payload: user }) 
    }
  }, [])

  console.log('AuthContext state:', state)
    //keeping track of the state test
    // console.log('AuthContextState: ', state)
    // return the provider component wrapping child components
    // value of spread operator ...state and dispatch to use elsewhere
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}
