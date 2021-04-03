import React from 'react'

import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { textTruncate } from '../../../../utils.js'

import PropTypes from 'prop-types'

import styles from './tasksGrid.module.scss'
import { Row, Col } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

import { changeTaskStatus } from '../../../../redux/toDo-reducer.js'

const TasksGrid = ({ tasks, selectedTasksIds, deleteTask, togleSelectTask, getTaskForEdit }) => {

    const dispatch = useDispatch()

    const changeStatus = (taskId, status) => {
        dispatch(changeTaskStatus(taskId, status))
    }

    return (
        <Row style={{ overflowY: 'scroll', height: '630px' }}>
            {tasks.map(el => {
                return <Col key={el._id} md={6} lg={4} xl={3} >
                    <div className={styles.task} >
                        <input
                            type='checkbox'
                            onChange={() => { togleSelectTask(el._id) }}
                        />
                        <h4>
                            <Link to={`/task/${el._id}`}>
                                {textTruncate(el.title, 10)}
                            </Link>
                        </h4>
                        <p>{textTruncate(el.description, 20)}</p>
                        <p>{el.date.slice(0, 10)}</p>
                        <p>Created : {el.created_at.slice(0, 10)}</p>
                        <p>Status : {el.status === 'active' ? 'done' : 'active'}</p>
                        <button
                            onClick={() => { getTaskForEdit(el) }}
                            className={styles.task_editBtn}
                            disabled={!!selectedTasksIds.size}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                            className={styles.task_deleteBtn}
                            disabled={!!selectedTasksIds.size}
                            onClick={() => { deleteTask(el._id) }}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button
                            className={styles.statusBtn}
                            onClick={() => changeStatus(el._id, el.status)}
                        >
                            {el.status}
                        </button>
                    </div>
                </Col>
            })}
        </Row>
    )

}

TasksGrid.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string
    })),
    selectedTasksIds: PropTypes.instanceOf(Set),
    deleteTask: PropTypes.func.isRequired,
    togleSelectTask: PropTypes.func.isRequired,
    getTaskForEdit: PropTypes.func.isRequired
}

export default TasksGrid
