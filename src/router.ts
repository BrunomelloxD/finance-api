import { Router } from 'express'

// CONTROLLERS
import AuthController from './controllers/AuthController'
import CreateCardController from './controllers/CreateCardController'
import CreateUserController from './controllers/CreateUserController'
import GetAllCardsController from './controllers/GetAllCardsController'
import GetAllUserController from './controllers/GetAllUserController'
import GetUserController from './controllers/GetUserController'

// MIDDLEWARES
import authMiddleware from './middlewares/authMiddleware'

const routes = Router()

routes.get('/user', GetAllUserController.handle)
routes.get('/user/:id', GetUserController.handle)
routes.get('/card', GetAllCardsController.handle)
routes.post('/login', AuthController.authenticate)
routes.post('/card', authMiddleware, CreateCardController.handle)
routes.post('/user', CreateUserController.handle)
routes.post('/user', CreateUserController.handle)

export { routes }
