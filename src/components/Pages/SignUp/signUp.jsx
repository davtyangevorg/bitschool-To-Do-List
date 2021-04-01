import React from 'react'

//import { useDispatch } from 'react-redux'

//import { sendMessage } from '../../../redux/contact-reducer.js'

import styles from './signUp.module.scss'

import { IoWarning } from 'react-icons/all'

import useSignUpForm from '../../customHooks/useSignUpForm.js'
import signUpFormValidate from '../../Features/signUpFormValidate.js'

const SignUp = () => {
    //const dispatch = useDispatch()

    const { values, handleSubmit, handleChange, errors } = useSignUpForm(callback, signUpFormValidate)

    function callback(data) {
        console.log(data)
        //dispatch(sendMessage(data))
    }

    return (
        <div  className={styles.signUp_box}>
            <h4>Sign Up</h4>
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
                    <label htmlFor="surname">Surname</label>
                    <input
                        id='surname'
                        name="surname"
                        value={values.surname}
                        onChange={handleChange}
                        className={errors.surname ? styles.errorBorder : ''}
                    />
                    {errors.surname && <div className={styles.error}>
                        <IoWarning />
                        <span>{errors.surname}</span>
                    </div>}
                </div>
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
                <div className={styles.input_wrap}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id='confirmPassword'
                        name='confirmPassword'
                        type='password'
                        value={values.confirmPassword}
                        onChange={handleChange}
                        className={errors.confirmPassword ? styles.errorBorder : ''}
                        autoComplete=''
                    >
                    </input>
                    {errors.confirmPassword && <div className={styles.error}>
                        <IoWarning />
                        <span>{errors.confirmPassword}</span>
                    </div>}
                </div>

                <button>
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default SignUp
