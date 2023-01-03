// routes and links for creating links, Navigate for redirecting user
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
// import auth context for what links you can see when logged in/out
import { useAuthContext } from './hooks/useAuthContext';
// components
import Navbar from './components/Navbar';
import EditForm from './components/EditForm';

// pages
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  // grab user from global context
  // for creating conditions in the ternary operators below
  // to redirect the user based on authentication status
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
      <div className="pages">
        <Routes>
          {/* if there is a user value - show the homepage */}
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />}/>
          <Route path="/edit/:id" element={<EditForm />}/>
          {/* if there is no user value - naviagte to signup page
          if user navigate to home page */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />}/>
          {/* if there is no user value - navigate to signup page
          if user navigate to home page */}
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />}/>
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
