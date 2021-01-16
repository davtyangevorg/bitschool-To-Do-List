import React, { useEffect, useContext } from 'react'

import styles from './tasksGrid.module.scss'
import { Col } from 'react-bootstrap'

import { SelectedTasksIdsLengthContext } from '../../../context.js'

const TasksGrid = ({ tasks, selectedTasksIds, deleteTask, togleSelectTask }) => {

    const { setSelectedTasksIdsLength } = useContext(SelectedTasksIdsLengthContext)

    useEffect(() => {
        setSelectedTasksIdsLength(selectedTasksIds.size)
    }, [selectedTasksIds,setSelectedTasksIdsLength])

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

export default TasksGrid