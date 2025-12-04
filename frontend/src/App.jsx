import { useState } from 'react'
import './App.css'
import {BrowserRouter, Link, Route,Routes} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
    
      <BrowserRouter>
      <Link to="/">Home</Link> | {" "}
      <Link to="/Register">Register</Link> | {" "}
      <Link to="/Login">Login</Link>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
      </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
