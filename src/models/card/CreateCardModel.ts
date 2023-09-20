import { Request } from 'express'

import { prismaClient } from '../../infra/database/prismaClient'

import { ResponseGenericTypes } from '../../types/types'
class CreateCardModel {
    async handle(
        request: Request,
        user_id: string,
        name: string,
        final_code: number
    ): Promise<ResponseGenericTypes> {
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

            return {
                success: true,
                code: 201
            }
        } catch (error) {
            return {
                success: false,
                code: 500,
                message: `Internal server error: ${error}`
            }
        }
    }
}

export default new CreateCardModel()
