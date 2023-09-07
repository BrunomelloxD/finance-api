import { Request, Response } from 'express'
import { prismaClient } from '../../infra/database/prismaClient'

class GetCardExpensesController {
    async handle(request: Request, response: Response) {
        const { card_id } = request.body
        try {
            const card = await prismaClient.card.findUnique({
                where: {
                    id: card_id
                },
                include: {
                    spendCreditCards: true,
                    spendDebitCards: true
                }
            })

            if (!card) {
                return response.status(404).json({
                    message: 'Card not found'
                })
            }

            return response.json({
                card
            })
        } catch (error) {
            console.error(error)
            return response.status(500).json({
                message: 'Internal server error'
            })
        }
    }
}

export default new GetCardExpensesController()
