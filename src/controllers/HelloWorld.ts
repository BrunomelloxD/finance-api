import { Request, Response } from 'express'

class HelloWorld {
    async handle(request: Request, response: Response) {
        const data = [
            {
                message: 'Hello World!'
            }
        ]

        return response.json(data)
    }
}

export default new HelloWorld()
