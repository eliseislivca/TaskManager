import React from 'react';
import '../../styles/pageOfTasks.css';

const ShowTask = ({ tasks = [], completeTask, secondInputValue, secondSetInputValue, selectedTaskIndex, updateTask, setSelectedTaskIndex, handleEditClick, deleteTask }) => {
  return (
    <div className='new-tasks'>
      {tasks.map((task) => (
        <div key={task.id} className='wrapper-of-task p-3 mb-1 bg-dark text-white'>
          <p className={`${task.completed ? 'completed fs-4' : 'task-text fs-4'}`}>{task.task}</p>
          <div className="buttons d-grid gap-2 d-md-flex justify-content-md-end">
            <button onClick={() => completeTask(task.id)} className={`${task.completed ? 'complete-hide' : 'btn-complete btn btn-outline-success me-md-1'}`} type="button">Complete</button>
            {
              selectedTaskIndex === task.id ? (
                <input
                  type="text"
                  value={secondInputValue}
                  onChange={(e) => secondSetInputValue(e.target.value)}
                />
              ) : (
                <p>{task.completed}</p>
              )
            }
            {selectedTaskIndex === task.id ? (
              <>
                <button className="btn btn-outline-success" onClick={() => updateTask(task.id)}>Update</button>
                <button className="btn btn-outline-danger" onClick={() => setSelectedTaskIndex(-1)}>Cancel</button>
              </>
            ) : (
              <button className="btn btn-outline-secondary me-md-2" onClick={() => handleEditClick(task.id)}>Edit</button>
            )}

            {selectedTaskIndex === -1 && (
              <>
                <button className='btn btn-outline-danger me-md' onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </div >
        </div >
      ))}
    </div >
  )
}

export default ShowTask;