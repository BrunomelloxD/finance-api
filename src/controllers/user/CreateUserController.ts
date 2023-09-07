import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { prismaClient } from '../../infra/database/prismaClient'

class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, email, password } = request.body
        const saltRounds = 14

        const hashedPassword = await bcrypt.hash(password, saltRounds)

        try {
            const userExists = await prismaClient.user.findFirst({
                where: {
                    email
                }
            })

            if (userExists) {
                return response.status(400).json({
                    message: 'User already exists'
                })
            }

            await prismaClient.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                }
            })

            return response.status(201)
        } catch (error) {
            console.error(error)
            return response.status(500).json({
                message: 'Internal server error'
            })
        }
    }
}

export default new CreateUserController()
