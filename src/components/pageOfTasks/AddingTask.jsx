import React from 'react';
import '../../styles/pageOfTasks.css';

const AddingTask = ({ text, inputValue, setInputValue, handleKeyPress, createNewTask }) => {

  return (
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
  )
}

export default AddingTask;
