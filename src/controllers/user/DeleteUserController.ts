import { Request, Response } from 'express'

import { prismaClient } from '../../infra/database/prismaClient'

class DeleteUserController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params

            const deleteUser = await prismaClient.user.delete({
                where: {
                    id: id
                }
            })

            if (deleteUser) {
                return response.status(200).json({
                    message: 'User deleted'
                })
            }
        } catch (error) {
            console.error(error)
        }
    }
}
export default new DeleteUserController()
