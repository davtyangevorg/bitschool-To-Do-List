import React from 'react'

import styles from './contact.module.scss'

import useContactUsForm from '../../customHooks/useContactUsForm.js'

const Contact = () => {

    const { values, handleSubmit, handleChange } = useContactUsForm(callback)

    function callback(data) {
        
        fetch('http://localhost:3001/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
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

                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
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
                    />

                </div>
                <div className={styles.input_wrap}>
                    <label htmlFor="email">Email</label>
                    <input
                        id='email'
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.input_wrap}>
                    <label htmlFor="message">Message</label>
                    <textarea
                        id='message'
                        name='message'
                        value={values.message}
                        onChange={handleChange}
                    >
                    </textarea>
                </div>

                <button>
                    Send
                </button>
            </form>
        </div>
    )
}

export default Contact
