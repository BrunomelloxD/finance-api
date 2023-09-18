import { Request } from 'express'

import { prismaClient } from '../../infra/database/prismaClient'

import { ResponseGenericTypes } from '../../types/types'

class GetUserModel {
    async handle(request: Request, id: string): Promise<ResponseGenericTypes> {
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    id: id
                },
                include: {
                    card: {
                        include: {
                            spendCreditCards: true,
                            spendDebitCards: true
                        }
                    }
                }
            })

            if (!user) {
                return {
                    success: false,
                    code: 404,
                    message: 'User not found'
                }
            }

            console.log(user)
            return {
                success: true,
                code: 200,
                user: user
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

export default new GetUserModel()
