import React, { useContext } from 'react'

import {useDispatch} from 'react-redux'

import {setIsShowAddTaskFormModalAction} from '../../../../redux/toDo-reducer.js'

import PropTypes from 'prop-types'

import styles from './tasks.module.scss'
import { Col} from 'react-bootstrap'

import taskNote from '../../../../images/taskNote.svg'
import { FaPlus } from 'react-icons/fa'

import TasksGrid from '../TasksGrid/tasksGrid.jsx'
import TasksList from '../TasksList/tasksList.jsx'

import { ListOrGridSwitchContext } from '../../../../context.js'

const Tasks = ({ tasks, selectedTasksIds, deleteTask, togleSelectTask, getTaskForEdit }) => {

    const switchName = useContext(ListOrGridSwitchContext)

    const dispatch = useDispatch()

    return (
        <>
            {tasks.length
                ? switchName === 'list'
                    ? <TasksList
                        tasks={tasks}
                        deleteTask={deleteTask}
                    />
                    : <TasksGrid
                        tasks={tasks}
                        selectedTasksIds={selectedTasksIds}
                        deleteTask={deleteTask}
                        togleSelectTask={togleSelectTask}
                        getTaskForEdit={getTaskForEdit}
                    />
                : <Col>
                    <div className={styles.notTasks}>
                        <img alt='taskNote' src={taskNote}></img>
                        <h3>Create your first task</h3>
                        <p>You do not have any tasks yet</p>
                        <button onClick={() => { dispatch(setIsShowAddTaskFormModalAction(true)) }} >
                            <FaPlus size='1rem' />
                        </button>
                    </div>
                </Col>
            }
        </>
    )
}

Tasks.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string
    })).isRequired,
    selectedTasksIds: PropTypes.instanceOf(Set).isRequired,
    deleteTask: PropTypes.func.isRequired,
    togleSelectTask: PropTypes.func.isRequired,
    getTaskForEdit: PropTypes.func.isRequired
}

export default Tasks