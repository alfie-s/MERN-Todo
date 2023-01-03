import { useState } from 'react';
import { useLogin } from '../hooks/useLogin'


const Login = () => {
    // setting states for email and passwords
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // get these from the import hooks
    const {login, error, isLoading} = useLogin()
    // button click on form submit
    const handleSubmit = async (e) => {
        // and prevent default action
        e.preventDefault()
        // wait for log in
        await login(email, password)
    }
    // return form with email and passowrd fields for login with button  
    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>
            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            {/* disabled if isLoading */}
            <button disabled={isLoading} type="submit">Log in</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login;