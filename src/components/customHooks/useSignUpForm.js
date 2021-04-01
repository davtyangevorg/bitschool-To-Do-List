import { useState, useEffect } from 'react'

const useLoginForm = (callback, loginValidate) => {
    const [values, setValues] = useState({ name: '', surname: '', email: '', password: '', confirmPassword: '' })
    const [errors, setErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit) {
            callback(values)
            setValues({ name: '', surname: '', email: '', password: '', confirmPassword: '' })
        }
        // eslint-disable-next-line
    }, [errors])

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(loginValidate(values))
        setIsSubmit(true)
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    return {
        values,
        handleSubmit,
        handleChange,
        errors
    }
}
export default useLoginForm