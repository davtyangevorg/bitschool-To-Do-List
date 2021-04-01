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
    } else if (!(/^[\w]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email))) {
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

///^([a-z,A-Z,\d,-]+)@([a-z,\d,-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/