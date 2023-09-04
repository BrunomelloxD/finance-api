import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { prismaClient } from '../database/prismaClient'

class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, email, password } = request.body
        const saltRounds = 10 // Número de rounds para a criptografia

        // Criptografar a senha
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

            const user = await prismaClient.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword // Use a senha criptografada
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
