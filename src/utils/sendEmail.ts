import { transporter } from '../config/nodemailer'

const sendEmail = async (email: string, token: string) => {
    const EMAIL = process.env.EMAIL

    try {
        const configEmail = {
            from: EMAIL,
            to: email,
            subject: 'Redefinição de senha - Finance',
            html: `<p>Olá, você está recebendo este e-mail porque recebemos uma solicitação de redefinição de senha. Utilize o seguinte token: <strong>${token}</strong> para redefinir sua senha.</p>`
        }

        const info = await transporter.sendMail(configEmail)
        transporter.close()
        return info
    } catch (error) {
        console.error('Internal server error:', error)
        throw error
    }
}

export default sendEmail
