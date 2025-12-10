import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



function UploadTodo() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueto: "",
        category: ""
    });

    const handleSubmit = async (e) => {
        e.preventdefault();

        const res = await fetch("http://localhost:3000/api/addtask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            alert("Sikeres feltöltés")
        }
    }

    const handleChange = async (e) => {
        setFormData({
            ...formData,
            [e.target.value]: e.target.name
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
                <Form.Control type='Date' name='dueto' onChange={handleChange} placeholder='dueto' /> <br />

                <Form.Label>Category: </Form.Label>
                <Form.Control type='Category' name='category' onChange={handleChange} placeholder='Category' /><br />

                <Button variant="primary" type='Submit' className="register-btn w-100">Feltöltés</Button>
            </Form>
        </>

    );
};

export default UploadTodo;