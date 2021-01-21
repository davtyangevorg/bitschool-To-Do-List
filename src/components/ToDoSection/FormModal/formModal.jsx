import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'

import styles from './formModal.module.scss'
import { animated, useSpring } from 'react-spring'

import { RiCloseLine } from 'react-icons/all'

import { v4 as uuidv4 } from 'uuid';


const FormModal = ({ modalTitle, handleTask, setIsShowModal, taskForEdit }) => {

    const defaultValueTitle = modalTitle === 'Add Task' ? '' : taskForEdit.title
    const defaultValueDescription = modalTitle === 'Add Task' ? '' : taskForEdit.description

    const [values, setValues] = useState({
        title: defaultValueTitle,
        description: defaultValueDescription
    })
    const [isShowModalLocal, setIsShowModalLocal] = useState(false)

    useEffect(() => {
        setIsShowModalLocal(true)
    }, [])

    const handleSubmit = (event) => {

        event.preventDefault()

        if (values.title) {
            if (modalTitle === 'Add Task') {
                handleTask(
                    {
                        _id: uuidv4(),
                        title: values.title,
                        description: values.description
                    }
                )
                setIsShowModal(false)
            } else {
                handleTask({
                    _id: taskForEdit._id,
                    title: values.title,
                    description: values.description
                })
            }
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
            setIsShowModal(false)
        }
    }

    const taskBack = useSpring({
        display: isShowModalLocal ? 'block' : 'none'
    })
    const taskBackgroundAnime = useSpring({
        opacity: isShowModalLocal ? 1 : 0,
        config: { duration: 200 }
    })
    const taskInnerAnime = useSpring({
        transform: isShowModalLocal ? 'translateY(20%)' : 'translateY(5%)',
        config: { duration: 200 }
    })

    return (
        <animated.div style={taskBack}>
            <animated.div style={taskBackgroundAnime} className={styles.modal_background} onClick={onHeaderClick}>
                <animated.div style={taskInnerAnime} className={styles.modal_inner} >
                    <div className={styles.modal_title}>
                        <h3>{modalTitle}</h3>
                        <RiCloseLine onClick={() => { setIsShowModal(false) }} />
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
                            <span onClick={() => { setIsShowModal(false) }}>Cancel</span>
                            <button >{modalTitle}</button>
                        </div>
                    </form>
                </animated.div>
            </animated.div>
        </animated.div>
    )
}

FormModal.propTypes = {
    modalTitle: PropTypes.string.isRequired,
    handleTask: PropTypes.func.isRequired,
    setIsShowModal: PropTypes.func.isRequired,
    taskForEdit: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string
    })
}

export default FormModal
