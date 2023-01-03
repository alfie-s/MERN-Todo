import { useState } from 'react';
import { useSignup } from '../hooks/useSignup'


const Signup = () => {
    // set states for email and password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // destructuring from the useSignup hook
    const {signup, error, isLoading} = useSignup()
    // on form button click trigger this function
    const handleSubmit = async (e) => {
        // prevent default action
        e.preventDefault()
        // await the function pass in the email and password
        await signup(email, password)
    }
    // return form for signup with email and password fields 
    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
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
            {/* diabled as not wanting to send another request if it is still loading */}
            <button disabled={isLoading} type="submit">Sign Up</button>
            {/* error message telling user what is wrong */}
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Signup;