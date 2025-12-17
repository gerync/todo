import { useState } from 'react'
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function Login({setIsLoggedIn}){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const res = await fetch('http://localhost:3000/auth/login',{
            method: "POST",
            credentials: 'include',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(formData),
        });

        if(res.ok){
            alert("Sikeres bejelentkezés");
            setIsLoggedIn(true);
            navigate("/")
        }
    }

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return(
        <>
        <h1>Login</h1>

        <Form onSubmit={handleSubmit}>
            <Form.Label>Username: </Form.Label>
            <Form.Control type='Username' name='username' onChange={handleChange} placeholder='Username' /> <br />

            <Form.Label>Password: </Form.Label>
            <Form.Control type='Password' name='password' onChange={handleChange} placeholder='Password' /> <br />

            <Button variant="primary" type='Submit' className="register-btn w-100">Bejelentkezés</Button>
        </Form>
        </>

    )
}

export default Login;