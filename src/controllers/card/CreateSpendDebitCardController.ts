import { Request, Response } from 'express'
import { prismaClient } from '../../infra/database/prismaClient'

class CreateSpendDebitCardController {
    async handle(request: Request, response: Response) {
        const { value, card_id, description, user_id } = request.body

        try {
            const spendDebit = await prismaClient.spendDebitCard.create({
                data: {
                    value: value,
                    description: description,
                    cardId: card_id,
                    userId: user_id
                }
            })
            return response.status(201).json(spendDebit)
        } catch (error) {
            console.error(error)
            return response.status(500).json({ error: 'Internal server error' })
        }
    }
}

export default new CreateSpendDebitCardController()
