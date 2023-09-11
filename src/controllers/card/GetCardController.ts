import { Request, Response } from 'express'
import { prismaClient } from '../../infra/database/prismaClient'

class GetCardExpensesController {
    async handle(request: Request, response: Response) {
        const { user_id, card_id, start_data, end_data } = request.body
        const INITIAL_HOUR = 'T00:00:00.000Z'
        const FINAL_HOUR = 'T23:59:59.999Z'
        try {
            const card = await prismaClient.card.findUnique({
                where: {
                    userId: user_id,
                    id: card_id
                },
                include: {
                    spendCreditCards: {
                        where: {
                            created_at: {
                                gte: start_data
                                    ? new Date(start_data + INITIAL_HOUR)
                                    : undefined,
                                lte: end_data
                                    ? new Date(end_data + FINAL_HOUR)
                                    : undefined
                            }
                        }
                    },
                    spendDebitCards: {
                        where: {
                            created_at: {
                                gte: start_data
                                    ? new Date(start_data + INITIAL_HOUR)
                                    : undefined,
                                lte: end_data
                                    ? new Date(end_data + FINAL_HOUR)
                                    : undefined
                            }
                        }
                    }
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
