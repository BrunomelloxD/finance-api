import { Request, Response } from 'express'

import GetUserModel from '../../models/user/GetUserModel'

class GetUserController {
    async handle(request: Request, response: Response) {
        const { id } = request.params

        try {
            const repository = await GetUserModel.handle(request, id)

            const { success, code, message, user } = repository

            if (success) {
                return response.status(code).json({
                    user: user
                })
            }

            return response.status(code).json({
                message: message
            })
        } catch (error) {
            console.error(error)
            return response.status(500).json({
                message: 'Internal server error'
            })
        }
    }
}

export default new GetUserController()
