import { Request } from 'express'
import { prismaClient } from '../../infra/database/prismaClient'

import { ResponseGenericTypes } from '../../types/types'

class CreateSpendDebitCardModel {
    async handle(
        request: Request,
        value: number,
        card_id: string,
        description: string,
        user_id: string
    ): Promise<ResponseGenericTypes> {
        try {
            const card = await prismaClient.card.findFirst({
                where: {
                    id: card_id,
                    userId: user_id
                }
            })

            if (!card) {
                return {
                    success: false,
                    code: 400,
                    message: 'Card does not belong to the specified user'
                }
            }

            await prismaClient.spendDebitCard.create({
                data: {
                    value: value,
                    description: description,
                    cardId: card_id,
                    userId: user_id
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

export default new CreateSpendDebitCardModel()
