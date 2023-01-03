// using the item context for this component
import { useTodosContext } from '../hooks/useTodosContext'
import {Link} from 'react-router-dom';
// some icons for delete and edit buttons
import { BsTrash } from "react-icons/bs";
import { CiEdit } from 'react-icons/ci';
// using the authorisation context for this component
import { useAuthContext } from '../hooks/useAuthContext';


const TodoDetails = ({ todo }) => {
    // destructruing to import from context 
    const { dispatch } = useTodosContext()
    const { user } = useAuthContext()
    
    // delete function on click of button
    const handleTrash = async () => {
        // if no value for user do not run rest of function
        if (!user) {
            return
        }
        // concatanated todo._id as it has been passed as a prop appended to the end of url
        const response = await fetch('/api/todos/' + todo._id, {
            method: 'DELETE',
            // added auth for header
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (response.ok) {
            dispatch({type: 'DELETE_TODO', payload: json})
        }
    }
// return the todo details
    return (
        <div className="todoDetails">
            {/* <h4>{todo.todoItem}</h4> */}
            <p>{todo.todoItem}</p>
            {/* delete button */}
            <span className="trashBtn" onClick={handleTrash}><BsTrash /></span>
            {/* this edit button uses the item id in the params */}
            <Link to={`/edit/` + todo._id}><span className="editBtn"><CiEdit /></span></Link>
        </div>
    )

}

export default TodoDetails;