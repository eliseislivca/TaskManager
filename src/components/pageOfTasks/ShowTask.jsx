import React, { useState } from 'react';
import '../../styles/pageOfTasks.css';

const ShowTask = ({ incompleteTask, tasks = [], completeTask, secondInputValue, secondSetInputValue, selectedTaskIndex, updateTask, setSelectedTaskIndex, handleEditClick, deleteTask }) => {
  const [showMore, setShowMore] = useState({});

  const toggleShowMore = (taskId) => {
    setShowMore(prevState => ({
      ...prevState,
      [taskId]: !prevState[taskId]
    }));
  };

  return (
    <div className='new-tasks'>
      {tasks.map((task) => (
        <div key={task.id} className='wrapper-of-task p-3 mb-1 bg-dark text-white'>
          {selectedTaskIndex === task.id ? (
            <input
              type="text"
              value={secondInputValue}
              onChange={(e) => secondSetInputValue(e.target.value)}
            />
          ) : (
            <div>
              {task.task.length > 70 ? (
                <div>
                  <p className={`${task.completed ? 'completed fs-4' : 'task-text fs-4'}`}>
                    {showMore[task.id] ? task.task : task.task.slice(0, 70)}
                    <button className="btn btn-link deploy" onClick={() => toggleShowMore(task.id)}>
                    {showMore[task.id] ? '... hide' : '... more'}
                  </button>
                  </p>
                </div>
              ) : (
                <p className={`${task.completed ? 'completed fs-4' : 'task-text fs-4'}`}>{task.task}</p>
              )}
            </div>
          )}
          <div className="buttons d-grid gap-2 d-md-flex justify-content-md-end">
            {task.completed ? (
              <button className='complete-hide btn btn-outline-secondary me-md-1' onClick={() => incompleteTask(task.id)} type="button">Incomplete</button>
            ) : (
              <button className='btn-complete btn btn-outline-success me-md-1' onClick={() => completeTask(task.id)} type="button">Complete</button>
            )}
            {selectedTaskIndex === task.id ? (
              <>
                <button className="btn btn-outline-success" onClick={() => updateTask(task.id)}>Update</button>
                <button className="btn btn-outline-danger" onClick={() => setSelectedTaskIndex(-1)}>Cancel</button>
              </>
            ) : (
              <button className={`${task.completed ? "complete-hide" : "btn btn-outline-secondary me-md-2"}`} onClick={() => handleEditClick(task.id)}>Edit</button>
            )}

            {selectedTaskIndex === -1 && (
              <button className='btn btn-outline-danger me-md' onClick={() => deleteTask(task.id)}>Delete</button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ShowTask;
