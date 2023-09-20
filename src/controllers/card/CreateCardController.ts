import { Request, Response } from 'express'

import CreateCardModel from '../../models/card/CreateCardModel'

class CreateCardController {
    async handle(request: Request, response: Response) {
        const { user_id, name, final_code } = request.body

        try {
            const repository = await CreateCardModel.handle(
                request,
                user_id,
                name,
                final_code
            )

            const { success, code, message } = repository

            if (success) {
                return response.status(code).send()
            }

            return response.status(code).json({
                message: message
            })
        } catch (error) {
            console.error(error)
            return response.status(500).json({ error: 'Internal server error' })
        }
    }
}

export default new CreateCardController()
