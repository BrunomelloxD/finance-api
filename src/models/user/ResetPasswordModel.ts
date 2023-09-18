import bcrypt from 'bcrypt'
import { Request } from 'express'

import { Environment } from '../../config/Environment'
import { prismaClient } from '../../infra/database/prismaClient'
import { ResponseGenericTypes } from '../../types/types'

class ResetPasswordModel {
    async handle(
        request: Request,
        email: string,
        password: string,
        token: string
    ): Promise<ResponseGenericTypes> {
        try {
            const SALT_ROUNDS = Environment.SALT_ROUNDS || 14
            const HASHED_PASSWORD = await bcrypt.hash(password, SALT_ROUNDS)
            console.log(email)

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

            const resetToken = user.passwordResetToken
            console.log('resetToken:', resetToken)

            if (token != resetToken) {
                return {
                    success: false,
                    code: 498,
                    message: 'Invalid token'
                }
            }

            const expires = user.passwordResetExpires
            if (!expires) {
                return {
                    success: false,
                    code: 401,
                    message: 'Token expired'
                }
            }

            const now = new Date()
            if (now > expires) {
                return {
                    success: false,
                    code: 401,
                    message: 'Token expired'
                }
            }

            await prismaClient.user.update({
                where: {
                    email,
                    passwordResetToken: token
                },
                data: {
                    password: HASHED_PASSWORD,
                    passwordResetToken: null,
                    passwordResetExpires: null
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

export default new ResetPasswordModel()
