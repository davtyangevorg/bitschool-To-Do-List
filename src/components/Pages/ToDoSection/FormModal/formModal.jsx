import React, { useState, useEffect,useRef } from 'react'

import PropTypes from 'prop-types'

import styles from './formModal.module.scss'
import { animated, useSpring } from 'react-spring'

import { RiCloseLine, MdDateRange } from 'react-icons/all'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const FormModal = ({ modalTitle, handleTask, setIsShowModal, taskForEdit }) => {

    const defaultValueTitle = modalTitle === 'Add Task' ? '' : taskForEdit.title
    const defaultValueDescription = modalTitle === 'Add Task' ? '' : taskForEdit.description
    const defaultValueDate = modalTitle === 'Add Task' ? new Date() : new Date(taskForEdit.date)


    const [values, setValues] = useState({
        title: defaultValueTitle,
        description: defaultValueDescription,
        date: defaultValueDate
    })
    const [isShowModalLocal, setIsShowModalLocal] = useState(false)

    // state for datepicker
    const [isOpenCalendar, setIsOpenCalendar] = useState(false)
    const ref = React.createRef()

    const inputTitleRef = useRef()

    useEffect(() => {
        setIsShowModalLocal(true)
        inputTitleRef.current.focus()
    }, [])



    const handleSubmit = (event) => {

        event.preventDefault()

        if (values.title) {
            if (modalTitle === 'Add Task') {
                handleTask(
                    {
                        title: values.title,
                        description: values.description,
                        date: values.date.toISOString().slice(0, 10)
                    }
                )
            } else {
                handleTask({
                    _id: taskForEdit._id,
                    title: values.title,
                    description: values.description,
                    date: values.date.toISOString().slice(0, 10)
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
    const handleChangeDateForAnything = value => {
        setValues({
            ...values,
            date: value
        })
    }
    const DateCustomInput = React.forwardRef((props, ref) => {

        return (
            <div className={styles.date_div_inner}>
                <label style={isOpenCalendar ? { color: '#99C248' } : null} onClick={props.onClick}>Date</label>
                <div className={styles.date} onClick={props.onClick} ref={ref}>
                    {props.value}
                </div>
                <MdDateRange size='1.3rem' onClick={props.onClick} />
            </div>
        )

    })

    const onHeaderClick = event => {
        if (event.target === event.currentTarget) {
            setIsShowModal(false)
        }
    }

    // const taskBack = useSpring({
    //     display: isShowModalLocal ? 'block' : 'none'
    // })
    const taskBackgroundAnime = useSpring({
        opacity: isShowModalLocal ? 1 : 0,
        config: { duration: 200 }
    })
    const taskInnerAnime = useSpring({
        transform: isShowModalLocal ? 'translateY(20%)' : 'translateY(5%)',
        config: { duration: 200 }
    })

    return (
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
                            ref={inputTitleRef}
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
                    <DatePicker
                        minDate={new Date()}
                        selected={values.date}
                        onChange={handleChangeDateForAnything}
                        onCalendarOpen={() => { setIsOpenCalendar(true) }}
                        onCalendarClose={() => { setIsOpenCalendar(false) }}
                        dateFormat="MMMM d, yyyy"
                        placeholderText='Select Date'
                        customInput={<DateCustomInput ref={ref} />}
                    />

                    <div className={styles.line}></div>
                    <div className={styles.form_bnts}>
                        <span onClick={() => { setIsShowModal(false) }}>Cancel</span>
                        <button >{modalTitle}</button>
                    </div>
                </form>
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
