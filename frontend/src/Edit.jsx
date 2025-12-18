import { useEffect, useState } from "react";
import { Form, Button, Card, CardText} from "react-bootstrap";

function Edit() {
    const [listData, setListData] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [category, setCategory] = useState("");

    const [error, setError] = useState(null);

    const fetchTasks = async () => {
        try {
            const res = await fetch("http://localhost:3000/tasks/list", {
                credentials: "include",
            });
            const data = await res.json();

            if (res.ok) {
                // Itt használjuk a data.tasks tömböt
                setListData(Array.isArray(data.tasks) ? data.tasks : []);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Failed to fetch tasks");
        }
    };

    const deleteTask = async (id) => {
        if (!id) return;

        try {
            const res = await fetch(`http://localhost:3000/tasks/delete?id=${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message);
                setSelectedTask(null);
                fetchTasks();
            } else {
                setError(data.message);
            }
        } catch {
            setError("Failed to delete task");
        }
    };

    const editTask = async (id) => {
        if (!id) return;

        try {
            const res = await fetch("http://localhost:3000/tasks/edit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    id,
                    title,
                    description,
                    dueDate,
                    category,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message);
                fetchTasks();
            } else {
                setError(data.message);
            }
        } catch {
            setError("Failed to edit task");
        }
    };

    const handleSelection = (e) => {
        const id = e.target.value;
        setSelectedTask(id ? Number(id) : null);
    };

    useEffect(() => {
        if (!selectedTask) return;

        const task = listData.find((t) => t.id === selectedTask);
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setDueDate(task.dueDate);
            setCategory(task.category);
        }
    }, [selectedTask, listData]);

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>

            {listData.map((task) => (
                <Card key={task.id} style={{ width: "18rem", margin: "20px" }}>
                    <Card.Body>
                        <Card.Title>{task.title}</Card.Title>
                        <CardText>
                            Leírás: {task.description} <br />
                            Határidő: {task.dueDate} <br />
                            Kész: {task.isCompleted ? "Igen" : "Nem"}
                        </CardText>
                    </Card.Body>
                </Card>
            ))}

            <Form.Select onChange={handleSelection} style={{ maxWidth: "300px" }}>
                <option value="">Válassz egy teendőt</option>
                {listData.map((task) => (
                    <option key={task.id} value={task.id}>
                        {task.title}
                    </option>
                ))}
            </Form.Select>

            <Form onSubmit={(e) => e.preventDefault()} style={{ marginTop: "20px", maxWidth: "300px" }}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Név" />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Leírás" />
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Kategória" />

                <Button variant="primary" onClick={() => editTask(selectedTask)} disabled={!selectedTask}>
                    Módosítás
                </Button>
                <Button variant="danger" onClick={() => deleteTask(selectedTask)} disabled={!selectedTask} style={{ marginTop: "20px" }}>
                    Törlés
                </Button>
            </Form>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default Edit;
