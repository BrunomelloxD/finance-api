import jwt from 'jsonwebtoken'
async function generatedToken(params: { id: string }) {
    try {
        const token = jwt.sign(params, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_EXPIRES_IN as string
        })
        return token
    } catch (error) {
        console.error(error)
    }
}

export default generatedToken
