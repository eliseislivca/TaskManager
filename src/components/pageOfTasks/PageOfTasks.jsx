import React, { useContext, useState, useEffect } from 'react';
import '../../styles/pageOfTasks.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import AddingTask from './AddingTask';
import ShowTask from './ShowTask';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { CustomContext } from '../AvtorizationPage/Context';
import axios from 'axios';

const PageOfTasks = () => {
    const [inputValue, setInputValue] = useState('');
    const [secondInputValue, secondSetInputValue] = useState('');
    const [tasks, setTasks] = useState([]);
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1);
    const [text, setText] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [isActiveSuccess, setIsActiveSuccess] = useState(false);
    const [deletingIndex, setDeletingIndex] = useState(null);
    const { user, setUser } = useContext(CustomContext);
    const { task, setTask } = useContext(CustomContext);
    const usenavigate = useNavigate();
    const logOutUser = () => {
        setUser({
            email: ''
        });
        localStorage.removeItem('user');
        setTask({
            task: ''
        })
        localStorage.removeItem('task');
        usenavigate('/login');
    };

    useEffect(() => {
        const storedTasks = localStorage.getItem('task');
        if (storedTasks) {
            const parsedTasks = JSON.parse(storedTasks);
            const userTasks = parsedTasks.filter(task => task.userId === user.id);
            setTasks(userTasks);
        }
    }, [user.id]);

    // GET-query to get the current user's tasks from the database
    useEffect(() => {
        axios.get(`http://localhost:8080/tasks?userId=${user.id}`)
            .then(response => {
                setTasks(response.data);
                localStorage.setItem('task', JSON.stringify(response.data));
            })
            .catch(error => {
                console.error('Ошибка при получении задач:', error);
            });
    }, [user.id]);

    const createNewTask = () => {
        if ((inputValue.trim() !== '') && (inputValue.length >= 3)) {
            let newTask = {
                task: inputValue,
                completed: false,
                userId: user.id
            }
            axios.post('http://localhost:8080/tasks', newTask)
                .then(res => {
                    console.log('задача успешно добавлена: ', res.data);
                    const updatedAddedTask = [res.data, ...tasks];
                    setTasks(updatedAddedTask);
                    setInputValue('');
                    setText('');
                    localStorage.setItem('task', JSON.stringify(updatedAddedTask));
                })
                .catch((err) => console.log(err.message))
        } else {
            setText('Текст должен быть больше 3 символов');
        }
    };
    const completeTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = { ...updatedTasks[index], completed: true };
        setTasks(updatedTasks);
    };
    const updateTask = (index) => {
        if ((secondInputValue.trim() !== '') && (secondInputValue.length >= 3)) {
            const updatedTasks = [...tasks];
            updatedTasks[index] = { ...updatedTasks[index], text: secondInputValue };
            setTasks(updatedTasks);
            secondSetInputValue('');
            setSelectedTaskIndex(-1);
        }
    };
    const handleEditClick = (index) => {
        setSelectedTaskIndex(index);
        secondSetInputValue(tasks[index].text);
    };

    const deleteTask = (index) => {
        setIsActive(true);
        setDeletingIndex(index);
    }
    const deleteTaskSuccess = () => {
        const taskIdDelete = tasks[deletingIndex].id;
        axios.delete(`http://localhost:8080/tasks/${taskIdDelete}`)
            .then(() => {
                const updatedTasks = tasks.filter((task, index) => index !== deletingIndex);
                setTasks(updatedTasks);
                localStorage.setItem('task', JSON.stringify(updatedTasks));
                setIsActive(false);
                setIsActiveSuccess(true);
    
                setTimeout(() => {
                    setIsActiveSuccess(false);
                }, 2000);
            })
            .catch(error => {
                console.error('Error deleting task:', error)
            });
    };    
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
                <p>Операция удаления прошла успешно <FontAwesomeIcon icon={faSquareCheck} beat style={{ color: "#199400" }} /></p>
            </div>)}
            <Link to={'/login'} onClick={logOutUser}>Logout</Link>
            <AddingTask
                text={text}
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleKeyPress={handleKeyPress}
                createNewTask={createNewTask} />
            <ShowTask
                tasks={tasks}
                completeTask={completeTask}
                secondInputValue={secondInputValue}
                secondSetInputValue={secondSetInputValue}
                selectedTaskIndex={selectedTaskIndex}
                updateTask={updateTask}
                setSelectedTaskIndex={setSelectedTaskIndex}
                handleEditClick={handleEditClick}
                deleteTask={deleteTask} />
        </div >
    )
}

export default PageOfTasks;
