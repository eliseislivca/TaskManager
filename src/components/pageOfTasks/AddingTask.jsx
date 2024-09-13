import React from 'react';
import '../../styles/pageOfTasks.css';
import { Link } from 'react-router-dom';

const AddingTask = ({ logOutUser, text, inputValue, setInputValue, handleKeyPress, createNewTask }) => {
  return (
    <div className='inner-wrapper'>
      <div className="inner">
        <div className="name-input">
          <label className='fs-5'>Task</label>
          <input
            className='task-name'
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
            onKeyPress={handleKeyPress}
            placeholder='Enter the task'
          />
          {
            text && (
              <label className='input-error'>{text}</label>)
          }
        </div>
      </div>
      <div>
        <button className="add-btn btn btn-outline-light" onClick={createNewTask}>Add Task</button>
        <button className='log-out btn btn-primary' onClick={logOutUser}>Logout</button>
      </div>
    </div>
  )
}

export default AddingTask;
