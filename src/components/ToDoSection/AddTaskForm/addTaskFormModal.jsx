import React, { useState, useContext } from 'react'

import PropTypes from 'prop-types'

import styles from './addTaskFormModal.module.scss'
import { animated, useSpring } from 'react-spring'

import { RiCloseLine } from 'react-icons/all'

import { v4 as uuidv4 } from 'uuid';

import { AddTaskModalContext } from '../../../context.js'

const AddTaskFormModal = ({ createTask }) => {

    const [values, setValues] = useState({ title: '', description: '' })

    const { isShowAddTaskFormModal, setIsShowAddTaskFormModal } = useContext(AddTaskModalContext)

    const handleSubmit = (event) => {
        event.preventDefault()
        if (values.title) {
            createTask(
                {
                    _id: uuidv4(),
                    title: values.title,
                    description: values.description
                }
            )
            setValues({
                title: '', description: ''
            })
            setIsShowAddTaskFormModal(false)
        }
    }
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const taskBack = useSpring({
        display: isShowAddTaskFormModal ? 'block' : 'none'
    })
    const taskBackgroundAnime = useSpring({
        opacity: isShowAddTaskFormModal ? 1 : 0,
        config: { duration: 200 }
    })
    const taskInnerAnime = useSpring({
        transform: isShowAddTaskFormModal ? 'translateY(20%)' : 'translateY(5%)',
        config: { duration: 200 }
    })

    return (
        <animated.div style={taskBack}>
            <animated.div style={taskBackgroundAnime} className={styles.modal_background} >
                <animated.div style={taskInnerAnime} className={styles.modal_inner} >
                    <div className={styles.modal_title}>
                        <h3>Add Task</h3>
                        <RiCloseLine onClick={() => { setIsShowAddTaskFormModal(false) }} />
                    </div>
                    <div className={styles.line}></div>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.form_div}>
                            <input
                                id='title'
                                name='title'
                                value={values.title}
                                onChange={handleChange}
                                placeholder='Title'
                            />
                            <label htmlFor="title">Title</label>
                        </div>
                        <div className={styles.form_div}>
                            <textarea
                                id='description'
                                name='description'
                                value={values.description}
                                onChange={handleChange}
                                placeholder='Description'
                                rows='4'
                            />
                            <label htmlFor="description">Description</label>
                        </div>
                        <div className={styles.line}></div>
                        <div className={styles.form_bnts}>
                            <span onClick={() => { setIsShowAddTaskFormModal(false) }}>Cancel</span>
                            <button >Create Task</button>
                        </div>
                    </form>
                </animated.div>
            </animated.div>
        </animated.div>
    )
}

AddTaskFormModal.propTypes = {
    createTask: PropTypes.func.isRequired
}

export default AddTaskFormModal
