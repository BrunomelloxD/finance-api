import bcrypt from 'bcrypt'
import { Response } from 'express'

import { prismaClient } from '../../infra/database/prismaClient'

import { Environment } from '../../config/Environment'

import isValidEmail from '../../utils/isValidEmail'
import userExists from '../../utils/userExists'

import { ResponseGenericTypes } from '../../types/types'

class CreateUserModel {
    async handle(
        response: Response,
        name: string,
        email: string,
        password: string
    ): Promise<ResponseGenericTypes> {
        try {
            const SALT_ROUNDS = Environment.SALT_ROUNDS
            const HASHED_PASSWORD = await bcrypt.hash(password, SALT_ROUNDS)
            const VALIDATED_EMAIL = await isValidEmail(email)
            const VALIDATED_USER = await userExists(email)

            if (!VALIDATED_EMAIL) {
                return {
                    success: false,
                    code: 501,
                    message: 'Invalid email'
                }
            }

            if (VALIDATED_USER) {
                return {
                    success: false,
                    code: 409,
                    message: 'User already exists'
                }
            }

            const user = await prismaClient.user.create({
                data: {
                    name,
                    email,
                    password: HASHED_PASSWORD
                }
            })

            if (!user) {
                throw new Error('Internal server error')
            }

            return {
                success: true,
                code: 201
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

export default new CreateUserModel()
