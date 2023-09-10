import { prismaClient } from '../infra/database/prismaClient'

const userExists = async (email: string) => {
    try {
        const userExists = await prismaClient.user.findFirst({
            where: {
                email
            }
        })

        if (userExists) {
            return true
        }
        return false
    } catch (error) {
        console.error(error)
    }
}

export default userExists
