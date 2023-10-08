import cors from 'cors'
import dotenv, { config } from 'dotenv'
import express from 'express'
import { rateLimit } from 'express-rate-limit'

import { routes } from './router'

const PORT = 3000
const TIME_LIMITER = 60 * 60 * 1000 // One hour in milliseconds
const LIMIT = 100 // 100 requests per minute
const MESSAGE =
    'Too many accounts created from this IP, please try again after an hour' // Message to show to the user

const app = express()

// Protection from DDOS
const limiter = rateLimit({
    windowMs: TIME_LIMITER,
    limit: LIMIT,
    message: MESSAGE
})

config()
dotenv.config()
app.use(limiter)
app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(PORT, () => console.log('✅ Server is running on port:', PORT))
