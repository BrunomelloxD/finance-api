import bcrypt from 'bcrypt'
import { Request, Response } from 'express'

import { prismaClient } from '../../../infra/database/prismaClient'

import generateLoginToken from '../../../utils/generateLoginToken'

import { UserGenericTypes } from '../../../types/user'

class AuthController {
    async authenticate(request: Request, response: Response) {
        try {
            const { email, password } = request.body

            const user: UserGenericTypes | null =
                await prismaClient.user.findFirst({
                    where: {
                        email
                    }
                })

            if (!user) {
                return response.status(404).json({ error: 'User not found' })
            }

            const isValidPassword = await bcrypt.compare(
                password,
                user.password
            )

            if (!isValidPassword) {
                return response.status(401).json({ error: 'Invalid password' })
            }

            const { id, name, email: userEmail } = user

            const access_token = await generateLoginToken({ id })

            return response.json({
                user: { id, name, email: userEmail },
                access_token
            })
        } catch (error) {
            console.error('Error during authentication:', error)
            return response.status(500).json({ error: 'Internal server error' })
        }
    }
}

export default new AuthController()
