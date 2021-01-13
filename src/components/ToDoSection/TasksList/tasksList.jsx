import React from 'react'

import styles from './tasksList.module.scss'
import { Col } from 'react-bootstrap'

const ToDoList = ({ tasks, deleteTask }) => {

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

export default ToDoList
