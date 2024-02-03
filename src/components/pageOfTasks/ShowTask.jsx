import React from 'react';
import '../../styles/pageOfTasks.css';

const ShowTask = ({tasks, completeTask, secondInputValue, secondSetInputValue, selectedTaskIndex, updateTask, setSelectedTaskIndex, handleEditClick, deleteTask}) => {

    return (
      <div className='new-tasks'>
      {tasks.map((task, index) => (
          <div key={index} className='wrapper-of-task'>
              <p className={`${task.completed ? 'completed' : 'task-text'}`}>{task.text}</p>
              <div className="btn">
                  <button onClick={() => completeTask(index)} className={`${task.completed ? 'complete-hide' : 'btn-complete'}`}>Complete</button>
              {
                  selectedTaskIndex === index ? (
                      <input
                          type="text"
                          value={secondInputValue}
                          onChange={(e) => secondSetInputValue(e.target.value)}
                      />
                  ) : (
                      <p>{task.completed}</p>
                  )
              }
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
                          <button className='btn-delete' onClick={() => deleteTask(index)}>Delete</button>
                      </>
                  )}
              </div >
          </div >
      ))}
  </div >
    )
}

export default ShowTask;
