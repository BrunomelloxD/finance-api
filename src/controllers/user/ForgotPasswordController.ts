import crypto from 'crypto'
import { Request, Response } from 'express'

import sendEmail from '../../config/nodemailer'

import { prismaClient } from '../../infra/database/prismaClient'

class RestorePasswordController {
    async handle(request: Request, response: Response) {
        const { email } = request.body

        try {
            const user = await prismaClient.user.findUnique({
                where: { email }
            })

            if (!user) {
                return response.status(404).json({ message: 'User not found' })
            }

            const id = user.id
            const resetToken = crypto.randomBytes(20).toString('hex')
            const now = new Date()
            now.setHours(now.getHours() + 1)

            await prismaClient.user.update({
                where: { id: id },
                data: {
                    passwordResetToken: resetToken,
                    passwordResetExpires: now
                }
            })

            await sendEmail(email, resetToken)

            return response.status(200).json({ message: 'Email sent' })

            // console.log(resetToken, now)
        } catch (error) {
            console.error(error)
            return response.status(500).json({ 'Internal server error': error })
        }
    }
}
export default new RestorePasswordController()
