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
import { v4 as uuidv4 } from 'uuid';

const PageOfTasks = () => {
  const [inputValue, setInputValue] = useState('');
  const [secondInputValue, secondSetInputValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1);
  const [text, setText] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isActiveSuccess, setIsActiveSuccess] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const { user, setUser, setTask } = useContext(CustomContext);
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
  const url = 'http://localhost:3001';
  useEffect(() => {
    axios.get(`${url}/tasks?userId=${user.id}`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error receiving tasks:', error);
      });
  }, [user]);

  const createNewTask = () => {
    if ((inputValue.trim() !== '') && (inputValue.length >= 3)) {
      let newTask = {
        id: uuidv4(),
        task: inputValue,
        completed: false,
        userId: user.id
      };
      axios.post(`${url}/tasks`, newTask)
      .then(res => {
        console.log('task added successfully: ', res.data);
        setTasks(prevTasks => [res.data, ...prevTasks]);
        setInputValue('');
        setText('');
        const updatedTasks = [res.data, ...tasks];
        localStorage.setItem('task', JSON.stringify(updatedTasks));
        setTask(updatedTasks);
        })
        .catch((err) => console.log(err.message))
    } else {
      setText('The text must be more than 3 characters');
    }
  };
  const completeTask = (index) => {
    const taskIdToComplete = tasks[index].id;
    const copleteUpdateTask = {
      completed: true
    };
    axios.patch(`${url}/tasks/${taskIdToComplete}`, copleteUpdateTask)
      .then(() => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = { ...updatedTasks[index], completed: true };
        setTasks(updatedTasks);
        setTask(updatedTasks);
        localStorage.setItem('task', JSON.stringify(updatedTasks))
      })
      .catch(error => {
        console.error('Error completed task:', error);
      });
  };
  const updateTask = (index) => {
    if ((secondInputValue.trim() !== '') && (secondInputValue.length >= 3)) {
      const taskIdToUpdate = tasks[index].id;
      const updatedTask = {
        task: secondInputValue
      };
      axios.patch(`${url}/tasks/${taskIdToUpdate}`, updatedTask)
        .then(() => {
          const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
              return { ...task, task: secondInputValue };
            }
            return task;
          });
          setTasks(updatedTasks);
          secondSetInputValue('');
          setSelectedTaskIndex(-1);
          setTask(updatedTasks);
          localStorage.setItem('task', JSON.stringify(updatedTasks));
        })
        .catch(error => {
          console.error('Error updating task:', error);
        });
    }
  };
  const handleEditClick = (index) => {
    setSelectedTaskIndex(index);
    secondSetInputValue(tasks[index].task);
  };
  const deleteTask = (index) => {
    setIsActive(true);
    setDeletingIndex(index);
  }
  const deleteTaskSuccess = () => {
    const taskIdDelete = tasks[deletingIndex].id;
    axios.delete(`${url}/tasks/${taskIdDelete}`)
      .then(() => {
        const updatedTasks = tasks.filter((task, index) => index !== deletingIndex);
        setTasks(updatedTasks);
        setIsActive(false);
        setIsActiveSuccess(true);
        setTask(updatedTasks);
        localStorage.setItem('task', JSON.stringify(updatedTasks));

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
    if (event.key == "Enter") createNewTask();
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
      {
        isActiveSuccess && (
          <div className="operation-success">
            <p>Операция удаления прошла успешно <FontAwesomeIcon icon={faSquareCheck} beat style={{ color: "#199400" }} /></p>
          </div>
        )}
      <Link to={'/login'} className='log-out' onClick={logOutUser}>Logout</Link>
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
