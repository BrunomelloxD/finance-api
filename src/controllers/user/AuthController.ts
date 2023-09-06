import bcrypt from 'bcrypt'
import { Request, Response } from 'express'

import { prismaClient } from '../../infra/database/prismaClient'

import generatedToken from '../../utils/generatedToken'

interface User {
    id: string
    name: string
    email: string
    password: string
}

class AuthController {
    async authenticate(request: Request, response: Response) {
        try {
            const { email, password } = request.body

            const user: User | null = await prismaClient.user.findFirst({
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

            const token = await generatedToken({ id })

            return response.json({
                user: { id, name, email: userEmail },
                token
            })
        } catch (error) {
            console.error('Error during authentication:', error)
            return response.status(500).json({ error: 'Internal server error' })
        }
    }
}

export default new AuthController()
