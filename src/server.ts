import cors from 'cors'
import dotenv, { config } from 'dotenv'
import express from 'express'
import { rateLimit } from 'express-rate-limit'

import { routes } from './router'

const PORT = 3000
const TIME_LIMITER = 15 * 60 * 1000 // 15 minutes in milliseconds
const LIMIT = 10 // 10 requests per minute

const app = express()

// Protection from DDOS
const limiter = rateLimit({
    windowMs: TIME_LIMITER,
    limit: LIMIT,
    message: 'Too many requests'
})

config()
dotenv.config()
app.use(limiter)
app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(PORT, () => console.log('✅ Server is running on port:', PORT))
