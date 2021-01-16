import React from 'react'

import PropTypes from 'prop-types'

import styles from './tasksList.module.scss'
import { Col } from 'react-bootstrap'


const TasksList = ({ tasks, deleteTask }) => {

    return (
        <>
            <Col sm={12}>
                <div className={styles.tasks_title}>
                    <span>Title</span>
                    <span>Description</span>
                </div>
            </Col>
            {
                tasks.map(el => {
                    return (<Col sm={12} key={el._id}>
                        <div className={styles.task}>
                            <span>{el.title}</span>
                            <span>{el.description}</span>
                        </div>
                    </Col>)
                })
            }
        </>
    )
}

TasksList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string
    })).isRequired,
    deleteTask: PropTypes.func.isRequired
}

export default TasksList
