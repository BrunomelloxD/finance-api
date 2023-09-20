import { Request, Response } from 'express'

import ForgotPasswordModel from '../../models/user/ForgotPasswordModel'

class RestorePasswordController {
    async handle(request: Request, response: Response) {
        const { email } = request.body

        try {
            const repository = await ForgotPasswordModel.handle(request, email)
            const { success, code, message } = repository

            if (success) {
                return response.status(code).send()
            }

            return response.status(code).json({
                message: message
            })
        } catch (error) {
            console.error(error)
            return response.status(500).json({ 'Internal server error': error })
        }
    }
}
export default new RestorePasswordController()
