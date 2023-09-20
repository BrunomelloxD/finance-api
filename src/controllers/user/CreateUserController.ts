import { Request, Response } from 'express'

import CreateUserModel from '../../models/user/CreateUserModel'

class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, email, password } = request.body

        try {
            const repository = await CreateUserModel.handle(
                response,
                name,
                email,
                password
            )
            const { success, code, message } = repository

            if (success) {
                return response.status(code).send()
            }

            return response.status(code).json({
                message: message
            })
        } catch (error) {
            return response.status(500).json({
                message: `Internal server error: ${error}`
            })
        }
    }
}

export default new CreateUserController()
