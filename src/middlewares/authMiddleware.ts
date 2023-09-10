import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface TokenPayload {
    id: string
    iat: number
    exp: number
}

export const authMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const { authorization } = request.headers

    if (!authorization || !authorization.startsWith('Bearer')) {
        return response.status(401).send({ error: 'No valid token provided' })
    }

    const token = authorization.replace('Bearer', '').trim()

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET as string)
        console.log(data)

        const { id } = data as TokenPayload

        request.userId = id

        return next()
    } catch (err) {
        console.log(err)
        return response.sendStatus(401)
    }
}
