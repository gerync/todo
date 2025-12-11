import { useState } from 'react'
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import UploadTodo from './UploadTodo';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <BrowserRouter>
        {!isLoggedIn ? (
          <>
            <Link to="/">Home</Link> | {" "}
            <Link to="/Register">Register</Link> | {" "}
            <Link to="/Login">Login</Link> 
          </>
        ) : (
          <>
          <Link to="/UploadTodo">UploadTodo</Link>
          <button onClick={handleLogout}>Logout</button>
          </>
          
          
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/UploadTodo" element={<UploadTodo />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
