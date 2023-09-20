import { Request, Response } from 'express'

import GetCardModel from '../../models/card/GetCardModel'

class GetCardExpensesController {
    async handle(request: Request, response: Response) {
        const { user_id, card_id, start_data, end_data } = request.body

        try {
            const repository = await GetCardModel.handle(
                request,
                user_id,
                card_id,
                start_data,
                end_data
            )

            const { success, code, message, card } = repository

            if (success) {
                return response.status(code).json(card)
            }

            return response.status(code).json({
                message: message
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
