import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, InputGroup } from 'react-bootstrap';

function App() {

    const [tasks, setTasks] = useState([]);

    // the function creates a new array of tasks with existing ones + a new task
    const createNewTask = () => {
        let newTeskValue = 'add a new task';
        setTasks([...tasks, { taskValue: newTeskValue }]);
    }

    return (
        <div>
            <div>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="whrite a task"
                        aria-label="add a task"
                        aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={createNewTask}>
                        New Task
                    </Button>
                </InputGroup>

                <div>
                    {/* all tasks are sorted through and displayed on the screen */}
                    {tasks.map((task, index) => (
                        <p key={index}>
                            {task.taskValue}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
