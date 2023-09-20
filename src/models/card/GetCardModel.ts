import { Request } from 'express'

import { prismaClient } from '../../infra/database/prismaClient'

import { ResponseGenericTypes } from '../../types/types'

class GetCardModel {
    async handle(
        request: Request,
        user_id: string,
        card_id: string,
        start_data: string,
        end_data: string
    ): Promise<ResponseGenericTypes> {
        const INITIAL_HOUR = 'T00:00:00.000Z'
        const FINAL_HOUR = 'T23:59:59.999Z'

        try {
            const card = await prismaClient.card.findUnique({
                where: {
                    userId: user_id,
                    id: card_id
                },
                include: {
                    spendCreditCards: {
                        where: {
                            created_at: {
                                gte: start_data
                                    ? new Date(start_data + INITIAL_HOUR)
                                    : undefined,
                                lte: end_data
                                    ? new Date(end_data + FINAL_HOUR)
                                    : undefined
                            }
                        }
                    },
                    spendDebitCards: {
                        where: {
                            created_at: {
                                gte: start_data
                                    ? new Date(start_data + INITIAL_HOUR)
                                    : undefined,
                                lte: end_data
                                    ? new Date(end_data + FINAL_HOUR)
                                    : undefined
                            }
                        }
                    }
                }
            })

            if (!card) {
                return {
                    success: false,
                    code: 404,
                    message: 'Card not found'
                }
            }

            return {
                success: true,
                code: 200,
                card: [card]
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

export default new GetCardModel()
