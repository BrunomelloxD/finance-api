import { Request, Response } from 'express'

import GetAllCardModel from '../../models/card/GetAllCardModel'

class GetAllCardsController {
    async handle(request: Request, response: Response) {
        const { id, name } = request.body

        try {
            const repository = await GetAllCardModel.handle(request, id, name)
            const { success, code, message, cards } = repository

            if (success) {
                return response.status(code).json(cards)
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

export default new GetAllCardsController()
