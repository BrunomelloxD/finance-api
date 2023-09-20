import { Request, Response } from 'express'

import AuthModel from '../../../models/auth/authModel'

class AuthController {
    async authenticate(request: Request, response: Response) {
        try {
            const { email, password } = request.body
            const repository = await AuthModel.handle(request, email, password)
            const { success, code, message, access_token, user } = repository

            if (success) {
                return response.status(code).json({
                    user,
                    access_token
                })
            }

            return response.status(code).json({
                message: message
            })
        } catch (error) {
            console.error('Error during authentication:', error)
            return response.status(500).json({ error: 'Internal server error' })
        }
    }
}

export default new AuthController()
