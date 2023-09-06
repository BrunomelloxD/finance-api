import { Request, Response } from 'express'
import { prismaClient } from '../../infra/database/prismaClient'

class CreateCardController {
    async handle(request: Request, response: Response) {
        const { user_id, name, final_code } = request.body

        try {
            const card = await prismaClient.card.create({
                data: {
                    name,
                    final_code,
                    User: {
                        connect: { id: user_id }
                    }
                }
            })
            return response.status(201).json(card)
        } catch (error) {
            console.error(error)
            return response.status(500).json({ error: 'Internal server error' })
        }
    }
}

export default new CreateCardController()
