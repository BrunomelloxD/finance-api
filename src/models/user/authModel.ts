import bcrypt from 'bcrypt'
import { Request } from 'express'

import { prismaClient } from '../../infra/database/prismaClient'

import generateLoginToken from '../../utils/generateLoginToken'

import { ResponseAuthGenericTypes } from '../../types/auth'
import { UserBasicTypes } from '../../types/user'

class AuthModel {
    async handle(
        request: Request,
        email: string,
        password: string
    ): Promise<ResponseAuthGenericTypes> {
        try {
            const user: UserBasicTypes | null =
                await prismaClient.user.findFirst({
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

            const isValidPassword = await bcrypt.compare(
                password,
                user.password
            )

            if (!isValidPassword) {
                return {
                    success: false,
                    code: 401,
                    message: 'Invalid password'
                }
            }

            const { id, name, email: userEmail } = user

            const access_token = await generateLoginToken({ id })

            return {
                success: true,
                code: 200,
                user: { id, name, email: userEmail },
                access_token
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

export default new AuthModel()
