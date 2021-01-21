import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'

import styles from './editeTaskFormModal.module.scss'
import { animated, useSpring } from 'react-spring'

import { RiCloseLine } from 'react-icons/all'

const EditTaskFormModal = ({ taskForEdit, togleIsShowEditTaskForm, editTask }) => {

    const [isShowEditeTaskFormLocal, setIsShowEditeTaskFormLocal] = useState(false)
    const [values, setValues] = useState({ title: taskForEdit.title, description: taskForEdit.description })

    useEffect(() => {
        setIsShowEditeTaskFormLocal(true)
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        if (values.title) {
            editTask({
                _id: taskForEdit._id,
                title: values.title,
                description: values.description
            })
        }
    }
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const onHeaderClick = event => {
        if (event.target === event.currentTarget) {
            togleIsShowEditTaskForm()
        }
    }

    const taskBack = useSpring({
        display: isShowEditeTaskFormLocal ? 'block' : 'none'
    })
    const taskBackgroundAnime = useSpring({
        opacity: isShowEditeTaskFormLocal ? 1 : 0,
        config: { duration: 300 }
    })
    const taskInnerAnime = useSpring({
        transform: isShowEditeTaskFormLocal ? 'translateY(20%)' : 'translateY(5%)',
        config: { duration: 300 }
    })

    return (
        <animated.div style={taskBack}>
            <animated.div style={taskBackgroundAnime} className={styles.modal_background} onClick={onHeaderClick}>
                <animated.div style={taskInnerAnime} className={styles.modal_inner} >
                    <div className={styles.modal_title}>
                        <h3>Add Task</h3>
                        <RiCloseLine onClick={togleIsShowEditTaskForm} />
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
                            <span onClick={togleIsShowEditTaskForm}>Cancel</span>
                            <button >Edit Task</button>
                        </div>
                    </form>
                </animated.div>
            </animated.div>
        </animated.div>
    )
}

EditTaskFormModal.propTypes = {
    taskForEdit: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string
    }).isRequired,
    togleIsShowEditTaskForm: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired
}

export default EditTaskFormModal
