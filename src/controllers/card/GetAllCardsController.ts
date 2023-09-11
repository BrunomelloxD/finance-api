import { Request, Response } from 'express'

import { prismaClient } from '../../infra/database/prismaClient'

class GetAllCardsController {
    async handle(request: Request, response: Response) {
        const { id, name } = request.body
        try {
            if (!id) {
                return response.status(404).json({
                    message: 'User not found'
                })
            }

            if (!name) {
                const cards = await prismaClient.card.findMany({
                    where: {
                        userId: id
                    }
                })

                return response.status(200).json(cards)
            } else if (name) {
                const cards = await prismaClient.card.findMany({
                    where: {
                        userId: id,
                        name: {
                            contains: name,
                            mode: 'insensitive'
                        }
                    }
                })
                return response.status(200).json(cards)
            }
        } catch (error) {
            console.error(error)
            return response.status(500).json({
                message: 'Internal server error'
            })
        }
    }
}

export default new GetAllCardsController()
