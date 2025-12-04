import { useState } from 'react'
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        birthday: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:3000/api/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            alert("Sikeres reg")
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

                <Form.Label>birthday: </Form.Label>
                <Form.Control type='Date' name='birthday' onChange={handleChange} placeholder='Birthday' /><br />

                <Button variant="primary" type='Submit' className="register-btn w-100">Regisztráció</Button>
            </Form>

        </>
    )
}

export default Register;