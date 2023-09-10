import * as EmailValidator from 'email-validator'

const isValidEmail = (email: string) => {
    try {
        const isValidEmail = EmailValidator.validate(email)
        if (!isValidEmail) {
            return false
        }
        return true
    } catch (error) {
        console.error(error)
    }
}

export default isValidEmail
