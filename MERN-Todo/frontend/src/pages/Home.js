import { useEffect} from 'react';
import { useTodosContext } from '../hooks/useTodosContext';
import TodoDetails from '../components/TodoDetails';
import TodoForm from '../components/TodoForm';
import Instructions from '../components/Instructions';
import { useAuthContext } from '../hooks/useAuthContext'

const Home = () => {
    const {todos, dispatch} = useTodosContext()
    const {user} = useAuthContext()
    useEffect(() => {
        const fetchTodos = async () => {
            // perform fetch
            const response = await fetch('/api/todos', {
                // adding the auth to headers
                headers: {
                    'Content-Type': 'application/json',
                    // if auth valid give access
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            // if response is ok
            if(response.ok) {
                // trigger dispatch function passing the action from the todoContext.js
                dispatch({type: 'SET_TODOS', payload: json})
            }
        }
        // if there is a value for the user, fetch data. If not, don't fetch anything
        if (user) {
            fetchTodos()
        }
// dependencies
    }, [dispatch, user])

    return (
        <div className="home">
            <div className="todos">
            <Instructions/>
            {/* todos && todos - only if value for todos then map through todos */}
                {todos && todos.map((todo) => (
                    <TodoDetails key={todo._id} todo={todo}/>
                ))}
            </div>
            <TodoForm/>
        </div>
    )
}

export default Home;