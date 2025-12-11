import { useState, useEffect } from 'react'
import { Card } from "react-bootstrap";

function Home() {
    const [ListData, setListData] = useState([]);
    const [error, setError] = useState("");

    const fetchProducts = async () => {
        const res = await fetch("http://localhost:3000/tasks/list", {
            credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
            setListData(data.tasks);
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
                {ListData.map((task) => (
                    <Card key={task.id} style={{ width: "18rem", margin: "20px" }}>
                        <Card.Body>
                            <Card.Title>{task.title}</Card.Title>
                            <Card.Text>
                                <p>Description: {task.description}</p>
                                <p>Due To: {task.dueto}</p>
                                <p>Is Completed: {task.isCompleted ? "Yes" : "No"}</p>
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
