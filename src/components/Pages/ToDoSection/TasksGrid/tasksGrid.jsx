import React from 'react'

import { Link } from 'react-router-dom'

import { textTruncate } from '../../../../utils.js'

import PropTypes from 'prop-types'

import styles from './tasksGrid.module.scss'
import { Row, Col } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

const TasksGrid = ({ tasks, selectedTasksIds, deleteTask, togleSelectTask, getTaskForEdit }) => {

    return (
        <Row style={{ overflowY: 'scroll', height: '700px' }}>
            {tasks.map(el => {
                return <Col key={el._id} md={6} lg={4} xl={3} >
                    <div className={styles.task} >
                        <input
                            type='checkbox'
                            onChange={() => { togleSelectTask(el._id) }}
                        />
                        <h4>
                            <Link to={`/task/${el._id}`}>
                                {el.title}
                            </Link>
                        </h4>
                        <p>{textTruncate(el.description, 20)}</p>
                        <p>{el.date.slice(0, 10)}</p>
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