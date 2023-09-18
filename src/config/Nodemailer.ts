import nodemailer from 'nodemailer'

const HOST = process.env.HOST
const SERVICE = process.env.SERVICE
const EMAIL = process.env.EMAIL
const PASSWORD = process.env.PASSWORD

export const transporter = nodemailer.createTransport({
    host: HOST,
    port: 587,
    secure: true,
    service: SERVICE,
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
})
