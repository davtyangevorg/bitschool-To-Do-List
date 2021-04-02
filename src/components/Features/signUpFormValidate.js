const regexp=/^(([^<>()[\],;:\s@]+(\.[^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+)+[^<>()[\],;:\s@]{2,})$/i


const signUpFormValidate = (values) => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Name is required'
    }
    if (!values.surname) {
        errors.surname = 'SurName is required'
    }
    if (!values.email) {
        errors.email = 'Email is required'
    } else if (!(regexp.test(values.email))) {
        errors.email = 'Email is not correct'
    }
    if (!values.password) {
        errors.password = 'Password is required'
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm Password  is required'
    }
    return errors
}

export default signUpFormValidate
