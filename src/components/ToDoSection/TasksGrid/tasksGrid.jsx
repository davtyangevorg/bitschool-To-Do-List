import React, { useEffect, useContext } from 'react'

import PropTypes from 'prop-types'

import styles from './tasksGrid.module.scss'
import { Col } from 'react-bootstrap'

import { SelectedTasksIdsLengthContext } from '../../../context.js'

const TasksGrid = ({ tasks, selectedTasksIds, deleteTask, togleSelectTask }) => {

    const { setSelectedTasksIdsLength } = useContext(SelectedTasksIdsLengthContext)

    useEffect(() => {
        setSelectedTasksIdsLength(selectedTasksIds.size)
    }, [selectedTasksIds, setSelectedTasksIdsLength])

    return (
        tasks.map(el => {
            return <Col key={el._id} md={6} lg={4} xl={3} >
                <div className={styles.task} >
                    <input
                        type='checkbox'
                        onChange={() => { togleSelectTask(el._id) }}
                    />
                    <h4>{el.title}</h4>
                    <p>{el.description}</p>
                    <button disabled={!!selectedTasksIds.size} onClick={() => { deleteTask(el._id) }}>&#10062;</button>
                </div>
            </Col>
        })
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
    togleSelectTask: PropTypes.func.isRequired
}

export default TasksGrid