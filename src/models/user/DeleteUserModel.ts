import { Request } from 'express'

import { prismaClient } from '../../infra/database/prismaClient'

import { ResponseGenericTypes } from '../../types/types'

class DeleteUserModel {
    async handle(request: Request, id: string): Promise<ResponseGenericTypes> {
        try {
            const user = await prismaClient.user.delete({
                where: {
                    id
                }
            })

            return {
                success: true,
                code: 200
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
export default new DeleteUserModel()
