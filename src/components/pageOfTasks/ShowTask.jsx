import React, { useState } from 'react';
import '../../styles/pageOfTasks.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faCheck, faXmark, faRotateRight } from '@fortawesome/free-solid-svg-icons';

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
              <button className='complete-hide btn' onClick={() => incompleteTask(task.id)} type="button"><FontAwesomeIcon icon={faXmark} size="2xl" style={{ color: "#878787", }} /></button>
            ) : (
              selectedTaskIndex !== task.id && (
                <button className='btn-complete btn' onClick={() => completeTask(task.id)} type="button"><FontAwesomeIcon icon={faCheck} size="2xl" style={{ color: "#006602", }} /></button>
              )
            )}
            {selectedTaskIndex === task.id ? (
              <>
                <button className="btn" onClick={() => updateTask(task.id)}><FontAwesomeIcon icon={faRotateRight} size="2xl" style={{color: "#0071c7",}} /></button>
                <button className="btn" onClick={() => setSelectedTaskIndex(-1)}><FontAwesomeIcon icon={faXmark} size="2xl" style={{color: "#c20000",}}/></button>
              </>
            ) : (
              <button className={`${task.completed ? "btn complete-hide" : "btn complete-show"}`} onClick={() => handleEditClick(task.id)}><FontAwesomeIcon icon={faPen} size="xl" style={{color: "#949494",}} /></button>
            )}

            {selectedTaskIndex !== task.id && (
              <button className='btn' onClick={() => deleteTask(task.id)}><FontAwesomeIcon icon={faTrash} size="xl" style={{color: "#c20000",}} /></button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ShowTask;
