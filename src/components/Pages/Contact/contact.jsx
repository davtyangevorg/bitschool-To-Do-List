import React from 'react'

import { useDispatch } from 'react-redux'

import { sendMessage } from '../../../redux/contact-reducer.js'

import styles from './contact.module.scss'

import { IoWarning } from 'react-icons/all'

import useContactUsForm from '../../customHooks/useContactUsForm.js'
import contactUsFormValidate from '../../Features/contactUsFormValidate.js'

const Contact = () => {
    const dispatch = useDispatch()

    const { values, handleSubmit, handleChange, errors } = useContactUsForm(callback, contactUsFormValidate)

    function callback(data) {
        dispatch(sendMessage(data))
    }

    return (
        <div className={styles.contackUs_box}>
            <h4>Still looking for an answer?</h4>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.input_wrap}>
                    <label htmlFor="name">Name</label>
                    <input
                        id='name'
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        className={errors.name ? styles.errorBorder : ''}
                    />
                    {errors.name && <div className={styles.error}>
                        <IoWarning />
                        <span>{errors.name}</span>
                    </div>}
                </div>
                <div className={styles.input_wrap}>
                    <label htmlFor="email">Email</label>
                    <input
                        id='email'
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        className={errors.email ? styles.errorBorder : ''}
                    />
                    {errors.email && <div className={styles.error}>
                        <IoWarning />
                        <span>{errors.email}</span>
                    </div>}
                </div>
                <div className={styles.input_wrap}>
                    <label htmlFor="message">Message</label>
                    <textarea
                        id='message'
                        name='message'
                        value={values.message}
                        onChange={handleChange}
                        className={errors.message ? styles.errorBorder : ''}
                    >
                    </textarea>
                    {errors.message && <div className={styles.error}>
                        <IoWarning />
                        <span>{errors.message}</span>
                    </div>}
                </div>

                <button>
                    Send
                </button>
            </form>
        </div>
    )
}

export default Contact
