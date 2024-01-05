import './pageOfTasks.css';
import { useState } from 'react';

const PageOfTasks = () => {
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState([]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const createNewTask = () => {
        if (inputValue.trim() !== '') {
            setTasks([{ text: inputValue, completed: false }, ...tasks]);
            setInputValue('');
        };
    };

    const completeTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = { ...updatedTasks[index], completed: true };
        setTasks(updatedTasks);
    };

    return (
        <div className="wrapper">
            <div className='inner-wrapper'>
                <div className="inner">
                    <div className="name-input">
                        <label>Task</label>
                        <input type="text" value={inputValue} onChange={handleInputChange}></input>
                    </div>

                    <div className="desc-input">
                        <label>Description of Task</label>
                        <input type="text"></input>
                    </div>
                </div>

                <button className="add-btn" onClick={createNewTask}>Add Task</button>
            </div>

            <div className='new-tasks'>
                {tasks.map((task, index) => (
                    <div key={index} className='wrapper-of-task'>

                        <p className={`${task.completed ? 'completed' : 'task-text'}`}>{task.text}</p>

                        <div className="btn">
                            <button onClick={() => completeTask(index)} className={`${task.completed ? 'complete-hide' : 'btn-complete'}`}>Complete</button>
                            <button>Delete</button>
                            <button>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PageOfTasks;