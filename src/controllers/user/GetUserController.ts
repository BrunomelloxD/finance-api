import { Request, Response } from 'express'
import { prismaClient } from '../../infra/database/prismaClient'

class GetUserController {
    async handle(request: Request, response: Response) {
        const { id } = request.params
        try {
            const user = await prismaClient.user.findUniqueOrThrow({
                where: {
                    id: id
                },
                include: {
                    card: true,
                    spendCreditCard: true
                }
            })

            return response.json({
                user
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
