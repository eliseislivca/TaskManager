import React, { useState } from 'react';
import './pageOfTasks.css';

const PageOfTasks = () => {
    const [inputValue, setInputValue] = useState('');
    const [secondInputValue, secondSetInputValue] = useState('');
    const [tasks, setTasks] = useState([]);
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1);
    const [text, setText] = useState('');
    const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isActiveSuccess, setIsActiveSuccess] = useState(false);
    const [deletingIndex, setDeletingIndex] = useState(null);

    const createNewTask = () => {
        if ((inputValue.trim() !== '') && (inputValue.length >= 3)) {
            setTasks([...tasks, inputValue]);
            setInputValue('');
            setText('');
        } else {
            setText('Текст должен быть больше 3 символов');
        }
    };

    const updateTask = (index) => {
        if ((secondInputValue.trim() !== '') && (secondInputValue.length >= 3)) {
            const updatedTasks = [...tasks];
            updatedTasks[index] = secondInputValue;
            setTasks(updatedTasks);
            secondSetInputValue('');
            setSelectedTaskIndex(-1);
        }
    };

    const handleEditClick = (index) => {
        setSelectedTaskIndex(index);
        secondSetInputValue(tasks[index]);
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
        if (event.key == "Enter")
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
                        <input
                            className='task-name'
                            type="text"
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value)
                            }}
                            onKeyPress={handleKeyPress}
                        />
                        {
                            text && (
                                <label className='input-error'>{text}</label>)
                        }
                    </div>
                </div>
                <button className="add-btn" onClick={createNewTask}>Add Task</button>
            </div>
            <div className='new-tasks'>
                {tasks.map((task, index) => (
                    <div key={index} className='wrapper-of-task'>

                        {
                            selectedTaskIndex === index ? (
                                <input
                                    type="text"
                                    value={secondInputValue}
                                    onChange={(e) => secondSetInputValue(e.target.value)}
                                />
                            ) : (
                                <p>{task}</p>
                            )
                        }

                        <div className="btn">
                            {selectedTaskIndex === index ? (
                                <>
                                    <button onClick={() => updateTask(index)}>Update</button>
                                    <button onClick={() => setSelectedTaskIndex(-1)}>Cancel</button>
                                </>
                            ) : (
                                <button onClick={() => handleEditClick(index)}>Edit</button>
                            )}

                            {selectedTaskIndex === -1 && (
                                <>
                                    <button>Complete</button>
                                    <button className='btn-delete' onClick={() => deleteTask(index)}>Delete</button>
                                </>
                            )}
                        </div >
                    </div >
                ))}
            </div >
        </div >
    )
}

export default PageOfTasks;

