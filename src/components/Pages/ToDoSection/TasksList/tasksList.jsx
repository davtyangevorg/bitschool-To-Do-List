import React from 'react'

import PropTypes from 'prop-types'

import {Link} from 'react-router-dom'

import { textTruncate } from '../../../../utils.js'

import styles from './tasksList.module.scss'
import { Row, Col } from 'react-bootstrap'


const TasksList = ({ tasks }) => {
    return (
        <Row >
            <Col sm={12}>
                <div className={styles.tasks_title}>
                    <span>Title</span>
                    <span className={styles.descriptionTitle}>Description</span>
                </div>
            </Col>
            <div style={{ width: '100%', overflowY: 'auto', height: '620px' }}>
                {
                    tasks.map(el => {
                        return (<Col sm={12} key={el._id}>
                            <div className={styles.task}>
                                <Link to={`/task/${el._id}`}>{textTruncate(el.title, 10)}</Link>
                                <span className={styles.descriptionText}>{textTruncate(el.description, 20)}</span>
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
