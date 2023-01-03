import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
// importing the uselogout hook to use in the log out button
import { useLogout } from '../hooks/useLogout';
// returning links in a navbar form
const Navbar = () => {
    // using logout from import of useLogout
    const { logout } = useLogout()
    // importing from useAuthContext
    const { user } = useAuthContext()

    const handleClick = () => {
        // call logout function to delete item from localstorage and
        // update the global state so 'user: null'
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                <h1>Todo List</h1>
                </Link>
            <nav>
            {/* only when there is a value for the user
             if it is not null, output the span and log out button*/}
                {user && (
                <div>
                    <span>{user.email}</span>
                    <button onClick={handleClick}>
                        Log Out
                    </button>
                </div>
                )}
                {/* only when user: null - show log in and signup */}
                {!user && (
                <div>
                    <Link to="/login">Log in</Link>
                    <Link to="/signup">Sign up</Link>
                </div>
                )}
            </nav>
            </div>
        </header>
    )
}

export default Navbar;
