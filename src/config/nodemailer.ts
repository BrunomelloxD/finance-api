import nodemailer from 'nodemailer'

const sendEmail = async (email: string, token: string) => {
    const EMAIL = process.env.EMAIL
    const PASSWORD = process.env.PASSWORD

    try {
        const smtp = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: true,
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        const configEmail = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Redefinição de senha - Finance',
            html: `<p>Olá, você está recebendo este e-mail porque recebemos uma solicitação de redefinição de senha. Utilize o seguinte token: <strong>${token}</strong> para redefinir sua senha.</p>`
        }

        const info = await smtp.sendMail(configEmail)
        smtp.close()
        return info
    } catch (error) {
        console.error('Internal server error:', error)
        throw error
    }
}

export default sendEmail
