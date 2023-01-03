import { AuthContext } from "../context/AuthContext";
import { useContext } from 'react';

// invoke this hook to use in any component and destructure the user from the context
export const useAuthContext = () => {
    // consue the context using useContext hook
    const context = useContext(AuthContext)
    // if we are not in the scope of the context
    if (!context) {
        throw Error('useAuthContext must be used inside a AuthContextProvider')
    }
    // return the context
    return context
}