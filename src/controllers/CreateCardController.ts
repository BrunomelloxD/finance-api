import { Request, Response } from 'express'
import { prismaClient } from '../infra/database/prismaClient'

class CreateCardController {
    async handle(request: Request, response: Response) {
        const { user_id, name, final_code } = request.body
        const card = await prismaClient.cards.create({
            data: {
                name,
                final_code,
                User: {
                    connect: { id: user_id }
                }
            }
        })
    }
}

export default new CreateCardController()
