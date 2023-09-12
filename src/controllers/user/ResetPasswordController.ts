import bcrypt from 'bcrypt'
import { Request, Response } from 'express'

import { prismaClient } from '../../infra/database/prismaClient'

class ResetPassword {
    async handle(request: Request, response: Response) {
        const { token, email, password } = request.body
        const saltRounds = 14
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    email
                }
            })

            if (!user) {
                return response.status(400).json({
                    message: 'User not found'
                })
            }

            const resetToken = user.passwordResetToken
            console.log('resetToken', resetToken)

            if (token != resetToken) {
                return response.status(400).json({
                    message: 'Invalid token'
                })
            }

            const expires = user.passwordResetExpires
            if (!expires) {
                return response.status(400).json({
                    message: 'Token expired'
                })
            }

            const now = new Date()
            if (now > expires) {
                return response.status(400).json({
                    message: 'Token expired'
                })
            }

            await prismaClient.user.update({
                where: {
                    email,
                    passwordResetToken: token
                },
                data: {
                    password: hashedPassword,
                    passwordResetToken: null,
                    passwordResetExpires: null
                }
            })

            return response.status(200).json({
                message: 'Password reset'
            })
        } catch (error) {
            return response.status(400).send(`Internal server error: ${error}`)
        }
    }
}
export default new ResetPassword()
