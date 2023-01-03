// use for local state
import { useState } from 'react'
// returns context of user property and dispatch function
import { useAuthContext } from './useAuthContext'
// this hook exports the logic to use for the login page
export const useLogin = () => {
    // set states for error and laoding
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    // destructuring to use dispatch from import above
    const { dispatch } = useAuthContext()

    // user logs in, this gets a response back based in the info
    const login = async (email, password) => {
        // starting request so change state to true
        setIsLoading(true)
        // set to null as if there is an error and want to correct it, the request needs
        // to start with null state
        setError(null)
        // send data POST request containing email and password
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        // return the json either web token or error message
        const json = await response.json()
        // if there is an issue, set loading to false
        // set error to json error to get the error in the json above
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        // if all ok,
        if (response.ok) {
            // save jwt to local storage
            localStorage.setItem('user', JSON.stringify(json))
            // update auth context
            // returning the payload which will be json
            dispatch({type: 'LOGIN', payload: json})
            // set loading back to false
            setIsLoading(false)
        }
    }
    // being able to use login, isLoading and error from this hook
    return { login, isLoading, error }
}