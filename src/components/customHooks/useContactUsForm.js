import { useState } from 'react'

const useContactUsForm = (callback) => {

    const [values, setValues] = useState({ name: '', email: '', message: '' })


    const handleSubmit = (event) => {
        event.preventDefault()
        callback(values)
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
        handleChange
    }
}
export default useContactUsForm