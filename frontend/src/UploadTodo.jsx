import { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function UploadTodo() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
        category: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3000/tasks/add", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        console.log(formData,await res.json())

        if (res.ok) {
            alert("Sikeres feltöltés")
            navigate("/")
        }
    }

    const handleChange = async (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }


    return (
        <>
            <h1>Todo</h1>
            <Form onSubmit={handleSubmit}>

                <Form.Label>Title: </Form.Label>
                <Form.Control type='Title' name='title' onChange={handleChange} placeholder='Title' /><br />

                <Form.Label>Description: </Form.Label>
                <Form.Control type='Description' name='description' onChange={handleChange} placeholder='Description' /> <br />

                <Form.Label>Due to: </Form.Label>
                <Form.Control type='Date' name='dueDate' onChange={handleChange} placeholder='dueto' /> <br />

                <Form.Label>Category: </Form.Label>
                <Form.Control type='Category' name='category' onChange={handleChange} placeholder='Category' /><br />

                <Button variant="primary" type='Submit' className="register-btn w-100">Feltöltés</Button>
            </Form>
        </>

    );
};

export default UploadTodo;