import { Request, Response } from 'express'
import { prismaClient } from '../infra/database/prismaClient'

class ListUsersController {
    async handle(request: Request, response: Response) {
        try {
            const users = await prismaClient.user.findMany()

            return response.json({
                users
            })
        } catch (error) {
            console.error(error)
            return response.status(500).json({
                message: 'Internal server error'
            })
        }
    }
}

export default new ListUsersController()
