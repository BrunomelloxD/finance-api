import { Request, Response } from 'express'

import ResetPasswordModel from '../../models/user/ResetPasswordModel'

class ResetPassword {
    async handle(request: Request, response: Response) {
        const { email, password, token } = request.body

        try {
            const repository = await ResetPasswordModel.handle(
                request,
                email,
                password,
                token
            )
            const { success, code, message } = repository

            if (success) {
                return response.status(code).send()
            }

            return response.status(code).json({
                message: message
            })
        } catch (error) {
            return response.status(400).send(`Internal server error: ${error}`)
        }
    }
}
export default new ResetPassword()
