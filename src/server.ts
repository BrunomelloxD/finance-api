import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'

import { routes } from './router'

const app = express()
const PORT = 3000

config()
app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(PORT, () => console.log('✅ Server is running on port:', PORT))
