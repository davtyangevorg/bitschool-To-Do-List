import { useState, useEffect } from 'react'

const useContactUsForm = (callback, contactUsFormValidate) => {

    const [values, setValues] = useState({ name: '', email: '', message: '' })
    const [errors, setErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit) {
            callback(values)
        }
        // eslint-disable-next-line
    }, [errors, isSubmit])

    const nulledValues=()=>{
        setValues({name:'',email:'',message:''})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setErrors(contactUsFormValidate(values))
        setIsSubmit(true)
    }

    const handleChange = (event) => {

        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    return {
        values,
        handleSubmit,
        handleChange,
        errors,
        nulledValues
    }
}
export default useContactUsForm