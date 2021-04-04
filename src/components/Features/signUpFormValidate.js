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
    }else if (values.password.length<6){
        errors.password='You have to enter at least 6 digits!'
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm Password  is required'
    }else if (values.confirmPassword.length<6){
        errors.confirmPassword='You have to enter at least 6 digits!'
    }
    return errors
}

export default signUpFormValidate
