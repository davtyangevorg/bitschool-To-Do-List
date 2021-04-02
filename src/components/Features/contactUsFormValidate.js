const regexp=/^(([^<>()[\],;:\s@]+(\.[^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+)+[^<>()[\],;:\s@]{2,})$/i

const contactUsFormValidate = (values) => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Name is required'
    }
    if (!values.email) {
        errors.email = 'Email is required'
    } else if (!(regexp.test(values.email))) {
        errors.email = 'Email is not correct'
    }
    if (!values.message) {
        errors.message = 'Message is required'
    }
    return errors
}

export default contactUsFormValidate
