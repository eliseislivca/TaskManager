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
            setTasks([...tasks, inputValue]);
            setInputValue('');
        };
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

                        <p >{task}</p>

                        <div className="btn">
                            <button>Complete</button>
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