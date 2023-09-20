import { Request, Response } from 'express'

import CreateSpendDebitCardModel from '../../models/card/CreateSpendDebitCardModel'

class CreateSpendDebitCardController {
    async handle(request: Request, response: Response) {
        const { value, card_id, description, user_id } = request.body

        try {
            const repository = await CreateSpendDebitCardModel.handle(
                request,
                value,
                card_id,
                description,
                user_id
            )

            const { success, code, message } = repository

            if (success) {
                return response.status(code).send()
            }

            return response.status(code).json({
                message: message
            })
        } catch (error) {
            console.error(error)
            return response.status(500).json({ error: 'Internal server error' })
        }
    }
}

export default new CreateSpendDebitCardController()
