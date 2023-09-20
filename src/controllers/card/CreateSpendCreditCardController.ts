import { Request, Response } from 'express'

import CreateSpendCreditCardModel from '../../models/card/CreateSpendCreditCardModel'

class CreateSpendCreditCardController {
    async handle(request: Request, response: Response) {
        const { value, card_id, description, user_id } = request.body

        try {
            const repository = await CreateSpendCreditCardModel.handle(
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
            return response
                .status(500)
                .json({ message: `Internal server error:${error}` })
        }
    }
}

export default new CreateSpendCreditCardController()
