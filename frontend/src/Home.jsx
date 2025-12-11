import { useState, useEffect } from 'react'
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

function Home() {
    const [ListData, setListData] = useState([]);
    const [error, setError] = useState("");

    const fetchProducts = async () => {
        const res = await fetch("https://localhost/tasks/list");
        const data = await res.json();
        if (res.ok) {
            setListData(data);
        }
        else {
            setError(data.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <h1>Üdvözöllek </h1>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {products.map((listData) => (
                    <Card key={listData.id} style={{ width: "18rem", margin: "20px" }}>
                        <Card.Body>
                            <Card.Title>{listData.Title}</Card.Title>
                            <Card.Text>
                                Descrpition: {listData.Description}
                                Due To: {listData.Dueto}

                                {listData.IsCompleted ? (
                                    <>
                                        Is Completed: Yes
                                    </>
                                ) : (
                                    <>
                                        Is Completed: No
                                    </>
                        )}
                                
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}

                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </>
    )
}

export default Home;