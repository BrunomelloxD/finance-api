import bcrypt from 'bcrypt'
import { Request, Response } from 'express'

import { prismaClient } from '../../infra/database/prismaClient'

import isValidEmail from '../../utils/isValidEmail'
import userExists from '../../utils/userExists'

class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, email, password } = request.body
        const saltRounds = 14
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        try {
            const validatedEmail = await isValidEmail(email)

            if (!validatedEmail) {
                return response.status(400).json({
                    message: 'Invalid email'
                })
            }

            const validatedUser = await userExists(email)

            if (validatedUser) {
                return response.status(400).json({
                    message: 'User already exists'
                })
            }

            const user = await prismaClient.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                }
            })

            return response.status(201).json({
                user
            })
        } catch (error) {
            console.error(error)
            return response.status(500).json({
                message: 'Internal server error'
            })
        }
    }
}

export default new CreateUserController()
