import React, { useContext, useEffect, useReducer } from 'react';
import '../../styles/pageOfTasks.css';
import AddingTask from './AddingTask';
import ShowTask from './ShowTask';
import { useNavigate } from 'react-router';
import { CustomContext } from '../AvtorizationPage/Context';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const SET_TASKS = 'SET_TASKS';
const ADD_TASK = 'ADD_TASK';
const COMPLETE_TASK = 'COMPLETE_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const SET_INPUT_VALUE = 'SET_INPUT_VALUE';
const SET_TEXT = 'SET_TEXT';
const SET_SELECTED_TASK_INDEX = 'SET_SELECTED_TASK_INDEX';
const SET_IS_ACTIVE = 'SET_IS_ACTIVE';
const SET_IS_ACTIVE_SUCCESS = 'SET_IS_ACTIVE_SUCCESS';
const SET_DELETING_INDEX = 'SET_DELETING_INDEX';
const SET_SECOND_INPUT_VALUE = 'SET_SECOND_INPUT_VALUE';

const initialState = {
  inputValue: '',
  secondInputValue: '',
  tasks: [],
  selectedTaskIndex: -1,
  text: '',
  isActive: false,
  isActiveSuccess: false,
  deletingIndex: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_TASKS:
      return { ...state, tasks: action.payload };
    case ADD_TASK:
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case SET_INPUT_VALUE:
      return { ...state, inputValue: action.payload };
    case SET_TEXT:
      return { ...state, text: action.payload };
    case COMPLETE_TASK:
    case UPDATE_TASK:
      return { ...state, tasks: action.payload };
    case SET_SELECTED_TASK_INDEX:
      return { ...state, selectedTaskIndex: action.payload };
    case SET_IS_ACTIVE:
      return { ...state, isActive: action.payload };
    case SET_IS_ACTIVE_SUCCESS:
      return { ...state, isActiveSuccess: action.payload };
    case SET_DELETING_INDEX:
      return { ...state, deletingIndex: action.payload };
    case SET_SECOND_INPUT_VALUE:
      return { ...state, secondInputValue: action.payload };
    default:
      return state;
  }
};

const PageOfTasks = () => {
  const { user, setUser, setTask } = useContext(CustomContext);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(`http://localhost:3001/tasks?userId=${user.id}`)
      .then(response => {
        dispatch({ type: SET_TASKS, payload: response.data });
      })
      .catch(error => {
        console.error('Task retrieval error:', error);
      });
  }, [user]);

  const logOutUser = () => {
    localStorage.removeItem('user');
    setUser({ email: '' });
    localStorage.removeItem('task');
    setTask({ task: '' });
    navigate('/login');
  };

  const url = 'http://localhost:3001';

  const createNewTask = () => {
    const { inputValue } = state;
    if ((inputValue.trim() !== '') && (inputValue.length >= 3)) {
      let newTask = {
        id: uuidv4(),
        task: inputValue,
        completed: false,
        userId: user.id
      };
      axios.post(`${url}/tasks`, newTask)
        .then(res => {
          console.log('Task added successfully: ', res.data);
          dispatch({ type: ADD_TASK, payload: res.data });
          dispatch({ type: SET_INPUT_VALUE, payload: '' });
          dispatch({ type: SET_TEXT, payload: '' });
          const updatedTasks = [res.data, ...state.tasks];
          if (updatedTasks.length > 0) {
            localStorage.setItem('task', JSON.stringify(updatedTasks));
          }
          setTask(updatedTasks);
        })
        .catch((err) => console.log(err.message))
    } else {
      dispatch({ type: SET_TEXT, payload: '*The text must be more than 3 characters' });
    }
  };

  const completeTask = (taskIdToComplete) => {
    const taskIndex = state.tasks.findIndex(task => task.id === taskIdToComplete);
    if (taskIndex !== -1) {
      const completeUpdateTask = { completed: true };
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to mark this task as completed?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, complete!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.patch(`${url}/tasks/${taskIdToComplete}`, completeUpdateTask)
            .then(() => {
              const updatedTasks = [...state.tasks];
              updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], completed: true };
              dispatch({ type: COMPLETE_TASK, payload: updatedTasks });
              setTask(updatedTasks);
              localStorage.setItem('task', JSON.stringify(updatedTasks));
            })
            .catch(error => {
              console.error('Error completing task:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while completing the task.',
              });
            });
        }
      });
    } else {
      console.error('Task not found');
    }
  };

  const updateTask = (taskIdToUpdate) => {
    if ((state.secondInputValue.trim() !== '') && (state.secondInputValue.length >= 3)) {
      const updatedTask = {
        task: state.secondInputValue
      };
      axios.patch(`${url}/tasks/${taskIdToUpdate}`, updatedTask)
        .then(() => {
          const updatedTasks = state.tasks.map((task) => {
            if (task.id === taskIdToUpdate) {
              return { ...task, task: state.secondInputValue };
            }
            return task;
          });
          dispatch({ type: UPDATE_TASK, payload: updatedTasks });
          dispatch({ type: SET_SELECTED_TASK_INDEX, payload: -1 });
          setTask(updatedTasks);
          localStorage.setItem('task', JSON.stringify(updatedTasks));
        })
        .catch(error => {
          console.error('Error updating task:', error);
        });
    }
  };

  const handleEditClick = (taskId) => {
    const taskIndex = state.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      dispatch({ type: SET_SELECTED_TASK_INDEX, payload: taskId });
      dispatch({ type: SET_SECOND_INPUT_VALUE, payload: state.tasks[taskIndex].task });
    }
  };

  const deleteTask = (taskId) => {
    const taskIndex = state.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You cannot return a remote task!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete!'
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedTasks = [...state.tasks.slice(0, taskIndex), ...state.tasks.slice(taskIndex + 1)];
          dispatch({ type: SET_TASKS, payload: updatedTasks });
          setTask(updatedTasks);
          localStorage.setItem('task', JSON.stringify(updatedTasks));
          axios.delete(`${url}/tasks/${taskId}`)
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Your task has been deleted.',
                timer: 1500
              });
            })
            .catch(error => {
              console.error('Error deleting task:', error);
            });
        }
      });
    } else {
      console.error('Task not found');
    }
  };

  const deleteTaskCancel = () => {
    dispatch({ type: SET_IS_ACTIVE, payload: false });

    Swal.fire({
      icon: 'info',
      title: 'Cancelled',
      text: 'Task deletion has been cancelled.',
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") createNewTask();
  }

  return (
    <div className="wrapper">
      <AddingTask
        text={state.text}
        inputValue={state.inputValue}
        setInputValue={(value) => dispatch({ type: SET_INPUT_VALUE, payload: value })}
        handleKeyPress={handleKeyPress}
        createNewTask={createNewTask}
        logOutUser={logOutUser} />
      <ShowTask
        tasks={state.tasks}
        completeTask={completeTask}
        secondInputValue={state.secondInputValue}
        secondSetInputValue={(value) => dispatch({ type: SET_SECOND_INPUT_VALUE, payload: value })}
        selectedTaskIndex={state.selectedTaskIndex}
        updateTask={updateTask}
        setSelectedTaskIndex={(index) => dispatch({ type: SET_SELECTED_TASK_INDEX, payload: index })}
        handleEditClick={handleEditClick}
        deleteTask={deleteTask} />
    </div>
  )
}

export default PageOfTasks;
