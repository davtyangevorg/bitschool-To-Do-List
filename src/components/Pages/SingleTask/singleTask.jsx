import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getTask, editTask, deleteSingleTask,changeTaskStatus } from '../../../redux/singleTask-reducer.js'

import { Container, Row, Col } from 'react-bootstrap'
import styles from './singleTask.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

import FormModal from '../ToDoSection/FormModal/formModal.jsx'

const SingleTask = (props) => {

    const { taskId } = props.match.params

    const [isShowEditeTaskForm, setIsShowEditeTaskForm] = useState(false)

    const task = useSelector(state => state.singleTaskReducer.task)

    const dispatch = useDispatch(getTask(taskId))

    useEffect(() => {
        dispatch(getTask(taskId))
    }, [taskId, dispatch])

    const deleteTask = () => {
        dispatch(deleteSingleTask(taskId))
    }

    const togleIsShowEditTaskForm = () => {
        setIsShowEditeTaskForm(!isShowEditeTaskForm)
    }
    const editeTask = (editedTask) => {
        dispatch(editTask(editedTask,togleIsShowEditTaskForm))
    }

    const changeStatus=(taskId,status)=>{
        dispatch(changeTaskStatus(taskId,status))
    }

    return (
        <Container>
            <Row>
                <Col>
                    {
                        task ?
                            <div className={styles.task}>
                                <h3 className={styles.task_title}>{task.title}</h3>
                                <div className={styles.task_descriprion}>{task.description}</div>
                                <div className={styles.task_footer}>
                                    <div>Date: {task.date.slice(0, 10)}</div>
                                    <p style={{margin:'0 10px'}}>Created : {task.created_at.slice(0, 10)}</p>
                                    <p>Status : {task.status}</p>
                                    <div>
                                        <button
                                            className={styles.statusBtn}
                                            onClick={() => changeStatus(task._id, task.status)}
                                        >
                                            {task.status === 'active' ? 'done' : 'active'}
                                        </button>
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
                handleTask={editeTask}
                setIsShowModal={togleIsShowEditTaskForm}
                taskForEdit={task}
            />}
        </Container>
    )
}

export default SingleTask
