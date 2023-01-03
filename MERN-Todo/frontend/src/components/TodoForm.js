import { useState } from "react";
import { useTodosContext } from '../hooks/useTodosContext';
import { useAuthContext } from "../hooks/useAuthContext";
// setting states for the form and also dispatch from the custom hook.
const TodoForm = () => {
    const { dispatch } = useTodosContext()
    const { user } = useAuthContext()
    const[todoItem, setTodoItem] = useState('')
    const[error, setError] = useState(null)
    const[emptyFields, setEmptyFields] = useState([])    

// create a new document, prevent default behaiviour
    const handleCreate = async (e) => {
        e.preventDefault()
        // if we don't have a user, return out of the function
        // do not trigger rest of code
        if (!user) {
            setError('You must be logged in')
            return
        }
        const todo = {todoItem}
        // POST the response to update database
        const response = await fetch('/api/todos', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        // show error if response not ok
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        // Set states if response is ok
        if (response.ok) {
            setTodoItem('')
            setError(null)
            setEmptyFields([])
            // dispatching this action updates the context state
            dispatch({type: 'CREATE_TODO', payload: json })
        }

    }
    return (
            <form className="createTodo" onSubmit={handleCreate}>
                <h3>Add a New Todo</h3>
                <input
                    type="text"
                    onChange={(e) => setTodoItem(e.target.value)}
                    value={todoItem}
                    // if todo is in emptyFields arr
                    className={emptyFields.includes('todo') ? 'error' : ''}
                />
                <button>Add Todo</button>
                {/* error div if you do not type in anything in the fields */}
                {error && <div className="error">{error}</div>}
            </form>
    )
}

export default TodoForm;