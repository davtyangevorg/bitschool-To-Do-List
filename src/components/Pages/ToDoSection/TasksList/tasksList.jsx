import React from 'react'

import PropTypes from 'prop-types'

import {textTruncate} from '../../../../utils.js'

import styles from './tasksList.module.scss'
import { Row, Col } from 'react-bootstrap'


const TasksList = ({ tasks, deleteTask }) => {

    return (
        <Row >
            <Col sm={12}>
                <div className={styles.tasks_title}>
                    <span>Title</span>
                    <span>Description</span>
                </div>
            </Col>
            <div style={{width:'100%',overflowY:'scroll',height:'700px'}}>
                {
                    tasks.map(el => {
                        return (<Col sm={12} key={el._id}>
                            <div className={styles.task}>
                                <span>{el.title}</span>
                                <span>{textTruncate(el.description, 20)}</span>
                            </div>
                        </Col>)
                    })
                }
            </div>
        </Row>
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
