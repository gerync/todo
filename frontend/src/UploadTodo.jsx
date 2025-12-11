import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

 

function UploadTodo() {
    const [formData,setFormData] = useState({
        
    })
    return (
        <>
            <h1>Todo</h1>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                        
                    </Card.Text>
                    <Button variant="primary">Upload</Button>
                </Card.Body>
            </Card>
        </>

    );
};

export default UploadTodo;