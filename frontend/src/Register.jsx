import { useState } from 'react'
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        birthdate: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:3000/auth/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        console.log(formData)
        console.log(await res.json())

        if (res.ok) {
            alert("Sikeres reg")
            navigate("/")
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    

    return (

        <>
            <h1>Regisztráció</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Name: </Form.Label>
                <Form.Control type='username' name='username' onChange={handleChange} placeholder='Username' /><br />

                <Form.Label>Email: </Form.Label>
                <Form.Control type='Email' name='email' onChange={handleChange} placeholder='Email' /> <br />

                <Form.Label>Password: </Form.Label>
                <Form.Control type='Password' name='password' onChange={handleChange} placeholder='Password' /> <br />

                <Form.Label>birthdate: </Form.Label>
                <Form.Control type='Date' name='birthdate' onChange={handleChange} placeholder='Birthdate' /><br />

                <Button variant="primary" type='Submit' className="register-btn w-100">Regisztráció</Button>
            </Form>

        </>
    )
}

export default Register;