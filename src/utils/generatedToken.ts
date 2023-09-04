import jwt from 'jsonwebtoken'
async function generatedToken(params: { id: string }) {
    const token = jwt.sign(params, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES_IN as string
    })
    return token
}

export default generatedToken
