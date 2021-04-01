import React from 'react'

//import { useDispatch } from 'react-redux'

//import { sendMessage } from '../../../redux/contact-reducer.js'

import styles from './signIn.module.scss'

import { IoWarning } from 'react-icons/all'

import useSignInForm from '../../customHooks/useSignInForm.js'
import signInFormValidate from '../../Features/signInFormValidate.js'

const SignIn = () => {
    //const dispatch = useDispatch()

    const { values, handleSubmit, handleChange, errors } = useSignInForm(callback, signInFormValidate)

    function callback(data) {
        console.log(data)
        //dispatch(sendMessage(data))
    }

    return (
        <div  className={styles.signIn_box}>
            <h4>Sign Up</h4>
            <form onSubmit={handleSubmit} className={styles.form}> 
                <div className={styles.input_wrap}>
                    <label htmlFor="email">Email</label>
                    <input
                        id='email'
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        className={errors.email ? styles.errorBorder : ''}
                    >
                    </input>
                    {errors.email && <div className={styles.error}>
                        <IoWarning />
                        <span>{errors.email}</span>
                    </div>}
                </div>
                <div className={styles.input_wrap}>
                    <label htmlFor="password">Password</label>
                    <input
                        id='password'
                        type='password'
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                        className={errors.password ? styles.errorBorder : ''}
                        autoComplete=''
                    >
                    </input>
                    {errors.password && <div className={styles.error}>
                        <IoWarning />
                        <span>{errors.password}</span>
                    </div>}
                </div>

                <button>
                    Sign In
                </button>
            </form>
        </div>
    )
}

export default SignIn
