import { Request, Response } from 'express'
import { prismaClient } from '../../infra/database/prismaClient'

class GetUserCardsController {
    async handle(request: Request, response: Response) {
        const { user_id } = request.params
        try {
            const cards = await prismaClient.card.findMany({
                where: {
                    userId: user_id
                }
            })

            return response.json({
                cards
            })
        } catch (error) {
            console.error(error)
            return response.status(500).json({
                message: 'Internal server error'
            })
        }
    }
}

export default new GetUserCardsController()
