const regexp=/^(([^<>()[\],;:\s@]+(\.[^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+)+[^<>()[\],;:\s@]{2,})$/i

const signUpFormValidate = (values) => {
    const errors = {}
    if (!values.email) {
        errors.email = 'Email is required'
    } else if (!(regexp.test(values.email))) {
        errors.email = 'Email is not correct'
    }
    if (!values.password) {
        errors.password = 'Password is required'
    }
    return errors
}

export default signUpFormValidate
