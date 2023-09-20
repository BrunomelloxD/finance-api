import { Request } from 'express'

import { prismaClient } from '../../infra/database/prismaClient'

import { ResponseGenericTypes } from '../../types/types'

class GetAllCardModel {
    async handle(
        request: Request,
        id: string,
        name: string
    ): Promise<ResponseGenericTypes> {
        try {
            if (!id) {
                return {
                    success: false,
                    code: 404,
                    message: 'User not found'
                }
            }

            if (!name) {
                const cards = await prismaClient.card.findMany({
                    where: {
                        userId: id
                    }
                })

                return {
                    success: true,
                    code: 200,
                    cards: cards
                }
            }

            const cards = await prismaClient.card.findMany({
                where: {
                    userId: id,
                    name: {
                        contains: name,
                        mode: 'insensitive'
                    }
                }
            })
            return {
                success: true,
                code: 200,
                cards: cards
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

export default new GetAllCardModel()
