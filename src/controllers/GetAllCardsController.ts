import { Request, Response } from 'express'
import { prismaClient } from '../infra/database/prismaClient'

class GetAllCardsController {
    async handle(request: Request, response: Response) {
        try {
            const cards = await prismaClient.cards.findMany()

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

export default new GetAllCardsController()
