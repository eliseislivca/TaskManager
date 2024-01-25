import './pageOfTasks.css';
import { useState } from 'react';

const PageOfTasks = () => {
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState([]);
    const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isActiveSuccess, setIsActiveSuccess] = useState(false);
    const [deletingIndex, setDeletingIndex] = useState(null);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const createNewTask = () => {
        if (inputValue.trim() !== '') {
            setTasks([inputValue, ...tasks]);
            setInputValue('');
        };
    };

    const deleteTask = (index) => {
        setIsActive(true);
        setDeletingIndex(index);
    }
        const deleteTaskSuccess = () => {
            const updatedTasks = [...tasks];
            updatedTasks.splice(deletingIndex, 1);
            setTasks(updatedTasks);
            setIsDeleteSuccess(true);
            setIsActive(false);
            setIsActiveSuccess(true);

            setTimeout(() => {
                setIsActiveSuccess(false);
            }, 2000);
        }
        const deleteTaskCancel = () => {
            setIsActive(false);
        };

        const handleKeyPress = (event) => {
            if(event.key == "Enter")
            createNewTask();
        }

    return (
        <div className="wrapper">
            {isActive && (
                <div className="wrapper-overlay"></div>
            )}
            <div className={isActive ? 'delete-active' : 'delete-inactive'}>
                <h2>Удалить задачу?</h2>
                <p>Подтвердить удаление задачи?</p>
                <div className='btn-again-delete'>
                    <button className='btn-cancel' onClick={deleteTaskCancel}>Отмена</button>
                    <button className='btn-remove' onClick={deleteTaskSuccess}>Удалить</button>
                </div>
            </div>
            {isActiveSuccess && (<div className="operation-success">
                <p>Операция удаления прошла успешно ✅</p>
            </div>)}
            <div className='inner-wrapper'>
                <div className="inner">
                    <div className="name-input">
                        <label>Task</label>
                        <input type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}></input>
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
                        <p>{task}</p>
                        <div className="btn">
                            <button>Complete</button>
                            <button className='btn-delete' onClick={() => deleteTask(index)}>Delete</button>
                            <button>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PageOfTasks;