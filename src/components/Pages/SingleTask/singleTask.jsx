import React, { useState, useEffect } from 'react'

import { Container, Row, Col } from 'react-bootstrap'
import styles from './singleTask.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

import FormModal from '../ToDoSection/FormModal/formModal.jsx'

const SingleTask = (props) => {

    const { taskId } = props.match.params
    const [task, setTask] = useState(null)
    const [isShowEditeTaskForm, setIsShowEditeTaskForm] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(async response => {
                const res = await response.json()

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error
                    } else {
                        throw new Error('Error')
                    }
                }

                setTask(res)

            })
            .catch(error => {
                console.log(error)
            })
    }, [taskId])

    const deleteTask = () => {
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(async response => {
                const res = await response.json()

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error
                    } else {
                        throw new Error('Error')
                    }
                }

                props.history.push('/')

            })
            .catch(error => {
                console.log(error)
            })
    }

    const togleIsShowEditTaskForm = () => {
        setIsShowEditeTaskForm(!isShowEditeTaskForm)
    }
    const editTask = (editedTask) => {

        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedTask)
        })
            .then(async response => {
                const res = await response.json()

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error
                    } else {
                        throw new Error('Error')
                    }
                }

                setTask(res)
                togleIsShowEditTaskForm()

            })
            .catch(error => {
                console.log(error)
            })

    }
    //console.log(task)
    return (
        <Container>
            <Row>
                <Col>
                    {
                        task ?
                            <div className={styles.task}>
                                <h3>{task.title}</h3>
                                <div className={styles.task_descriprion}>{task.description}</div>
                                <div className={styles.task_footer}>
                                    <div>Date: {task.date.slice(0, 10)}</div>
                                    <div>
                                        <button
                                            className={styles.task_editBtn}
                                            onClick={() => { togleIsShowEditTaskForm() }}
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                            className={styles.task_deleteBtn}
                                            onClick={deleteTask}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            : null
                    }

                </Col>
            </Row>
            {isShowEditeTaskForm && <FormModal
                modalTitle='Edit Task'
                handleTask={editTask}
                setIsShowModal={togleIsShowEditTaskForm}
                taskForEdit={task}
            />}
        </Container>
    )
}

export default SingleTask
