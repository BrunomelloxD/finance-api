import { Request } from 'express'

import { prismaClient } from '../../infra/database/prismaClient'

import { generateForgotPasswordToken } from '../../utils/generateForgotPasswordToken'
import sendEmail from '../../utils/sendEmail'

import { ResponseGenericTypes } from '../../types/types'

class ForgotPasswordModel {
    async handle(
        request: Request,
        email: string
    ): Promise<ResponseGenericTypes> {
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    email
                }
            })

            if (!user) {
                return {
                    success: false,
                    code: 404,
                    message: 'User not found'
                }
            }

            const ID = user.id
            const { token, now } = generateForgotPasswordToken()

            await prismaClient.user.update({
                where: { id: ID },
                data: {
                    passwordResetToken: token,
                    passwordResetExpires: now
                }
            })

            await sendEmail(email, token)

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

export default new ForgotPasswordModel()
