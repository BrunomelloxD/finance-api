import { Response } from 'express'

import { prismaClient } from '../../infra/database/prismaClient'

class GetAllUserModel {
    async handle(response: Response) {
        try {
            const users = await prismaClient.user.findMany()
            return users
        } catch (error) {
            return error
        }
    }
}

export default new GetAllUserModel()
