import { Request, Response } from 'express'

import DeleteUserModel from '../../models/user/DeleteUserModel'

class DeleteUserController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params
            const repository = await DeleteUserModel.handle(request, id)

            const { success, code, message } = repository

            if (success) {
                return response.status(code).send()
            }

            return response.status(code).json({
                message: message
            })
        } catch (error) {
            console.error(error)
        }
    }
}
export default new DeleteUserController()
