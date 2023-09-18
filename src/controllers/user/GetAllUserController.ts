import { Request, Response } from 'express'

import GetAllUserModel from '../../models/user/GetAllUserModel'

class GetAllUserController {
    async handle(request: Request, response: Response) {
        try {
            const users = await GetAllUserModel.handle(response)

            return response.status(200).json(users)
        } catch (error) {
            return response.status(500).json({
                message: 'Internal server error'
            })
        }
    }
}

export default new GetAllUserController()
