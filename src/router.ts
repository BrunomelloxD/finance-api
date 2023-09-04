import { Router } from 'express'

// Routes
import CreateCardController from './controllers/CreateCardController'
import CreateUserController from './controllers/CreateUserController'
import GetAllUserController from './controllers/GetAllUserController'

const routes = Router()

routes.get('/user', GetAllUserController.handle)
routes.post('/card', CreateCardController.handle)
routes.post('/user', CreateUserController.handle)

export { routes }
